'use client'

import {NextUIProvider} from '@nextui-org/react'
import { useRouter } from 'next/navigation';

export function NextProviderUI({children}: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider className=' h-[100%] gap-3 w-full flex' navigate={router.push}>
      {children}
    </NextUIProvider>
  )
}