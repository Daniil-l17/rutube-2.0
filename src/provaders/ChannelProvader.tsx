'use client';
import { NoVideoChannel } from '@/components/NoVideoChannel/NoVideoChannel';
import { VideoChannelProfile } from '@/components/VideoChannelProfile/VideoChannelProfile';
import { useAppSelector } from '@/components/hooks/useAppSelector';
import { useGetProfileQuery } from '@/redux/api/api';
import { useAuth } from '@/redux/auth/auth';
import { Button, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { FaChevronRight } from 'react-icons/fa';
export const ChannelProvader = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(useAuth);
  const { data, isLoading } = useGetProfileQuery(null, { skip: !user });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const src = `http://localhost:4200/uploads/avatar/${data?.avatarPath}`;
  useLayoutEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);



  return (
    <div className="mt-8">
      <div className="flex gap-4 px-6 py-4">
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
            <h2 style={{ fontSize: '33px' }} className=" text-main uppercase font-medium">
              {data?.name}
            </h2>
            <p>{`@${data?.email}`}</p>
          </div>
          <div
            onClick={() => onOpen()}
            className=" flex gap-2 cursor-pointer items-center px-1  mt-5">
            <p>Подробнее о канале</p>
            <FaChevronRight />
          </div>
          <div className=" mb-2 flex items-end flex-1">
            <Button className="bg-[#222222] font-medium text-main " variant="faded">
              Настроить канал
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-3" style={{ borderTop: '1px solid #3f3f3f' }}>
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
