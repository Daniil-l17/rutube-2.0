import { Ivideo } from '@/types/Ivideo'
import { Card, CardBody, Image } from '@nextui-org/react'
import { memo } from 'react'

export const PopularVideoHomePage = memo(({data}:{data:Ivideo[] | undefined}) => {
  return (
    <Card shadow="sm" className="min-w-[800px] relative group/item bg-[#222222] text-main h-[400px]"  isPressable onPress={() => console.log("item pressed")}>
    <CardBody className="overflow-visible p-0">
      <Image
        shadow="sm"
        radius="lg"
        width="100%"
        src={`http://localhost:4200/uploads/thumbnails/${data?.[0].thumbnaulPath} `}
        alt={'hello'}
        className="imgfil w-full  object-cover h-[400px]"
      />
    <h1 className='z-10 absolute invisible group-hover/item:visible '>hello</h1>
    </CardBody>
  </Card>
  )
})
