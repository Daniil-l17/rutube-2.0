'use client';
import { PopularVideoHomePage } from '@/components/PopularVideoHomePage/PopularVideoHomePage';
import { useGetVideoQuery, usePopularVideoQuery } from '@/redux/api/inject/videoInject';
import { formatNumberTok } from '@/utils/formatNumber';
import { Avatar, Card, CardBody, CardFooter, Image, Tooltip } from '@nextui-org/react';
import dayjs from 'dayjs';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import relativetime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/useAppSelector';
import { localeObject } from '@/ui/localeObject/localeObject';
import { Fragment } from 'react';
import { Loading } from '@/components/Loading/Loading';
import { Error } from '@/components/Error/Error';
dayjs.extend(relativetime);
export default function Home() {
  const { data, isLoading, error } = usePopularVideoQuery(null);
  const user = useAppSelector(state => state.auth.user?.id);
  const { data: video } = useGetVideoQuery();
  const random = Math.floor(Math.random() * data?.length!);

  const rendomVideo = data?.[random];
  return (
    <div className="">
      <div className=" mt-7">
        <h2 className=" text-[40px] font-medium ">Главная</h2>
      </div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <Fragment>
          <div className="flex gap-4 pr-20 h-[430px] justify-between py-5 ">
            <PopularVideoHomePage data={data} />
          <Link href={`/video/${rendomVideo?.id}`}>
          <Card
              shadow="sm"
              className="max-w-[650px] bg-[#222222] text-main h-[340px]"
              isPressable>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={'hello'}
                  className="imgfil w-full object-cover h-[340px]"
                  src={`http://localhost:4200/uploads/thumbnails/${rendomVideo?.thumbnaulPath}`}
                />
              </CardBody>
            </Card>
          </Link>
          </div>
          <div className=" flex flex-wrap  pr-9  gap-8 ">
            {video?.map(el => (
              <Card
                key={el.id}
                shadow="sm"
                className="w-[350px] bg-[#222222] text-main h-[300px]"
                isPressable
                onPress={() => console.log('item pressed')}>
                <Link href={`/video/${el.id}`}>
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={'hello'}
                    className="imgfil w-full object-cover h-[200px]"
                    src={`http://localhost:4200/uploads/thumbnails/${el?.thumbnaulPath}`}
                  />
                  <div className=" h-full px-3 flex py-3 flex-col">
                    <div className="flex items-center gap-3">
                      <Tooltip
                        delay={300}
                        closeDelay={300}
                        placement={'top-start'}
                        content={el.user?.name}
                        offset={10}
                        className="bg-[#313131] text-main">
                        <Link
                          href={user === el.user?.id ? '/Mychannel' : `/channel/${el.user?.id}`}>
                          <Avatar
                            style={{ width: '40px', height: '40px' }}
                            src={`http://localhost:4200/uploads/avatar/${el.user?.avatarPath}`}
                          />
                        </Link>
                      </Tooltip>
                      <h2 className="textcontenthome text-start">{el.name}</h2>
                    </div>
                    <CardFooter className="text-small flex  mt-2 !items-end  !p-0 !justify-between">
                      <b className=" ml-1 ">{dayjs(el.createAt).locale(localeObject).fromNow()}</b>
                      <div className="flex text-[#939393] gap-2 items-center">
                        <p className=" text-[#939393]">{`${formatNumberTok(el.views)}`}</p>
                        <MdOutlineRemoveRedEye className="!text-[20px]" />
                      </div>
                    </CardFooter>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}
