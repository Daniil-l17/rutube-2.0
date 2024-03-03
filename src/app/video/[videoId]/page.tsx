import { Metadata } from 'next'
import React from 'react'

  export const metadata:Metadata = {
    title: 'видео'
  }

const page = ({params}:{params: {videoId:string}}) => {
  return (
    <div>{params.videoId}</div>
  )
}

export default page