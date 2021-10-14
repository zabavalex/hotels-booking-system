import React, { useCallback } from 'react';
import { Input, InputProps } from 'antd';

interface Props extends InputProps {
  allowNegative?: boolean;
}

const NumericInput = ({allowNegative = false, ...props }: Props): JSX.Element => {
  const handleChange = useCallback(
    (event) => {
      const { value } = event.target;
      const reg = allowNegative ? /^-?\d*(\.\d*)?$/ : /^\d*(\.\d*)?$/;
      if (!Number.isNaN(value) && reg.test(value)) {
        props.onChange(value);
      }
    },
    [allowNegative, props],
  );

  return <Input {...props} onChange={handleChange} maxLength={25} />;
};

export default NumericInput;
