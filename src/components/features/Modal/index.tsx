import React from 'react';
import { Modal } from 'antd';
import { useContext } from 'react';
import { CardContext } from '../../Context/Context';
import { CardContextType } from '../../interfaces/interface';
import LoginForm from '../LoginForm';

import styles from './index.module.scss';

const ModalWindow: React.FC = () => {
  const { setOpenModal, openModal } = useContext(
    CardContext
  ) as CardContextType;

  return (
    <div className={styles.ModalWindow}>
      <Modal
        onCancel={() => setOpenModal(false)}
        open={openModal}
        footer={null}
        destroyOnHidden
      >
        <LoginForm />
      </Modal>
    </div>
  );
};

export default ModalWindow;
