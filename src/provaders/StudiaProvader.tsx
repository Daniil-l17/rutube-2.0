'use client';

import { DeleteConfirmation } from '@/components/deleteConfirmation/DeleteConfirmation';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetProfileQuery } from '@/redux/api/api';
import { useDeleteVideoMutation } from '@/redux/api/inject/videoInject';
import { useAuth } from '@/redux/auth/auth';
import { Card, CardFooter, Image, useDisclosure } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { toast } from 'react-toastify';

const StudiaProvader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAppSelector(useAuth);
  const { data } = useGetProfileQuery(null, { skip: !user });
  const [deleteVideo] = useDeleteVideoMutation();
  useLayoutEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, []);
  return (
    <div className=" px-4 py-4">
      <h2 className=" text-[30px] text-main">Мои видео</h2>
      <ul className=" mt-6 flex gap-5  flex-wrap">
        {!data?.videos?.length ? (
          <p>Видео нету</p>
        ) : (
          data?.videos?.map(el => (
            <Card
              key={el.id}
              shadow="sm"
              className="w-[350px] bg-[#222222] text-main h-[300px]"
              isPressable
              onPress={() => console.log('item pressed')}>
              <DeleteConfirmation
                deleteVideo={() =>
                  deleteVideo(el.id)
                    .unwrap()
                    .then(() => toast.error('Видео успешно удаленно', { theme: 'colored' }))
                }
                isOpen={isOpen}
                onClose={onClose}
              />
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                className="w-full bg-[#424141] object-cover h-[200px]"
                src={`http://localhost:4200/uploads/thumbnails/${el?.thumbnailPath}`}
              />
              <div className=" h-full px-3 flex py-3 flex-col">
                <h2 className=" text-start">Даниил Лукьянов</h2>
                <h2 onClick={onOpen}>удалить</h2>
                <CardFooter className="text-small flex-1 !items-end  !p-0 justify-between">
                  <b className="w-[200px] truncate ">{el.description}</b>
                  <p className="text-default-500">{el.views}</p>
                </CardFooter>
              </div>
            </Card>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudiaProvader;
