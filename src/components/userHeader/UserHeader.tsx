import { memo } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, PopoverContent, PopoverTrigger, Tooltip } from "@nextui-org/react";
import { Iuser } from "@/types/IUser";

import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { formatNumberTok } from "@/utils/formatNumber";
export const UserHeader = memo(({logout,data}:{logout: () => void,data:Iuser}) => {


  return (
    <Card shadow="none" className="max-w-[300px] bg-[#222222]  !text-[#f4f6fb] border-none  ">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar  radius="full" size="md" src={`http://localhost:4200/uploads/avatar/${data?.avatarPath}`} />
          <div className="flex flex-col items-start justify-center">
            <div className="flex gap-2 items-center">
            <h4 className="text-[16px] font-semibold !text-[#f4f6fb] leading-none">{data?.name}</h4>
            <IoMdCheckmarkCircleOutline className="text-[17px] text-[#4848f6]"/>
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
          <p className=" text-default-500 font-medium text-small">Подписки</p>
        </div>
        <div className="flex gap-1">
          <p className="text-default-600 text-small">{formatNumberTok(data?.subscribersCount)}</p>
          <p className="text-default-500 font-medium text-small">Подписчики</p>
        </div>
    </div>
    <Button onClick={logout} className=" text-base font-medium" color="danger" size="sm" >
        Выйти
      </Button>
      </CardFooter>
    </Card>
  );
}
)
