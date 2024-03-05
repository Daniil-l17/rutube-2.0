import { memo } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react';
import { Iuser } from '@/types/IUser';

import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { formatNumberTok } from '@/utils/formatNumber';
import { CameraIcon } from '@/images/Icons/CameraIcon';
export const UserHeader = memo(({ logout, data }: { logout: () => void; data: Iuser }) => {
  return (
    <Card shadow="none" className="max-w-[300px] bg-[#222222]  !text-[#f4f6fb] border-none  ">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          {data?.avatarPath ? (
            <Avatar
              radius="full"
              size="md"
              src={`http://localhost:4200/uploads/avatar/${data?.avatarPath}`}
            />
          ) : (
            <div className=" bg-[#4c4b4b] w-10 h-10 rounded-[30px] flex justify-center">
              <CameraIcon />
            </div>
          )}
          <div className="flex flex-col items-start justify-center">
            <div className="flex gap-2 items-center">
              <h4 className="text-[16px] font-semibold !text-[#f4f6fb] leading-none">
                {data?.name ? data.name : 'Пользователь'}
              </h4>
              {data?.isVerified && (
                <IoMdCheckmarkCircleOutline className="text-[17px] text-[#4848f6]" />
              )}
            </div>
            <h5 className="text-small tracking-tight !text-[#f4f6fb]">{data?.email}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 font-medium">
        <p className="text-small W-[100px] truncate  text-balance  pl-px text-default-500">
          {data?.description}
        </p>
      </CardBody>
      <CardFooter className="gap-3 flex flex-col items-start font-medium">
        <div className="flex gap-3">
          <div className="flex gap-1">
            <p className="text-default-600 text-small">{data?.subscriptions.length}</p>
            <p className=" text-default-500 font-medium text-small">Подписок</p>
          </div>
          <div className="flex gap-1">
            <p className="text-default-600 text-small">{formatNumberTok(data?.subscribersCount)}</p>
            <p className="text-default-500 font-medium text-small">{' Подписчиков'}</p>
          </div>
        </div>
        <Button onClick={logout} className=" text-base font-medium" color="danger" size="sm">
          Выйти
        </Button>
      </CardFooter>
    </Card>
  );
});
