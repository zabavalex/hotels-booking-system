import React, { useCallback, useEffect } from 'react';
import { Form, Button } from 'antd';
import styles from './ReversalDialog.module.scss';

const labelCol = { span: 8 };

interface Props {
  isLoading: boolean;
  onReversalCancel: () => void;
  onReversalSubmit: () => void;
}

const ReversalDialog = ({ isLoading, onReversalSubmit, onReversalCancel }: Props): JSX.Element => {
  const [form] = Form.useForm();

  const onFinish = useCallback(() => {
    onReversalSubmit();
  }, [onReversalSubmit]);

  return (
    <Form form={form} labelCol={labelCol} onFinish={onFinish}>
      <p>Are you sure you want to Cancel the transaction?</p>
      <div className={styles.btnGroup}>
        <Form.Item>
          <Button type="default" htmlType="button" onClick={onReversalCancel} disabled={isLoading}>
            No
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Yes
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ReversalDialog;
