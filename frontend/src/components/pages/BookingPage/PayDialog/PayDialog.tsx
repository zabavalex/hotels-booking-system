import React, { useCallback, useEffect } from 'react';
import { Form, Button } from 'antd';

import { BookingParams } from '@/types/hotel';
import styles from './PayDialog.module.scss';


const labelCol = { span: 8 };


interface Props {
  isLoading: boolean;
  isOpen: boolean;
  onPayCancel: () => void;
  onPaySubmit: () => void;
}

const PayDialog = ({ isLoading, onPaySubmit, onPayCancel }: Props): JSX.Element => {
  const [form] = Form.useForm();

  const onFinish = useCallback(
    () => {
      onPaySubmit();
    },
    [onPaySubmit],
  );

  return (
    <Form form={form} labelCol={labelCol} onFinish={onFinish}>
      <div className={styles.btnGroup}>
        <p>Вы уверены что хотите оплатить выбранную бронь?</p>
        <Form.Item>
          <Button type="default" htmlType="button" onClick={onPayCancel} disabled={isLoading}>
            Нет
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Да
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default PayDialog;
