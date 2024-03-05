'use client';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetProfileQuery, useGetSubscribeUserMutation } from '@/redux/api/api';
import { useGetVideoByIdQuery, useUpdateViewsMutation } from '@/redux/api/inject/videoInject';
import { useAuth } from '@/redux/auth/auth';
import { formatNumberTok } from '@/utils/formatNumber';
import { Avatar, Button, User } from '@nextui-org/react';
import { useEffect } from 'react';
import { GrLike } from 'react-icons/gr';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import ReactPlayer from 'react-player/lazy';

export const VideoProvader = ({ id }: { id: number }) => {
  const user = useAppSelector(useAuth);
  const { data, isLoading } = useGetVideoByIdQuery(id);
  const {data: userMe} = useGetProfileQuery(null)
  const [subscribe] = useGetSubscribeUserMutation()
  const [updateViews] = useUpdateViewsMutation()
  const ixExsict = userMe?.subscriptions?.some(user => user.toChannel.id === data?.user?.id)


  useEffect(() => {
    updateViews(id)
  },[])



  return (
    <div>
      <div className="flex justify-between gap-3 pr-8">
        <div style={{ width: '1000px' }}>
          <ReactPlayer
            width={1000}
            height={570}
            playing={true}
            controls={true}
            loop={true}
            url={`http://localhost:4200/uploads/videoPath/${data?.videoPath}`}
          />
        </div>
        <div
          style={{ background: '#222222', margin: '4px', borderRadius: '10px' }}
          className="bg-[#222222] px-3 py-3 flex flex-col w-full">
          <h2 className=" text-[25px] text-main font-medium">Комментарии</h2>
          <span
            style={{ background: '#787777', height: '1.4px', marginTop: '10px' }}
            className="bg-[#787777]  w-full"></span>
        </div>
      </div>
      <div
        style={{ marginRight: '32px', marginTop: '15px' }}
        className="  rounded-2xl bg-[#222222] px-4 py-3">
        <h2 className="text-main">{data?.name}</h2>
    <div className='flex justify-between items-center'>
    <div className="flex gap-2 items-center mt-3">
          <Avatar
            src={`http://localhost:4200/uploads/avatar/${data?.user?.avatarPath}`}
            size="lg"
          />
          <div>
            <div className="flex gap-2 items-center">
              <h2 className="text-main">{data?.user?.name}</h2>
              {data?.user?.isVerified && (
                <IoMdCheckmarkCircleOutline className="text-[18px] text-[#4848f6]" />
              )}
            </div>
            <div className="flex text-[#111111] gap-1 items-center">
              <p>{`${formatNumberTok(data?.user?.subscribersCount)}. подписчиков`}</p>
            </div>
          </div>
          {user && userMe?.id !== data?.user?.id && (
            <Button onClick={() => subscribe(data?.user?.id)} style={{ marginLeft: '15px' }} color="primary" variant="flat">
              {!ixExsict ? 'Подписаться' : 'Вы подписанны'}
            </Button>
          )}
        </div>
        <div>
        <Button color="primary" variant="flat">
        <GrLike />
        {formatNumberTok(data?.likes)}
      </Button>  
        </div>
    </div>
      </div>
    </div>
  );
};
