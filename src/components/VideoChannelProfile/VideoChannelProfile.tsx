import { Ivideo } from '@/types/Ivideo';
import { formatNumberTok } from '@/utils/formatNumber';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';


export const VideoChannelProfile = ({ video }: { video: Ivideo[] }) => {
  return (
    <div className='flex flex-wrap gap-5 pr-8'>
      {video.map(video => {
        return (
          <Card
          key={video.id}
            shadow="sm"
            isPressable
            className="w-[450px] cursor-pointer mt-6 bg-[#222222] text-main h-[280px]">
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                loading="lazy"
                alt={'hello'}
                className="w-full object-cover h-[230px]"
                src={`http://localhost:4200/uploads/thumbnails/${video.thumbnaulPath}`}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b className="truncate w-[370px] text-[#939393]">{video.name}</b>
              <p className="text-default-500 text-right">{`${formatNumberTok(
                video.views,
              )} просмотров`}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
