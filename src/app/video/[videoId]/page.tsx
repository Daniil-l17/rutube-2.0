

import { VideoProvader } from '@/provaders/VideoProvader'
import { Metadata } from 'next'
import React, { Fragment } from 'react'

  export const metadata:Metadata = {
    title: 'видео'
  }

const page = ({params}:{params: {videoId:string}}) => {

  return (
    <VideoProvader id={+params.videoId}></VideoProvader>
  )
}

export default page