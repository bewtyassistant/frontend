"use client"

import { useCallback, useEffect, useState } from "react"
import useAxios from "./useAxios"
import CATEGORY_URLS from "../_urls/category"
import Category from "../_types/Category"

export default function useFetchCategories({
  categoriesToFetch = { product: true, service: true },
}: {
  categoriesToFetch?: { product: boolean; service: boolean }
}) {
  const [categories, setCategories] = useState<{
    product: Category[]
    service: Category[]
  }>({
    product: [],
    service: [],
  })
  const { fetchData, loading: loadingCategories } = useAxios({
    initialLoadingState: false,
  })
  const [hasFetched, setHasFetched] = useState(false)
  const [retryCount, setRetryCount] = useState(10)

  const fetchCategories = useCallback(async () => {
    if (hasFetched || retryCount <= 0) return
    const productResponse = categoriesToFetch.product
      ? fetchData({
          url: CATEGORY_URLS.get("?category=product"),
          method: "get",
        })
      : null
    const serviceResponse = categoriesToFetch.service
      ? fetchData({
          url: CATEGORY_URLS.get("?category=service"),
          method: "get",
        })
      : null
    const [product, service] = await Promise.all([
      productResponse,
      serviceResponse,
    ])
    if (product?.statusCode === 200 || service?.statusCode === 200) {
      setHasFetched(true)
      setCategories((prev) => ({
        product: product?.statusCode === 200 ? product?.results : [],
        service: service?.statusCode === 200 ? service?.results : [],
      }))
    } else {
      setRetryCount((prev) => prev - 1)
    }
  }, [hasFetched, fetchData, retryCount, categoriesToFetch])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])
  return { categories, loadingCategories }
}
