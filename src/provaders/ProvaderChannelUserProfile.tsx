'use client';
import { NoVideoChannel } from '@/components/NoVideoChannel/NoVideoChannel';
import { VideoChannelProfile } from '@/components/VideoChannelProfile/VideoChannelProfile';
import { useAppSelector } from '@/components/hooks/useAppSelector';
import {
  useGetProfileChannelDetailQuery,
  useGetProfileQuery,
  useGetSubscribeUserMutation,
} from '@/redux/api/api';
import { useAuth } from '@/redux/auth/auth';
import { Button, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { FaChevronRight } from 'react-icons/fa';
import { formatNumberTok } from '@/utils/formatNumber';
import { toastr } from 'react-redux-toastr';
export const ProvaderChannelUserProfile = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const user = useAppSelector(useAuth);
  const { data, isLoading } = useGetProfileChannelDetailQuery(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: userMain } = useGetProfileQuery(null, { skip: !user });
  const [subscribe, { isLoading: subscribeLoading }] = useGetSubscribeUserMutation();
  const src = `http://localhost:4200/uploads/avatar/${data?.avatarPath}`;

  const isExsict = userMain?.subscriptions.some(el => el.toChannel.id === +id);


  return (
    <div className="mt-5">
      <div
        style={{
          backgroundImage: `url(https://yt3.googleusercontent.com/Q_w1omSDgy-LwsdkreHUVIFpr1aqG6oVLUeO3GMw_hsCFWx_OUDT7IgsQQ4SlfEwfVCG7AHy=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          maxWidth: '88%',
          borderRadius: '25px',
          height: '250px',
        }}
        className=""></div>
      <div className="flex gap-4 px-6 py-6">
        <Image
          style={{ borderRadius: '100px', width: '180px', height: '180px' }}
          loader={() => src}
          priority
          src={src}
          alt="user"
          width={180}
          height={180}
        />
        <div className="flex flex-col">
          <div>
            <div className="flex items-center gap-3">
              <h2 style={{ fontSize: '33px' }} className=" text-main uppercase font-medium">
                {data?.name}
              </h2>
              {data?.isVerified && (
                <IoMdCheckmarkCircleOutline className="text-[20px] text-[#4848f6]" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <p>{`${formatNumberTok(data?.subscribersCount)} подписчиков`}</p>
              <p>{`${data?.videos?.length} видео`}</p>
            </div>
          </div>
          <div
            onClick={() => onOpen()}
            className=" flex gap-2 cursor-pointer items-center px-1  mt-5">
            <p className="w-[400px] truncate ">{data?.description}</p>
            <FaChevronRight />
          </div>
          <div className=" mb-2 flex items-end flex-1">
            <Button
              disabled={subscribeLoading}
              onClick={() => {
                subscribe(data?.id),
                  !isExsict
                    ? toastr.success('Вы подписались на', `${data?.name}`)
                    : toastr.error('Вы отписались от', `${data?.name}`);
              }}
              className="bg-[#222222] font-medium text-main "
              variant="faded">
              {isExsict ? 'Вы подписанны' : 'Подписаться'}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-3" style={{ borderTop: '1px solid #3f3f3f' }}>
        <h2 style={{ fontSize: '35px' }} className=" text-main">
          Видео
        </h2>
        {data?.videos?.length ? <VideoChannelProfile video={data.videos} /> : <NoVideoChannel />}
      </div>
      <Modal
        style={{ background: '#212121' }}
        className="text-main"
        backdrop={'blur'}
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">О канале</ModalHeader>
              <ModalBody>
                <p>{data?.description}</p>
                <div className="flex gap-3 items-center">
                  <p>
                    {data?.isVerified
                      ? 'Верифицированная страница'
                      : 'Не Верифицированная страница'}
                  </p>
                  {data?.isVerified && (
                    <IoMdCheckmarkCircleOutline className="text-[20px] text-[#4848f6]" />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {children}
    </div>
  );
};
