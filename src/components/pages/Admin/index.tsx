import React from 'react';
import styles from './index.module.scss';
import { Button, Form, Input, message, Select } from 'antd';
import { Product } from '../../interfaces/interface';
import { useCreateProductMutation } from '../../store/productApi';

const Admin: React.FC = () => {
  const [form] = Form.useForm();
  // const dispatch = useAppDispatch();

  const [createProduct] = useCreateProductMutation();

  const handleFinish = (values: Product) => {
    createProduct(values);
    message.success('Товар добавлен');
    form.resetFields();
  };
  return (
    <div className={styles.Admin}>
      <h1 className={styles.AdminTitle}>Добавление товара</h1>

      <Form
        className={styles.Form}
        layout='vertical'
        onFinish={handleFinish}
        form={form}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          name='brand'
          label='Бренд'
          rules={[{ required: true, message: 'Поле обязательно' }]}
        >
          <Input className={styles.Input} />
        </Form.Item>

        <Form.Item
          name='category'
          label='Категория'
          rules={[{ required: true, message: 'Поле обязательно' }]}
        >
          <Select
            options={[
              { value: 'phone', label: 'Смартфон' },
              { value: 'smartwatch', label: 'Смартчасы' },
              { value: 'airpod', label: 'Наушники' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name='memory'
          label='Память'
          rules={[{ required: true, message: 'Поле обязательно' }]}
        >
          <Input className={styles.Input} />
        </Form.Item>

        <Form.Item
          name='accum'
          label='Аккумулятор'
          rules={[{ required: true, message: 'Поле обязательно' }]}
        >
          <Input className={styles.Input} />
        </Form.Item>

        <Form.Item
          name='price'
          label='Цена'
          rules={[{ required: true, message: 'Поле обязательно' }]}
        >
          <Input className={styles.Input} />
        </Form.Item>

        <Form.Item
          name='photo'
          label='Фото'
          rules={[{ required: true, message: 'Поле обязательно' }]}
        >
          <Input className={styles.Input} />
        </Form.Item>

        <Form.Item
          name='title'
          label='Название'
          rules={[{ required: true, message: 'Поле обязательно' }]}
        >
          <Input className={styles.Input} />
        </Form.Item>

        <Form.Item
          name='description'
          label='Описание'
          rules={[{ required: true, message: 'Поле обязательно' }]}
        >
          <Input.TextArea className={styles.Input} />
        </Form.Item>

        <Form.Item
          name='rating'
          initialValue={1}
          style={{ display: 'none' }}
          shouldUpdate={false} // отключаем обновление
          validateTrigger={false} // отключаем валидацию
        >
          <Input type='hidden' />
        </Form.Item>

        <Form.Item
          name='quantity'
          initialValue={1}
          style={{ display: 'none' }}
          shouldUpdate={false}
          validateTrigger={false}
        >
          <Input type='hidden' />
        </Form.Item>

        <Form.Item
          name='like'
          initialValue={false}
          style={{ display: 'none' }}
          shouldUpdate={false}
          validateTrigger={false}
        >
          <Input type='hidden' />
        </Form.Item>

        <Form.Item
          name='addedToCart'
          initialValue={false}
          style={{ display: 'none' }}
          shouldUpdate={false}
          validateTrigger={false}
        >
          <Input type='hidden' />
        </Form.Item>

        <Button className={styles.Button} type='primary' htmlType='submit'>
          Добавить
        </Button>
      </Form>
    </div>
  );
};

export default Admin;
