import { Metadata } from 'next'
import React from 'react'


  export const metadata:Metadata = {
    title: 'profile'
  }


const page = ({params }: { params: { id: string }}) => {
  return (
    <div>page {params.id}</div>
  )
}

export default page