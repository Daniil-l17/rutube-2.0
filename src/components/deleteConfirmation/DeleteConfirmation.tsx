
import {Modal, ModalContent, ModalHeader, ModalFooter, Button} from "@nextui-org/react";

export const DeleteConfirmation = ({isOpen,onClose,deleteVideo}:{onClose:any,isOpen:any,deleteVideo: () => void}) => {

  return (
    <Modal 
    size={'xs'} 
    isOpen={isOpen} 
    onClose={onClose} 
    className="bg-[#d0d0d043] h-[150px] text-main"
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Вы действительно хотите удалить Видео???</ModalHeader>
          <ModalFooter>
            <Button onClick={deleteVideo} color="danger" onPress={onClose}>
              Удалить
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  )
}
