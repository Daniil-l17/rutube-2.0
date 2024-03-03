'use client';

import { DeleteConfirmation } from '@/components/deleteConfirmation/DeleteConfirmation';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetProfileQuery } from '@/redux/api/api';
import { useDeleteVideoMutation, useUpdateVideoMutation } from '@/redux/api/inject/videoInject';
import { useAuth } from '@/redux/auth/auth';
import { Card, CardFooter, Image, useDisclosure } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { formatNumberTok } from '@/utils/formatNumber';
import { UpdateVideoModel } from '@/components/updateVideoModel/UpdateVideoModel';

const StudiaProvader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: updateOpen, onOpen: updateOnOpen, onClose: updateClose } = useDisclosure();
  const user = useAppSelector(useAuth);
  const { data,refetch } = useGetProfileQuery(null, { skip: !user });
  const [deleteVideo] = useDeleteVideoMutation();
  const [updateVideoId] = useUpdateVideoMutation();
  const [deleteId, setDeleId] = useState<number>(0);
  const [updateVideo, setUpdateVideo] = useState<number>(0);
  useLayoutEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);

  return (
    <div className=" px-4 py-4">
      <h2 className=" text-[30px] text-main">Мои видео</h2>
      <ul className=" mt-6 flex gap-5  flex-wrap">
        <DeleteConfirmation
          deleteVideo={() =>
            deleteVideo(deleteId)
              .unwrap()
              .then(() => toast.error('Видео успешно удаленно', { theme: 'colored' }))
          }
          isOpen={isOpen}
          onClose={onClose}
        />
        <UpdateVideoModel
          updateVideoId={videodetail =>
            updateVideoId(videodetail)
              .unwrap()
              .then(() => toast.success('Видео успешно Добавленно', { theme: 'colored' }))
              .catch(() => toast.error('Произошла ошибка', { theme: 'colored' }))
          }
          el={data?.videos?.find(el => el.id === updateVideo)}
          isOpen={updateOpen}
          onClose={updateClose}
        />
        {!data?.videos?.length ? (
          <p>Видео нету</p>
        ) : (
          data?.videos?.map(el => (
            <>
              <Card
                key={el.id}
                shadow="sm"
                className="w-[350px] bg-[#222222] text-main h-[300px]"
                isPressable>
                <div
                  style={{
                    background: '#62626259',
                    borderBottomLeftRadius: '15px',
                    borderBottomRightRadius: '15px',
                  }}
                  className="bg-[#62626259]">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    className="w-full bg-[#424141] object-cover h-[200px]"
                    src={`http://localhost:4200/uploads/thumbnails/${el?.thumbnaulPath}`}
                  />
                </div>
                <div className=" h-full px-3 flex py-3 flex-col">
                  <h2 className="textcontenthome text-start">
                    {!!el.name.trim() ? el.name : `Название видео ${el.id}`}
                  </h2>
                  <CardFooter className="text-small flex flex-1 !items-end  !px-1 !py-0 justify-between">
                    <div className="flex gap-5">
                      <FaEdit
                        onClick={() => {
                          updateOnOpen(), setUpdateVideo(el.id);
                        }}
                        style={{ color: '#7183e5' }}
                        className="text-[20px] !text-[#e37777]"
                      />
                      <FaTrashCan
                        onClick={() => {
                          onOpen(), setDeleId(el.id);
                        }}
                        style={{ color: '#e37777' }}
                        className="text-[19px]"
                      />
                    </div>
                    <div>
                      <div className="flex gap-1 items-center text-[#939393]">
                        <p className="text-[#939393]">{formatNumberTok(el.views)}</p>
                        <MdOutlineRemoveRedEye className="!text-[20px]" />
                      </div>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            </>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudiaProvader;
