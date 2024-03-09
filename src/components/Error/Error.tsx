import Image from 'next/image'
import React from 'react'

export const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
    <Image alt="non-found" src={'/Group 3.png'} width={600} height={400} />
    <h2 className=' text-[#ad5f5f] font-semibold text-[20px]'>Сервер не запущен</h2>
  </div>
  )
}
