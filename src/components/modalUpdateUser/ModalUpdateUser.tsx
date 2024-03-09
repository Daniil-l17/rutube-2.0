'use client';
import { useUploadFile } from '@/hooks/useUploadFile';
import { MailIcon } from '@/images/Icons/MailIcon';
import { updateProfiledata } from '@/provaders/ChannelProvader';
import { Iuser } from '@/types/IUser';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
} from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';

export const ModalUpdateUser = memo(
  ({
    update,
    updateLoading,
    data,
    profileUpdate,
  }: {
    update: { updateOpen: any; updateClose: any };
    data: Iuser | undefined;
    updateLoading: boolean;
    profileUpdate: (infoUser: updateProfiledata) => void;
  }) => {
    const [infoUser, setUserInfo] = useState({
      email: '',
      name: '',
      description: '',
      avatarPath: '',
      profileUrl: '',
      id: 0,
    });
    const avatarRef = useRef<HTMLInputElement>(null);
    const bannerRef = useRef<HTMLInputElement>(null);
    const [handelChangeFile, files] = useUploadFile();
    const [bannerUserUpdate, updateBannerFiles] = useUploadFile();

    useEffect(() => {
      setUserInfo({
        email: data?.email!,
        name: data?.name!,
        description: data?.description!,
        avatarPath: files || data?.avatarPath!,
        profileUrl: updateBannerFiles || data?.profileUrl!,
        id: +data?.id!,
      });
    }, [data]);

    useEffect(() => {
      setUserInfo(prev => ({
        ...prev,
        avatarPath: files || data?.avatarPath!,
      }));
    }, [files]);

    useEffect(() => {
      setUserInfo(prev => ({
        ...prev,
        profileUrl: updateBannerFiles || data?.profileUrl!,
      }));
    }, [updateBannerFiles]);

    const userBannerProfile = `http://localhost:4200/uploads/banneprofile/${infoUser?.profileUrl}`;

    return (
      <Modal
        size={'5xl'}
        style={{ background: '#212121' }}
        className="text-main"
        backdrop={'blur'}
        isOpen={update.updateOpen}
        onClose={update.updateClose}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Изменить Данные</ModalHeader>
              <ModalBody className="flex gap-5 flex-col items-start">
                <div className="flex w-[400px] gap-6 items-center">
                  <Avatar
                    src={`http://localhost:4200/uploads/avatar/${infoUser?.avatarPath}`}
                    className="w-20 h-20 text-large"
                  />
                  <input
                    ref={avatarRef}
                    onChange={event => handelChangeFile(event, 'avatar')}
                    type="file"
                    hidden
                  />
                  <button onClick={() => avatarRef.current?.click()}>Добавить файл</button>
                </div>
                <div className="flex items-center w-[100%] flex-col gap-6 ">
                  <Image
                    width={400}
                    className=" bg-[#918f8f22] flex justify-center  items-center rounded-2xl w-full h-[300px]"
                    height={150}
                    alt="bannerUser"
                    priority
                    loader={() => userBannerProfile}
                    src={userBannerProfile}
                  />
                  <button onClick={() => bannerRef.current?.click()}>Добавить файл</button>
                  <input
                    ref={bannerRef}
                    onChange={event => bannerUserUpdate(event, 'banneprofile')}
                    type="file"
                    hidden
                  />
                </div>
                <div className="flex w-[100%] gap-6 items-center">
                  <Input
                    type="email"
                    color={'danger'}
                    label="Email"
                    onChange={e => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    value={infoUser.email}
                    style={{ cursor: 'pointer' }}
                    placeholder="Ваш email"
                    className="max-w-[100%]"
                    endContent={
                      // @ts-ignore
                      <MailIcon className="text-[30px] text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
                <div className="flex w-[100%] gap-6 items-center">
                  <Input
                    type="Ваше имя"
                    color={'primary'}
                    label="Ваше имя"
                    onChange={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    value={infoUser.name}
                    placeholder="Ваше имя"
                    style={{ cursor: 'pointer' }}
                    className="max-w-[100%]"
                  />
                </div>
                <div className="flex w-[100%] gap-6 items-center">
                  <Input
                    type="Ваше имя"
                    color={'primary'}
                    label="Описание"
                    value={infoUser.description}
                    style={{ cursor: 'pointer' }}
                    onChange={e => setUserInfo(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Ваше Описание"
                    className="max-w-[100%]"
                  />
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  disabled={updateLoading}
                  onClick={() => profileUpdate(infoUser)}
                  color="secondary"
                  variant="flat">
                  Изменить данные
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  },
);
