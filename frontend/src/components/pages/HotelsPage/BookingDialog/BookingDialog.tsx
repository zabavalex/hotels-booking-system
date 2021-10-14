import React, { useCallback, useEffect } from 'react';
import { Form, Button } from 'antd';

import { BookingParams } from '@/types/hotel';
import styles from './BookingDialog.module.scss';


const labelCol = { span: 8 };

const INIT_VALUES: BookingParams = {
  refundAmount: '',
  description: '',
};

interface Props {
  isLoading: boolean;
  isOpen: boolean;
  onBookingCancel: () => void;
  onBookingSubmit: () => void;
}

const BookingDialog = ({ isLoading, onBookingSubmit, onBookingCancel }: Props): JSX.Element => {
  const [form] = Form.useForm();

  const onFinish = useCallback(
    () => {
      onBookingSubmit();
    },
    [onBookingSubmit],
  );

  return (
    <Form form={form} labelCol={labelCol} onFinish={onFinish} initialValues={INIT_VALUES}>
      <div className={styles.btnGroup}>
        <p>Вы уверены что хотите забронировать выбранный отель?</p>
        <Form.Item>
          <Button type="default" htmlType="button" onClick={onBookingCancel} disabled={isLoading}>
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

export default BookingDialog;
