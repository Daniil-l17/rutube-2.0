import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export const UserNoVideo = () => {
  return (
    <div className='flex items-center h-[550px] mt-14 flex-col gap-3'>
      <img className=' w-[147px] h-[147px]' src="/novideo.svg" alt="" />
      <h2 className=' text-main text-center'>Нету ни одного видео</h2>
      <p className='text-main text-center w-[400px]'>Создавайте и загружайте контент из дома или любой точки мира. Все ваши общедоступные видео будут показываться здесь.</p>
    </div>
  )
}