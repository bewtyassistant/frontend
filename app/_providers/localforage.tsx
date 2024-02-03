"use client"
import localforage from "localforage"
import { ReactNode, useEffect } from "react"


export default function LocalForageProvider({ children }: {
  children: ReactNode | ReactNode[]
}){
  useEffect(() => {
    localforage.config({
      driver: localforage.INDEXEDDB,
      name: "bewty-assistant",
      version: 1.0,
      storeName: "app",
      description: "App wide DB",
    })
  }, [])
  return (
    <>
    {children}
    </>
  )
}