'use client';
import { NoVideoChannel } from '@/components/NoVideoChannel/NoVideoChannel';
import { VideoChannelProfile } from '@/components/VideoChannelProfile/VideoChannelProfile';
import { useAppSelector } from '@/hooks/useAppSelector';
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
import { UserNoVideo } from '@/components/userNoVideo/UserNoVideo';
import { CameraIcon } from '@/images/Icons/CameraIcon';
import { toast } from 'react-toastify';
import { useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';
export const ProvaderChannelUserProfile = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const user = useAppSelector(useAuth);
  const userId = useAppSelector(state => state.auth.user?.id);
  const { data, isLoading } = useGetProfileChannelDetailQuery(id, { refetchOnFocus: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: userMain } = useGetProfileQuery(null, { skip: !user });
  const [subscribe, { isLoading: subscribeLoading }] = useGetSubscribeUserMutation();
  const src = `http://localhost:4200/uploads/avatar/${data?.avatarPath}`;

  useLayoutEffect(() => {
    if (userId === +id) {
      redirect('/Mychannel');
    }
  }, [userId]);

  const isExsict = userMain?.subscriptions.some(el => el.toChannel.id === +id);

  return (
    <div style={{ minHeight: '1000px' }} className="mt-5">
      {isLoading ? (
        <h2>loading....</h2>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(http://localhost:4200/uploads/banneprofile/${data?.profileUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              maxWidth: '88%',
              zIndex: '30',
              borderRadius: '25px',
              height: '250px',
            }}
            className="flex bg-[#222222] justify-center items-center ">
            {!!!data?.profileUrl && (
              <CameraIcon
                className="animate-pulse cursor-pointer z-20  w-20 h-20 text-default-500"
                fill="currentColor"
                size={20}
              />
            )}
          </div>
          <div className="flex gap-4 px-6 py-6">
            <Image
              style={{
                borderRadius: '100px',
                width: '180px',
                height: '180px',
                backgroundColor: '#222222',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              loader={() => src}
              priority
              src={src}
              alt={`${data?.id}`}
              width={180}
              height={180}
            />
            <div className="flex flex-col">
              <div>
                <div className="flex items-center gap-3">
                  <h2 style={{ fontSize: '33px' }} className=" text-main uppercase font-medium">
                    {data?.name ? data.name : `Пользователь ${data?.id}`}
                  </h2>
                  {!!data?.isVerified && (
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
                style={{ maxWidth: '460px' }}
                className=" flex gap-2  cursor-pointer items-center px-1  mt-5">
                <p style={{ maxWidth: '420px' }} className="truncate ">
                  {data?.description ? data.description : 'Описание канала'}
                </p>
                <FaChevronRight />
              </div>
              <div className=" mb-2 flex items-end flex-1">
                {user && (
                  <Button
                    disabled={subscribeLoading}
                    onClick={() => {
                      subscribe(data?.id),
                        !isExsict
                          ? toast.success(`Вы подписались на ${data?.name}`, { theme: 'colored' })
                          : toast.error(`Вы отписались от ${data?.name}`, { theme: 'colored' });
                    }}
                    className="bg-[#222222] font-medium text-main "
                    variant="faded">
                    {isExsict ? 'Вы подписанны' : 'Подписаться'}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3" style={{ borderTop: '1px solid #3f3f3f' }}>
            <h2 style={{ fontSize: '35px' }} className=" text-main">
              Видео
            </h2>
            {data?.videos?.length ? <VideoChannelProfile video={data.videos} /> : <UserNoVideo />}
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
        </>
      )}
      {children}
    </div>
  );
};
