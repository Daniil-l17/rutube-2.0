import { useUploadFile } from '@/hooks/useUploadFile';
import { CameraIcon } from '@/images/Icons/CameraIcon';
import { IvideoDto } from '@/types/Ivideo';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Checkbox,
} from '@nextui-org/react';
import { memo, useEffect, useRef, useState } from 'react';

export const UpdateVideoModel = memo(
  ({
    isOpen,
    onClose,
    el,
    updateVideoId,
  }: {
    updateVideoId: (infoUser: IvideoDto) => void;
    isOpen: any;
    onClose: any;
    el: IvideoDto | undefined;
  }) => {
    const [infoUser, setUserInfo] = useState<IvideoDto>({
      name: '',
      description: '',
      thumbnaulPath: '',
      videoPath: '',
      isPublic: false,
      id: 0,
    });
    const ref = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLInputElement>(null);
    const [updateFile, file] = useUploadFile();
    const [updateVIdeo, fileVideo] = useUploadFile();


    useEffect(() => {
      setUserInfo({
        name: el?.name!,
        description: el?.description!,
        thumbnaulPath: file || el?.thumbnaulPath!,
        videoPath: el?.videoPath!,
        isPublic: el?.isPublic!,
        id: +el?.id!,
      });
    }, [el]);

    useEffect(() => {
      setUserInfo(prev => ({
        ...prev,
        thumbnaulPath: file || el?.thumbnaulPath!,
      }));
    }, [file]);

    useEffect(() => {
      setUserInfo(prev => ({
        ...prev,
        videoPath: fileVideo || el?.videoPath!,
      }));
    }, [fileVideo]);


    return (
      <Modal
        className="bg-[#1e1e1ed3] text-main h-[600px]"
        isOpen={isOpen}
        size="5xl"
        onClose={onClose}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Изменить видео</ModalHeader>
              <ModalBody className="!flex gap-2 flex-row !justify-between">
                <div className="w-[75%] flex flex-col gap-4 text-main">
                  <Input
                    variant="bordered"
                    className="bg-[#71707074] text-main rounded-2xl"
                    placeholder={'Название видео'}
                    value={infoUser.name}
                    onChange={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Textarea
                    variant="bordered"
                    placeholder="Описание видео"
                    value={infoUser.description}
                    className="max-w-xs !bg-[#71707074] !text-main rounded-2xl"
                    onChange={e => setUserInfo(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <Button onClick={() => videoRef.current?.click()}  color="primary" variant="flat">Загрузить видео</Button>
                  <input ref={videoRef} onChange={(e) => updateVIdeo(e,'videoPath')} type="file" hidden />
                  <div className="flex flex-1 gap-2 justify-start items-end">
                    <p>{!infoUser.isPublic ? 'Не публичное видео' : 'Публичное видео'}</p>
                    <Checkbox
                    size="md"
                      isSelected={infoUser.isPublic}
                      onClick={() => setUserInfo(prev => ({ ...prev, isPublic: !prev.isPublic }))}>
                    </Checkbox>
                  </div>
                </div>
                <div style={{ paddingRight: '15px' }} className="w-full flex gap-3 flex-col ">
                  <div className="flex justify-end">
                    <div
                      style={{
                        backgroundImage: `url(http://localhost:4200/uploads/thumbnails/${infoUser.thumbnaulPath})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: '400px',
                        borderRadius: '25px',
                        height: '250px',
                      }}
                      className="imgfil flex bg-[#222222]  z-10 justify-center items-center ">
                      {/*            {!!!data?.profileUrl && (
              <CameraIcon
                className="animate-pulse -z-10 cursor-pointer  w-20 h-20 text-default-500"
                fill="currentColor"
                size={20}
              />
            )}*/}
                    </div>
                  </div>
                  <div className="flex justify-center pl-32">
                    <Button onClick={() => ref.current?.click()} color="primary" variant="flat">
                      Загрузить превью
                    </Button>
                    <input
                      onChange={e => updateFile(e, 'thumbnails')}
                      type="file"
                      hidden
                      ref={ref}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => updateVideoId(infoUser)} color="primary" onPress={onClose}>
                  Изменить Видео
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  },
);
