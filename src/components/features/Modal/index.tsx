import React from 'react';
import { Modal } from 'antd';
import { useContext } from 'react';
import { CardContext } from '../../Context/Context';
import { CardContextType } from '../../interfaces/interface';
import LoginForm from '../LoginForm';

const ModalWindow: React.FC = () => {
  const { setOpenModal, openModal } = useContext(
    CardContext
  ) as CardContextType;

  return (
    <Modal
      onCancel={() => setOpenModal(false)}
      open={openModal}
      footer={null}
      destroyOnHidden
    >
      <LoginForm />
    </Modal>
  );
};

export default ModalWindow;
