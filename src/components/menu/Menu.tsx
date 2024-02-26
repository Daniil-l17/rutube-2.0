'use client';
import Link from 'next/link';
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { SiYoutubestudio } from 'react-icons/si';
import { FiAirplay } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { LightDarkTheme } from '../LightDarkTheme/LightDarkTheme';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAuth } from '@/redux/auth/auth';
import { useGetProfileQuery } from '@/redux/api/api';
import { Avatar, User } from '@nextui-org/react';
import { formatNumberTok } from '../utils/formatNumber';
const menuLink = [
  { name: 'Главная', link: '/', icon: <FaHome />, user: true },
  { name: 'Студиа', link: '/studia', icon: <SiYoutubestudio />, user: true },
  { name: 'Мой канал', link: '/channel', icon: <FiAirplay />, user: false },
];

export const Menu = () => {
  const user = useAppSelector(useAuth);
  const pathname = usePathname();
  const { data } = useGetProfileQuery(null, { skip: !user });
  return (
    <div className="w-[250px] h-[100%] flex flex-col px-6 py-6">
      <h1>Rutube v2</h1>
      <div className=" mt-8 h-full flex  flex-col">
        <h2 className=" font-medium text-xl ">Меню</h2>
        <ul className="flex flex-col text-xl gap-8 mt-6">
          {menuLink.map(el => (
            <Link key={el.name} href={el.link}>
              <li
                className={` ${
                  pathname === el.link
                    ? 'text-[#f4f6fb] bg-[#222222] rounded-2xl'
                    : 'text-[#939393]'
                } flex px-[6px] hover:bg-[#222222] rounded-2xl hover:text-[#f4f6fb] py-[6px] group/item gap-3 items-center`}>
                <span
                  className={`px-3 py-3 ${
                    pathname === el.link ? 'bg-[#3b3b3b]' : 'bg-[#222222] '
                  } flex justify-center group-hover/item:bg-[#3b3b3b]  rounded-2xl items-center`}>
                  {el.icon}
                </span>
                <h2>{el.name}</h2>
              </li>
            </Link>
          ))}
        </ul>
        {user ? (
          <div className=" mt-6 h-[450px] px-1 py-1">
            <h2 className="font-medium text-xl">Мои подписки</h2>
            <ul className=" mt-3 flex flex-col gap-4 overflow-auto h-[400px]">
              {data?.subscriptions.map(el => (
                <Link href={''} key={el.toChannel.id}>
                  <User
                    name={!el.toChannel.name.length ? 'пользователь' : el.toChannel.name}
                    description={formatNumberTok(el.toChannel.subscribersCount)}
                    avatarProps={{
                      src: `${
                        el.toChannel.avatarPath.length
                          ? `http://localhost:4200/uploads/avatar/${el.toChannel.avatarPath}`
                          : 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                      } `,
                    }}
                  />
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-5 px-2">
            <h2 className=" font-medium ">
              Вы сможете ставить отметки "Нравится", писать комментарии и подписываться на каналы.
            </h2>
          </div>
        )}
        <div className=" flex-1  justify-center items-end flex mt-6">
          <LightDarkTheme />
        </div>
      </div>
    </div>
  );
};
