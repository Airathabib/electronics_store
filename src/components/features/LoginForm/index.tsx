import { Button, Form, Input, Spin } from 'antd';
import React, { useContext, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../handlers/reduxHooks/reduxHooks';
import { CardContext } from '../../Context/Context';
import { CardContextType, UserType } from '../../interfaces/interface';
import { userRegistration, login } from '../../store/usersSlise';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const LoginForm: React.FC = () => {
  const { loading, error, user } = useAppSelector((state) => state.users);

  const { openRegistration, setOpenRegistration } = useContext(
    CardContext
  ) as CardContextType;

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    if (error === 'Пользователь с таким логином или email уже существует') {
      setOpenRegistration(false);
      form.resetFields();
    }
  }, [error]);

  // Отправка формы
  const handleSubmit = async (values: UserType) => {
    if (values.email) {
      await dispatch(userRegistration(values));
      return;
    }
    await dispatch(login(values));
  };

  const validateEmail = (_: any, value: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value || emailRegex.test(value)) return Promise.resolve();
    return Promise.reject('Неверный формат email');
  };

  const validatePhone = (_: any, value: string | undefined) => {
    if (typeof value === 'undefined' || value.trim() === '') {
      return Promise.resolve(); // Или Promise.reject('Поле обязательно для заполнения')
    }

    const cleanedValue = value.replace(/[^\d+]/g, '');

    if (cleanedValue.length < 10 || cleanedValue.length > 12) {
      return Promise.reject('Номер должен содержать 10-12 цифр');
    }

    if (!/^(\+7|8)/.test(cleanedValue)) {
      return Promise.reject('Номер должен начинаться с +7 или 8');
    }

    return Promise.resolve();
  };

  return (
    <div className={styles.LoginForm}>
      <Spin spinning={loading} tip='Загрузка...'>
        <h3 className={styles.error}>{error}</h3>
        {user ? (
          <div className={styles.UserWrapper}>
            <h3 className={styles.success}>{user?.login} Вы вошли в аккаунт</h3>
            <div className={styles.AdminWrapper}>
              <Link className={styles.AdminWrapperLink} to='./admin'>
                Перейти на страницу администрирования
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Form form={form} onFinish={handleSubmit}>
              <h2>{openRegistration ? 'Регистрация' : 'Вход'}</h2>

              <Form.Item
                name='login'
                rules={[
                  {
                    required: true,
                    min: 3,
                    message: 'Логин не менее 3 символов',
                  },
                ]}
              >
                <Input placeholder='Логин' />
              </Form.Item>

              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    min: 6,
                    message: 'Пароль не менее 6 символов',
                  },
                ]}
              >
                <Input.Password placeholder='Пароль' autoComplete='off' />
              </Form.Item>

              {openRegistration && (
                <>
                  <Form.Item
                    name='email'
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Введите email',
                      },
                      { validator: validateEmail },
                    ]}
                  >
                    <Input placeholder='Email' />
                  </Form.Item>

                  <Form.Item
                    name='phone'
                    rules={[
                      {
                        required: true,
                        message: 'Телефон обязателен для заполнения',
                      },
                      {
                        validator: validatePhone,
                      },
                    ]}
                  >
                    <Input placeholder='+7 (XXX) XXX-XX-XX' />
                  </Form.Item>
                </>
              )}

              <div className={styles.ButtonContainer}>
                <Button type='primary' htmlType='submit'>
                  {openRegistration ? 'Зарегистрироваться' : 'Войти'}
                </Button>

                {/* Кнопка "Назад" */}
                {openRegistration ? (
                  <Button onClick={() => setOpenRegistration(false)}>
                    Назад
                  </Button>
                ) : (
                  <Button onClick={() => setOpenRegistration(true)}>
                    Создать аккаунт
                  </Button>
                )}
              </div>
            </Form>
          </>
        )}
      </Spin>
    </div>
  );
};

export default LoginForm;
