import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { format } from 'date-fns';

import { HotelsFilter } from '@/types/hotel';
import DateRangePicker from '@/components/common/RangePicker/DateRangePicker';
import { tomorrowDate } from '@/utils/helpers';
import styles from './FilterDialog.module.scss';

const validationConfig = {
    dateFrom: [{ required: true, message: '' }],
    dateTo: [{ required: true, message: '' }],
    priceFrom: [{ required: true, message: '' }],
    priceTo: [{ required: true, message: '' }],
};

const datesRangePH: [string, string] = ['Введите начальную дату', 'Введите конечную дату'];
const priceRangePH: [string, string] = ['Введите начальную цену', 'Введите конечную цену'];

const labelCol = { span: 8 };

const INIT_VALUES = {
    country: '',
    city: '',
    dateRange: [new Date(), tomorrowDate()],
};

interface Props {
    resetFields: boolean;
    isLoading: boolean;
    onFilterSubmit: (data: HotelsFilter) => void;
    onFilterCancel: () => void;
}

const FilterDialog = ({ resetFields, onFilterSubmit, onFilterCancel, isLoading }: Props): JSX.Element => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (resetFields) {
      form.resetFields();
    }
  }, [form, resetFields]);

  const onFinish = useCallback(
    (data) => {
      const formattedDate = (date) => format(date, 'yyyy-MM-dd');

      const { dateRange, ...rest } = data;

      onFilterSubmit({
        ...rest,
        dateFrom: formattedDate(data.dateRange[0]),
        dateTo: formattedDate(data.dateRange[1]),
      });
    },
    [onFilterSubmit],
  );

  const disabledDate = useCallback((current) => {
    return current > tomorrowDate();
  }, []);

  const triggerParent = useCallback((triggerNode) => triggerNode.parentNode, []);

  return (
    <Form form={form} labelCol={labelCol} onFinish={onFinish} initialValues={INIT_VALUES}>
        <Form.Item label="Заезд/Отъезд" name="dateRange" rules={validationConfig.dateTo}>
            <DateRangePicker
                className={styles.datePicker}
                placeholder={datesRangePH}
                disabledDate={disabledDate}
                disabled={isLoading}
                getPopupContainer={triggerParent}
            />
        </Form.Item>

      <Form.Item label="Страна" name="country">
        <Input placeholder="Введите название страны" disabled={isLoading} />
      </Form.Item>

      <Form.Item label="Город" name="city">
        <Input placeholder="Введите название города" disabled={isLoading} />
      </Form.Item>

      <div className={styles.btnGroup}>
        <Form.Item>
          <Button type="default" htmlType="button" onClick={onFilterCancel} disabled={isLoading}>
            Отмена
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Поиск
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FilterDialog;
