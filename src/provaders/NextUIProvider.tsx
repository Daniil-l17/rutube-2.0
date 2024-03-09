'use client'

import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetProfileQuery } from '@/redux/api/api';
import { useAuth } from '@/redux/auth/auth';
import {NextUIProvider} from '@nextui-org/react'
import {useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function NextProviderUI({children}: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAppSelector(useAuth);
  const {refetch } = useGetProfileQuery(null,{skip:!user});
  useEffect(() => {
    if(user){
      refetch()
    }
  },[user])
  return (
    <NextUIProvider className=' gap-3 w-full flex' navigate={router.push}>
      {children}
    </NextUIProvider>
  )
}