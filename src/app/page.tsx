'use client'
import { PopularVideoHomePage } from "@/components/PopularVideoHomePage/PopularVideoHomePage";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function Home() {
  return (
    <div className="">
      <div className=" mt-7">
      <h2 className=" text-[40px] font-medium ">Главная</h2>
      </div>
      <div className="flex gap-4 pr-9 h-[430px] justify-between py-5 ">
    <PopularVideoHomePage/>
        <Card shadow="sm" className="max-w-[650px] bg-[#222222] text-main h-[400px]"  isPressable onPress={() => console.log("item pressed")}>
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
      </div>
      <div className="flex justify-between pr-9 flex-wrap gap-5 mt-10">
    {[...Array(20)].map(() => 
          <Card shadow="sm" className="w-[350px] bg-[#222222] text-main h-[250px]"  isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={'hello'}
              className="w-full object-cover h-[200px]"
              src={'https://cdnn21.img.ria.ru/images/07e8/02/17/1929093029_0:161:3071:1888_600x0_80_0_0_ce3858c377eb2bac74ec56a430957c80.jpg'}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{'helloooo'}</b>
            <p className="text-default-500">{'44'}</p>
          </CardFooter>
        </Card>
    )}
      </div>
    </div>
  );
}
