'use client';
import { PopularVideoHomePage } from '@/components/PopularVideoHomePage/PopularVideoHomePage';
import { useGetVideoQuery, usePopularVideoQuery } from '@/redux/api/inject/videoInject';
import { formatNumberTok } from '@/utils/formatNumber';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
export default function Home() {
  const { data, isLoading } = usePopularVideoQuery(null);
  const { data: video } = useGetVideoQuery();
  const random = Math.floor(Math.random() * data?.length!);

  const rendomVideo = data?.[random];
  return (
    <div className="">
      <div className=" mt-7">
        <h2 className=" text-[40px] font-medium ">Главная</h2>
      </div>
      <div className="flex gap-4 pr-9 h-[430px] justify-between py-5 ">
        <PopularVideoHomePage data={data} />
        <Card
          shadow="sm"
          className="max-w-[650px] bg-[#222222] text-main h-[400px]"
          isPressable
          onPress={() => console.log('item pressed')}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={'hello'}
              className="imgfil w-full object-cover h-[400px]"
              src={`http://localhost:4200/uploads/thumbnails/${rendomVideo?.thumbnailPath}`}
            />
          </CardBody>
        </Card>
      </div>
      <div className=" flex justify-between flex-wrap  pr-9  gap-5 mt-10">
        {video?.map(el => (
          <Card
            key={el.id}
            shadow="sm"
            className="w-[350px] bg-[#222222] text-main h-[300px]"
            isPressable
            onPress={() => console.log('item pressed')}>
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={'hello'}
              className="imgfil w-full object-cover h-[200px]"
              src={`http://localhost:4200/uploads/thumbnails/${el?.thumbnailPath}`}
            />
            <div className=" h-full px-3 flex py-3 flex-col">
              <h2 className="textcontenthome  text-start">{el.name}</h2>
              <CardFooter className="text-small flex-1 !items-end  !p-0 justify-between">
                <b className="w-[200px] truncate ">{el.description}</b>
                <div className='flex text-[#939393] gap-2 items-center'>
                <p className=" text-[#939393]">{`${formatNumberTok(el.views)}`}</p>
                <MdOutlineRemoveRedEye className='!text-[20px]'/>
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
