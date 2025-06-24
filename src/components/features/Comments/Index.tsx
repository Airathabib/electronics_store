import React, { useContext, useEffect } from 'react'; // Добавляем useEffect в импорте
import {
  useGetCommentsQuery,
  useAddCommentsMutation,
} from '../../store/commentsApi';
import { Button, Form, Input } from 'antd';
import { CardContext } from '../../Context/Context';
// import { createComment } from '../store/productCardSlice';
import {
  CardContextType,
  Comments as CommentType,
} from '../../interfaces/interface';

import styles from './index.module.scss';

const Comments: React.FC<{ productId: string }> = ({
  productId,
}: {
  productId: string;
}) => {
  const { formatDate, setIsFormValid, isTouched, handleFormInteraction } =
    useContext(CardContext) as CardContextType;

  const { data: comments, error, isLoading } = useGetCommentsQuery(productId);

  const [addComments] = useAddCommentsMutation();
  const [form] = Form.useForm();

  const validateForm = async () => {
    try {
      await form.validateFields();
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    if (isTouched) {
      validateForm();
    }
  }, [isTouched]);

  // Используем onValuesChange для отслеживания изменений
  const handleValuesChange = () => {
    if (isTouched) {
      validateForm();
    }
  };

  const handleFinish = (values: CommentType) => {
    const date = new Date().toLocaleString();
    addComments({ ...values, date, productId });
    form.resetFields();
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  if (error) return <h1>Ошибка загрузки комментариев...</h1>;

  return (
    <div className={styles.Comments}>
      <h2 className={styles.CommentsTitle}>Комментарии</h2>
      <Form
        onFinish={handleFinish}
        form={form}
        className={styles.CommentsForm}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name='userName'
          className={styles.CommentsFormItem}
          rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
        >
          <Input placeholder='Ваше имя' onFocus={handleFormInteraction} />
        </Form.Item>
        <Form.Item
          name='userComment'
          className={styles.CommentsFormItem}
          rules={[
            { required: true, message: 'Пожалуйста, введите комментарий' },
          ]}
        >
          <Input.TextArea
            style={{ height: 120, resize: 'none' }}
            placeholder='Комментарий'
            onFocus={handleFormInteraction}
          />
        </Form.Item>
        <Button
          htmlType='submit'
          type='primary'
          className={styles.CommentsButton}
        >
          Добавить
        </Button>
      </Form>

      <div className={styles.CommentsWrapper}>
        {comments?.map((comment: CommentType) => (
          <div key={comment.id}>
            <div className={styles.CommentsBlock}>
              <h3>Имя: {comment.userName}</h3>
              <span>{comment.id}</span>
              <p>Дата {formatDate(comment.date)}</p>
              <p>Комментарий: {comment.userComment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
