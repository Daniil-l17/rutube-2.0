'use client';
import { memo, useEffect, useState } from 'react';
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
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react';
import { MailIcon } from '@/images/Icons/MailIcon';
import { LockIcon } from '@/images/Icons/LockIcon';
import { UserHeader } from '../userHeader/UserHeader';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Idata, actions, login, register, useAuth } from '@/redux/auth/auth';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from '@/redux/api/api';
import confetti from 'canvas-confetti';
import { CameraIcon } from '@/images/Icons/CameraIcon';
import { LuDownload } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import { VideoCreateModel } from '../VideoCreateModel/VideoCreateModel';
import { SearchHeader } from '../searchHeader/SearchHeader';
import { useGetVideoBySearchTermLQuery } from '@/redux/api/inject/videoInject';
import { useDebounce } from '@/hooks/useDebounce';
const Header = memo(() => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    isOpen: createVideo,
    onOpen: opencreatvieo,
    onOpenChange: onOpencreateVideo,
  } = useDisclosure();
  const user = useAppSelector(useAuth);
  const [infoUser, setInfoUser] = useState<Idata>({ email: '', password: '' });
  const [authRegistrAndLogin, setAuthRegistrAndLogin] = useState<'login' | 'register'>('login');
  const db = useDispatch();
  const { data, isLoading, refetch } = useGetProfileQuery(null, { skip: !user });
  const route = useRouter();
  const [search, setSearch] = useState('');
  const debounce = useDebounce(search);
  const [open, setOpne] = useState(false);

  const {
    data: searchDate,
    isLoading: loading,
    error,
  } = useGetVideoBySearchTermLQuery(debounce, {
    skip: debounce.length < 2,
  });

  useEffect(() => {
    setOpne(debounce?.length > 2 && searchDate?.length! > 0);
  }, [debounce, searchDate]);

  const authAcc = () => {
    if (authRegistrAndLogin === 'login') {
      db(login(infoUser))
        .unwrap()
        .then(() => refetch())
        .catch(() => setInfoUser({ email: '', password: '' }));
    } else {
      db(register(infoUser))
        .unwrap()
        .then(() => refetch())
        .catch(() => setInfoUser({ email: '', password: '' }));
    }
  };

  const handleConfetti = (onClose: () => void) => {
    if (user) {
      var count = 200;
      var defaults = {
        origin: { y: 0.7 },
      };

      function fire(particleRatio: any, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
    onClose();
  };

  return (
    <header className=" pr-14 py-3 sticky z-20 bg-[#111]  top-0 flex justify-between items-center w-full">
      <Search search={search} setSearch={setSearch} />
      {open && (
        <div className=" w-[700px] left-0 h-[200px] bg-[#222] rounded-2xl top-[70px] absolute">
          {loading ? (
            <p>loading....</p>
          ) : searchDate?.length! > 0 ? (
            <SearchHeader searchDate={searchDate} />
          ) : (
            <p>по запросу ничего не найденно</p>
          )}
        </div>
      )}
      {user ? (
        <div className="flex gap-5">
          <VideoCreateModel isOpen={createVideo} onOpenChange={onOpencreateVideo} />
          <Popover showArrow placement="bottom">
            <PopoverTrigger className="cursor-pointer">
              <div className="flex gap-4 items-center">
                <Badge content={data?.subscriptions.length} color="primary">
                  {data?.avatarPath ? (
                    <Avatar src={`http://localhost:4200/uploads/avatar/${data?.avatarPath}`} />
                  ) : (
                    <div className=" bg-[#4c4b4b] w-10 h-10 rounded-[30px] flex justify-center">
                      <CameraIcon />
                    </div>
                  )}
                </Badge>
                <div className="flex flex-col items-center">
                  <h2 className=" font-medium text-[20px]">
                    {data?.name ? data.name : 'Пользователь'}
                  </h2>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-1 bg-transparent ">
              <UserHeader data={data!} logout={() => db(actions.logoutFromAccount())} />
            </PopoverContent>
          </Popover>
          <LuDownload
            onClick={() => {
              route.push('/studia'), opencreatvieo();
            }}
            className=" cursor-pointer text-[25px] text-[#6657d4]"
          />
        </div>
      ) : (
        <Button onPress={onOpen} className=" bg-[#3f3f46] px-6 text-[#f4f6fb]">
          Войти
        </Button>
      )}
      <Modal
        size="2xl"
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
              <ModalHeader className="flex  flex-col gap-1">
                {authRegistrAndLogin === 'login' ? 'Вход' : 'Регестриция'}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  value={infoUser.email}
                  onChange={e => setInfoUser(prev => ({ ...prev, email: e.target.value }))}
                  className=" border border-solid rounded-2xl"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  onChange={e => setInfoUser(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  type="password"
                  value={infoUser.password}
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
              <ModalFooter className="flex justify-between items-center">
                <h2
                  onClick={() =>
                    setAuthRegistrAndLogin(prev => (prev === 'login' ? 'register' : 'login'))
                  }
                  className=" cursor-pointer">
                  {authRegistrAndLogin !== 'login' ? 'Войти в аккаунт' : 'Нет аккаунта?'}
                </h2>
                <div className=" flex gap-2">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onClick={authAcc} onPress={() => handleConfetti(onClose)}>
                    {authRegistrAndLogin === 'login' ? 'Войти' : 'Зарегестрироваться'}
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </header>
  );
});

export default Header;
