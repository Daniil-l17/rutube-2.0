'use client';
import { NoVideoChannel } from '@/components/NoVideoChannel/NoVideoChannel';
import { VideoChannelProfile } from '@/components/VideoChannelProfile/VideoChannelProfile';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/api/api';
import { useAuth } from '@/redux/auth/auth';
import { Button, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { redirect } from 'next/navigation';
import { memo, useLayoutEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { FaChevronRight } from 'react-icons/fa';
import { ModalUpdateUser } from '@/components/modalUpdateUser/ModalUpdateUser';
import { toast } from 'react-toastify';
import { CameraIcon } from '@/images/Icons/CameraIcon';
import { GalleryIcon } from '@/images/Icons/GaleryIcon';
export interface updateProfiledata {
  email: string;
  name: string;
  description: string;
  avatarPath: string;
  profileUrl: string;
  id: number;
}

export const ChannelProvader = memo(({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(useAuth);
  const { data, isLoading } = useGetProfileQuery(null, { skip: !user });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: updateOpen, onOpen: updateOpte, onClose: updateClose } = useDisclosure();
  const [updateprofile, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const src = `http://localhost:4200/uploads/avatar/${data?.avatarPath}`;

  useLayoutEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);


  

  // ДОДЕЛАТЬ
  const profileUpdate = (infoUser: updateProfiledata) => {
    updateprofile(infoUser)
      .unwrap()
      .then(() => {
        toast.success('Профиль усмешно изменен ', { theme: 'colored' });
        updateClose();
      })
      .catch(() => toast.error('Ошибка - проверить данные', { theme: 'colored' }));
  };

  return (
    <div style={{minHeight: '1000px'}} className="mt-8">
      {isLoading ? (
        <h2>loading.....</h2>
      ) : (
        <div>
          <div
            style={{
              backgroundImage: `url(http://localhost:4200/uploads/banneprofile/${data?.profileUrl} )`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              maxWidth: '88%',
              borderRadius: '25px',
              height: '250px',
            }}
            className="imgfil flex bg-[#222222]  z-10 justify-center items-center ">
            {!!!data?.profileUrl && (
              <CameraIcon
                className="animate-pulse -z-10 cursor-pointer  w-20 h-20 text-default-500"
                fill="currentColor"
                size={20}
              />
            )}
          </div>
          <div className="flex gap-4 px-6 py-4">
            {data?.avatarPath ? (
              <Image
                style={{ borderRadius: '100px', width: '180px', height: '180px' }}
                loader={() => src}
                priority
                src={src}
                alt="user"
                width={180}
                height={180}
              />
            ) : (
              <div
                style={{ borderRadius: '100px', width: '180px', height: '180px' }}
                className=" bg-[#222222] flex justify-center">
                <GalleryIcon />
              </div>
            )}
            <div className="flex flex-col">
              <div>
              <div className='flex gap-3'>
              <h2 style={{ fontSize: '33px' }} className=" text-main uppercase font-medium">
                  {data?.name ? data.name : 'Пользователь'}
                </h2>
                {!!data?.isVerified && (
                    <IoMdCheckmarkCircleOutline className="text-[20px] text-[#4848f6]" />
                  )}
              </div>
                <p>{`@${data?.email}`}</p>
              </div>
              <div
                onClick={() => onOpen()}
                className=" flex gap-2 cursor-pointer items-center px-1  mt-5">
                <p>Подробнее о канале</p>
                <FaChevronRight />
              </div>
              <div className=" mb-2 flex items-end flex-1">
                <Button
                  onClick={() => updateOpte()}
                  className="bg-[#222222] font-medium text-main "
                  variant="faded">
                  Настроить канал
                </Button>
              </div>
              <ModalUpdateUser
                profileUpdate={profileUpdate}
                data={data}
                updateLoading={updateLoading}
                update={{ updateOpen, updateClose }}
              />
            </div>
          </div>
          <div className="mt-3" style={{ borderTop: '1px solid #3f3f3f' }}>
            {data?.videos?.length ? (
              <VideoChannelProfile video={data.videos} />
            ) : (
              <NoVideoChannel />
            )}
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
        </div>
      )}
      {children}
    </div>
  );
});
