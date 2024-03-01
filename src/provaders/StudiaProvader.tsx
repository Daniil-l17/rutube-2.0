'use client'

import { useAppSelector } from "@/hooks/useAppSelector"
import { useAuth } from "@/redux/auth/auth"
import { redirect } from "next/navigation"
import { useLayoutEffect } from "react"

const StudiaProvader = () => {
  const user = useAppSelector(useAuth)
  useLayoutEffect(() => {
    if(!user){
      redirect('/')
    }
  },[])
  return (
    <div>
      
    </div>
  )
}

export default StudiaProvader