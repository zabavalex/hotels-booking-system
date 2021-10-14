import React, { useCallback } from 'react';
import { Form, Button, Input } from 'antd';
import { Rule } from 'antd/lib/form';

import styles from '../Form.module.scss';
import PasswordInput from "../../../common/PasswordInput/PasswordInput";

const labelCol = { span: 6 };

const validationConfig = {
    login: [{ required: true, message: '' }],
    password: [{required: true, message: ''}],
    email: [{ required: true, message: '', type: 'email' }] as Rule[],
};

interface Props {
  isLoading: boolean;
  onFormTypeChange: () => void;
  onRegistry: (username: string, password: string, email: string) => void;
}

const RegisterForm = ({ isLoading, onFormTypeChange, onRegistry }: Props): JSX.Element => {
  const onFinish = useCallback(
    ({ login, password, email }) => {
      onRegistry(login, password, email);
    },
    [onRegistry],
  );

  return (
    <Form labelCol={labelCol} className={styles.form} name="basic" onFinish={onFinish}>
        <Form.Item label="Логин" name="login" rules={validationConfig.login}>
            <Input placeholder="Введите логин" inputMode="text" disabled={isLoading} />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={validationConfig.password}>
            <PasswordInput placeholder="Введите пароль" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={validationConfig.email}>
            <Input placeholder="Enter email" inputMode="email" disabled={isLoading} />
        </Form.Item>

        <div className={styles.btnGroup}>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Регистрация
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="default" htmlType="button" onClick={onFormTypeChange}>
                    Назад
                </Button>
            </Form.Item>
        </div>
    </Form>
  );
};

export default RegisterForm;
