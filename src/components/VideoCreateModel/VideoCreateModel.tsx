import { useCreateVideoMutation } from '@/redux/api/inject/videoInject';
import { Modal, ModalContent, Button } from '@nextui-org/react';
import { memo } from 'react';
import { toast } from 'react-toastify';

export const VideoCreateModel = memo(
  ({ isOpen, onOpenChange }: { isOpen: any; onOpenChange: any }) => {
    const [createVideo,{isLoading}] = useCreateVideoMutation();
    return (
      <Modal
        size="3xl"
        backdrop="opaque"
        className="bg-[#d0d0d043] h-[400px] text-main"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}>
        <ModalContent className="">
          {onClose => (
            <>
              <div className="w-full flex-col gap-4 flex justify-center items-center h-full">
                <h2 className=" text-[25px]">Сначала, создай чернавик 👇</h2>
                <Button
                  onClick={() => {
                    createVideo()
                      .unwrap()
                      .then(() => toast.success('Черновки успешно', { theme: 'colored' })),
                      onClose();
                  }}
                  disabled={isLoading}
                  className=" font-medium"
                  color="secondary">
                  создать черновки
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  },
);
