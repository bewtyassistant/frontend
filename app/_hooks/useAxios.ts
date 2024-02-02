"use client"

import { useState, useEffect, useCallback } from "react"
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export type RequestBody = AxiosRequestConfig<unknown> | undefined

export default function useAxios(options?: {
  url?: string,
  method?: "get" | "post" | "put" | "delete"
  body?: any,
  headers: AxiosHeaders
  baseURL?: string
}) {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setloading] = useState(true)
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  const fetchData = useCallback(async ({ url, method, body, headers, baseURL }: {
    url: string,
    method: "get" | "post" | "put" | "delete"
    headers?: AxiosHeaders
    baseURL?: string
    body?: any
  }) => {
    try{
      const response = await axios[method](url, body, {
        ...headers,
        baseURL: baseURL || process.env.NEXT_PUBLIC_SERVER_URL,
      })
      return await response.data
    }catch(err: any){
      if (err.message === "Network Error"){
        return {
          message: err.message,
          statusCode: 503,
        }
      }
      console.log(err)
      return err.response.data
    }
  }, [])

  const internalFetch = useCallback(() => {
    if(!options) return
    const { url = "", method = "get", body, headers, baseURL } = options
    axios[method](url, {
      ...headers,
      baseURL: baseURL || process.env.NEXT_PUBLIC_SERVER_URL 
    }, 
    body
    ).then((res) => {
      console.log(res, "res")
      setResponse(res.data)
      setError(null)
    }).catch((err) => {
      console.log(err, "err")
      setError(err)
    }).finally(() => {
      setloading(false)
    })
  }, [options])

  useEffect(() => {
    internalFetch()
  }, [internalFetch])

  return { response, error, loading, fetchData }
}