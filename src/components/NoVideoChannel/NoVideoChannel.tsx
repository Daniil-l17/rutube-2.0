import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export const NoVideoChannel = () => {
  return (
    <div className='flex items-center mt-14 flex-col gap-3'>
      <img className=' w-[147px] h-[147px]' src="/novideo.svg" alt="" />
      <h2 className=' text-main text-center'>Здесь будет ваш контент</h2>
      <p className='text-main text-center w-[400px]'>Создавайте и загружайте контент из дома или любой точки мира. Все ваши общедоступные видео будут показываться здесь.</p>
      <Button className=' font-medium' color="secondary" variant="ghost">
      <Link href={'/studia'}>
      Создать
      </Link>
      </Button>  
    </div>
  )
}
