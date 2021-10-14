import React, { useCallback, useEffect } from 'react';
import { Form, Button } from 'antd';

import { BookingParams } from '@/types/hotel';
import styles from './PayDialog.module.scss';


const labelCol = { span: 8 };

const INIT_VALUES: BookingParams = {
  refundAmount: '',
  description: '',
};

interface Props {
  isLoading: boolean;
  isOpen: boolean;
  onDeleteCancel: () => void;
  onDeleteSubmit: () => void;
}

const PayDialog = ({ isLoading, onDeleteSubmit, onDeleteCancel }: Props): JSX.Element => {
  const [form] = Form.useForm();

  const onFinish = useCallback(
    () => {
      onDeleteSubmit();
    },
    [onDeleteSubmit],
  );

  return (
    <Form form={form} labelCol={labelCol} onFinish={onFinish} initialValues={INIT_VALUES}>
      <div className={styles.btnGroup}>
        <p>Вы уверены что хотите отменить выбранную бронь?</p>
        <Form.Item>
          <Button type="default" htmlType="button" onClick={onDeleteCancel} disabled={isLoading}>
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
