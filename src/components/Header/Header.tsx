'use client';
import React, { memo, useState } from 'react';
import { Search } from '../search/Search';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Avatar,
  Badge,
} from '@nextui-org/react';
import { Popover, PopoverTrigger, PopoverContent, Button, User } from '@nextui-org/react';

import { MailIcon } from '@/images/Icons/MailIcon';
import { LockIcon } from '@/images/Icons/LockIcon';
import { UserHeader } from '../userHeader/UserHeader';
import { useAppSelector } from '../hooks/useAppSelector';
import { Idata, actions, login, useAuth } from '@/redux/auth/auth';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from '@/redux/api/api';
const Header = memo(() => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useAppSelector(useAuth)
  const [infoUser, setInfoUser] = useState<Idata>({ email: 'test5@test.ru', password: '123456'});
  const [authorization,setAuthorization] = useState({email: '',password:''})
  const db = useDispatch()
  const {data} = useGetProfileQuery(null,{skip: !user})
  console.log(data)
  
  return (
    <header className=" pr-14 py-3 sticky top-1 flex justify-between items-center w-full">
      <Search />
      
      {user ? (
        <Popover  showArrow placement="bottom">
          <PopoverTrigger className='cursor-pointer' >
            <div className='flex gap-2 items-center'>
            <Badge content="5" color="primary">
            <Avatar src={`http://localhost:4200/uploads/avatar/${data?.avatarPath}`} />
              </Badge>
            <div className='flex flex-col items-center'>
              <h2 className=' font-medium text-[20px]'>{data?.name}</h2>
            </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-1 bg-transparent ">
            <UserHeader data={data!} logout={() => db(actions.logoutFromAccount())}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Button  onPress={onOpen} className=" bg-[#3f3f46] px-6 text-[#f4f6fb]">
          Войти
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="bg-[#18181b] text-white"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex  flex-col gap-1">Войти</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  className=" border border-solid rounded-2xl"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  className=" border border-solid rounded-2xl"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: 'text-small',
                    }}>
                    <p className="text-[#939393] font-medium">Подвердить</p>
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={() => db(login(infoUser))} color="primary" onPress={onClose}>
                  Войти
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </header>
  );
})

export default Header;
