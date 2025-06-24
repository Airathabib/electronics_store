import { Button, Form, Input, Spin, Typography } from 'antd';
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

  return (
    <div className={styles.LoginForm}>
      <Spin spinning={loading} tip='Загрузка...'>
        <Typography.Text className={styles.error}>{error}</Typography.Text>
        {user ? (
          <div className={styles.UserWrapper}>
            <h3 className={styles.success}>{user?.login} Вы вошли в аккаунт</h3>
            <div className={styles.AdminWrapper}>
              <Link className={styles.AdminWrapperLink} to='./admin'>
                {' '}
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
                        message: '',
                      },
                      { validator: validateEmail },
                    ]}
                  >
                    <Input placeholder='Email' />
                  </Form.Item>

                  <Form.Item name='phone'>
                    <Input placeholder='Телефон' />
                  </Form.Item>
                </>
              )}
              <div className={styles.ButtonContainer}>
                <Button type='primary' htmlType='submit'>
                  {openRegistration ? 'Зарегистрироваться' : 'Войти'}
                </Button>

                {!openRegistration && (
                  <Button
                    onClick={() => setOpenRegistration(!openRegistration)}
                  >
                    {openRegistration ? 'Войти' : 'Создать аккаунт'}
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
