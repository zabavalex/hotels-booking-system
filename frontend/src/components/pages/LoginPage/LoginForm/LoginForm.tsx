import React, { useCallback } from 'react';
import { Form, Button, Input } from 'antd';

import PasswordInput from '@/components/common/PasswordInput/PasswordInput';
import styles from '../Form.module.scss';

const labelCol = { span: 6 };

const validationConfig = {
  login: [{ required: true, message: '' }],
  password: [{ required: true, message: '' }],
};

interface Props {
  isLoading: boolean;
  onFormTypeChange: () => void;
  onLogin: (username: string, password: string) => void;
}

const LoginForm = ({ isLoading, onLogin, onFormTypeChange }: Props): JSX.Element => {
  const onFinish = useCallback(
    ({ username, password }) => {
      onLogin(username, password);
    },
    [onLogin],
  );
  return (
    <Form labelCol={labelCol} className={styles.form} onFinish={onFinish}>
      <Form.Item label="Логин" name="username" rules={validationConfig.login}>
        <Input placeholder="Введите логин" inputMode="text" disabled={isLoading} />
      </Form.Item>

      <Form.Item label="Пароль" name="password" rules={validationConfig.password}>
        <PasswordInput placeholder="Введите пароль" />
      </Form.Item>

      <div className={styles.btnGroup}>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Войти
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="button" onClick={onFormTypeChange} disabled={isLoading}>
            Регистрация
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginForm;
