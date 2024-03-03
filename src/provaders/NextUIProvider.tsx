'use client'

import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetProfileQuery } from '@/redux/api/api';
import { useAuth } from '@/redux/auth/auth';
import {NextUIProvider} from '@nextui-org/react'
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function NextProviderUI({children}: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider className=' h-[100%] gap-3 w-full flex' navigate={router.push}>
      {children}
    </NextUIProvider>
  )
}