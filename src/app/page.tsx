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
dayjs.extend(relativetime);

const localeObject = {
  name: 'ru', // name String
  weekdays: 'Domingo_Lunes ...'.split('_'), // weekdays Array
  weekdaysShort: 'Sun_M'.split('_'), // OPTIONAL, short weekdays Array, use first three letters if not provided
  weekdaysMin: 'Su_Mo'.split('_'), // OPTIONAL, min weekdays Array, use first two letters if not provided
  weekStart: 1, // OPTIONAL, set the start of a week. If the value is 1, Monday will be the start of week instead of Sunday。
  yearStart: 4, // OPTIONAL, the week that contains Jan 4th is the first week of the year.
  months: 'Enero_Febrero ... '.split('_'), // months Array
  monthsShort: 'Jan_F'.split('_'), // OPTIONAL, short months Array, use first three letters if not provided
  formats: {
    // abbreviated format options allowing localization
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
    // lowercase/short, optional formats for localization
    l: 'D/M/YYYY',
    ll: 'D MMM, YYYY',
    lll: 'D MMM, YYYY h:mm A',
    llll: 'ddd, MMM D, YYYY h:mm A',
  },
  relativeTime: {
    // relative time format strings, keep %s %d as the same
    future: 'in %s', // e.g. in 2 hours, %s been replaced with 2hours
    past: '%s ',
    s: ' секунд назад',
    m: 'минуту назад',
    mm: '%d минут назад',
    h: 'час назад',
    hh: '%d часов назад', // e.g. 2 hours, %d been replaced with 2
    d: 'день назад',
    dd: '%d дней назад',
    M: ' месяцев назад',
    MM: '%d месяцев назад',
    y: 'a лет назад',
    yy: '%d years',
  },
};

export default function Home() {
  const { data, isLoading } = usePopularVideoQuery(null);
  const user = useAppSelector(state => state.auth.user?.id);
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
              src={`http://localhost:4200/uploads/thumbnails/${rendomVideo?.thumbnaulPath}`}
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
                  <Link href={user === el.user?.id ? '/Mychannel' : `/channel/${el.user?.id}`}>
                    <Avatar
                      style={{ width: '40px', height: '40px' }}
                      src={`http://localhost:4200/uploads/avatar/${el.user?.avatarPath}`}
                    />
                  </Link>
                </Tooltip>
                <h2 className="textcontenthome text-start">{el.name}</h2>
              </div>
              <CardFooter className="text-small flex flex-1 !items-end  !p-0 !justify-between">
                <b className=" ml-1 ">{dayjs(el.createAt).locale(localeObject).fromNow()}</b>
                <div className="flex text-[#939393] gap-2 items-center">
                  <p className=" text-[#939393]">{`${formatNumberTok(el.views)}`}</p>
                  <MdOutlineRemoveRedEye className="!text-[20px]" />
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
