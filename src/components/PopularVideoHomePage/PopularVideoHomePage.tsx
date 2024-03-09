import { Ivideo } from '@/types/Ivideo'
import { Card, CardBody, Image } from '@nextui-org/react'
import Link from 'next/link'
import { memo } from 'react'

export const PopularVideoHomePage = memo(({data}:{data:Ivideo[] | undefined}) => {
  return (
    <Link href={`/video/${data?.[0].id}`}>
        <Card shadow="sm" className="min-w-[630px] relative group/item bg-[#222222] text-main h-[340px]"  isPressable onPress={() => console.log("item pressed")}>
    <CardBody className="overflow-visible p-0">
      <Image
        shadow="sm"
        radius="lg"
        width="100%"
        src={`http://localhost:4200/uploads/thumbnails/${data?.[0].thumbnaulPath} `}
        alt={'hello'}
        className="imgfil w-full  object-cover h-[340px]"
      />
    </CardBody>
  </Card>
    </Link>
  )
})
