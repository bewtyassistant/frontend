"use client"

import { useState, useEffect, useCallback } from "react"
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios"
import localforage from "localforage"
import STORAGE_KEYS from "../STORAGE_KEYS"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export type RequestBody = AxiosRequestConfig<unknown> | undefined

export default function useAxios(options?: { initialLoadingState?: boolean }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(
    options?.initialLoadingState !== undefined
      ? options.initialLoadingState
      : false
  )
  const fetchData = useCallback(
    async ({
      url,
      method,
      body,
      headers,
      baseURL,
    }: {
      url: string
      method: "get" | "post" | "put" | "delete"
      headers?: AxiosHeaders
      baseURL?: string
      body?: any
    }) => {
      if (loading) return
      setLoading(true)
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${await localforage.getItem(STORAGE_KEYS.BA_TOKEN)}`
        const response = await axios[method](url, body, {
          ...headers,
          baseURL: baseURL || process.env.NEXT_PUBLIC_SERVER_URL,
        })
        setLoading(false)
        return await response.data
      } catch (err: any) {
        console.log(err)
        setError(err)
        setLoading(false)
        if (err.message === "Network Error") {
          return {
            message: err.message,
            statusCode: 503,
          }
        }
        return err.response.data
      }
    },
    [loading]
  )

  return { error, loading, fetchData }
}
