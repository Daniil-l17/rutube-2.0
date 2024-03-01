'use client'

import { useEffect, useState } from "react"

export const useDebounce = (title:string,delay = 300) => {
  const [debounce,setDebounce] = useState('')
  useEffect(() => {
    const timeout = setTimeout(() => setDebounce(title),delay)
    return () => clearTimeout(timeout)
  },[title])
  return debounce
}