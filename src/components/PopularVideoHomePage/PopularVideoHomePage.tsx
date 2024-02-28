import { Card, CardBody, Image } from '@nextui-org/react'
import { memo } from 'react'

export const PopularVideoHomePage = memo(() => {
  return (
    <Card shadow="sm" className="min-w-[800px] bg-[#222222] text-main h-[400px]"  isPressable onPress={() => console.log("item pressed")}>
    <CardBody className="overflow-visible p-0">
      <Image
        shadow="sm"
        radius="lg"
        width="100%"
        alt={'hello'}
        className="w-full object-cover h-[400px]"
        src={'https://cdnn21.img.ria.ru/images/07e8/02/17/1929093029_0:161:3071:1888_600x0_80_0_0_ce3858c377eb2bac74ec56a430957c80.jpg'}
      />
    </CardBody>
  </Card>
  )
})
