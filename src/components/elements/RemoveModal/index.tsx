import { Dispatch } from 'react';
import { Modal } from '@mantine/core';

import Button from 'components/shared/Button';

type RemoveModalType = {
  isOpen: boolean;
  onClose: Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  content: string;
  // eslint-disable-next-line no-unused-vars
  handleRemove: (comfirm: boolean) => void;
};
const RemoveModal = ({ isOpen, onClose, title, content, handleRemove }: RemoveModalType) => {
  return (
    <>
      <Modal
        size='md'
        radius={15}
        opened={isOpen}
        onClose={() => onClose(false)}
        hideCloseButton={true}
      >
        <div className='w-full'>
          <p className='ml-3 text-center' style={{ fontSize: 24, fontWeight: '700' }}>
            {title}
          </p>
          <p className='text-center my-8'>{content}</p>
          <div className='flex justify-center'>
            <Button
              variant='outline'
              className='m-4 flex justify-center items-center px-7 py-2 text-sm cursor-pointer'
              onClick={() => onClose(false)}
            >
              Hủy
            </Button>
            <Button
              variant='solid'
              className='m-4 flex justify-center items-center px-7 py-2 text-sm cursor-pointer'
              onClick={() => handleRemove(true)}
            >
              Đồng ý
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RemoveModal;
