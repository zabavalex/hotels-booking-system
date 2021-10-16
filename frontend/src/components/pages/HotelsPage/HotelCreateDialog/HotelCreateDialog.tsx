import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { format } from 'date-fns';

import { HotelCreate } from '@/types/hotel';
import NumericInput from "@/components/common/NumericInput/NumericInput";
import styles from './HotelCreateDialog.module.scss';
import TextArea from "antd/lib/input/TextArea";

const validationConfig = {
    name: [{ required: true, message: '' }],
    country: [{ required: true, message: '' }],
    city: [{ required: true, message: '' }],
    address: [{ required: true, message: '' }],
    description: [{ required: true, message: '' }],
    numberAvailableRooms: [{ required: true, message: '' }],
    numberRooms: [{ required: true, message: '' }],
    price: [{ required: true, message: '' }],
};

const labelCol = { span: 8 };

const INIT_VALUES = {
    name: '',
    country: '',
    city: '',
    address: '',
    description: '',
    numberAvailableRooms: 0,
    numberRooms: 0,
    price: 0,
};

interface Props {
  resetFields: boolean;
  isLoading: boolean;
  onHotelCreateSubmit: (data: HotelCreate) => void;
  onHotelCreateCancel: () => void;
}

const HotelCreateDialog = ({ resetFields, onHotelCreateSubmit, onHotelCreateCancel, isLoading }: Props): JSX.Element => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (resetFields) {
      form.resetFields();
    }
  }, [form, resetFields]);

  const onFinish = useCallback(
    (data) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const { login } = user;
        const { ...rest} = data;

        onHotelCreateSubmit({
            ...rest,
            ownerLogin: login,
            numberAvailableRooms: 0,
        });
    },
    [onHotelCreateSubmit],
  );

  return (
    <Form form={form} labelCol={labelCol} onFinish={onFinish} initialValues={INIT_VALUES}>
        <Form.Item label="Название" name="name">
            <Input placeholder="Введите название отеля" disabled={isLoading} />
        </Form.Item>

        <Form.Item label="Страна" name="country">
            <Input placeholder="Введите название страны" disabled={isLoading} />
        </Form.Item>

        <Form.Item label="Город" name="city">
            <Input placeholder="Введите название города" disabled={isLoading} />
        </Form.Item>

        <Form.Item label="Адрес" name="address">
            <Input placeholder="Введите адрес" disabled={isLoading} />
        </Form.Item>

        <Form.Item label="Количество комнат" name="numberRooms" rules={validationConfig.numberRooms}>
            <NumericInput
                placeholder="Введите количество комнат"
                allowNegative={false}
                disabled={isLoading}
            />
        </Form.Item>

        <Form.Item label="Цена" name="price" rules={validationConfig.numberRooms}>
            <NumericInput
                placeholder="Введите цену за проживание"
                allowNegative={false}
                disabled={isLoading}
            />
        </Form.Item>

        <Form.Item label="Описание" name="description" rules={validationConfig.description}>
            <TextArea placeholder="Введите описание" showCount autoSize maxLength={180} rows={4} disabled={isLoading} />
        </Form.Item>

      <div className={styles.btnGroup}>
        <Form.Item>
          <Button type="default" htmlType="button" onClick={onHotelCreateCancel} disabled={isLoading}>
            Отмена
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Создать
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default HotelCreateDialog;
