'use client'

import { useAppSelector } from '@/hooks/useAppSelector'
import { useGetProfileQuery } from '@/redux/api/api'
import { useAuth } from '@/redux/auth/auth'
import { useEffect } from 'react'

const useProfileProvader = ({children}:{children:React.ReactNode}) => {
  const user = useAppSelector(useAuth)
  const {refetch } = useGetProfileQuery(null,{skip: !user})

  useEffect(() => {
    if(user)
      refetch()
  },[user])


  return (
    <>
    {children}
    </>
  )
}

export default useProfileProvader