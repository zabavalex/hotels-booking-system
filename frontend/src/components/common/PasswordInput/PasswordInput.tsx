import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { Input, InputProps, Tooltip } from 'antd';
import { ExclamationCircleFilled, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import styles from './PasswordInput.module.scss';

const PasswordInput = (props: InputProps): JSX.Element => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.getModifierState) {
        setIsCapsLockOn(event.getModifierState('CapsLock'));
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  const togglePassword = useCallback((event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setIsPasswordVisible((isVisible) => !isVisible);
  }, []);

  return (
    <Input
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      suffix={(
        <>
          {isCapsLockOn && (
            <Tooltip title="Caps Lock is on">
              <ExclamationCircleFilled className={styles.capsWarning} />
            </Tooltip>
          )}
          {isPasswordVisible ? (
            <EyeOutlined className={styles.showPwd} onClick={togglePassword} />
          ) : (
            <EyeInvisibleOutlined className={styles.showPwd} onClick={togglePassword} />
          )}
        </>
      )}
    />
  );
};

export default PasswordInput;
