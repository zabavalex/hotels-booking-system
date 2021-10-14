import React, { useEffect } from 'react';
import IMask from 'imask';

import DatePicker from '@/components/common/DatePicker/DatePicker';

const MASK_CONFIG = {
  mask: Date,
  pattern: 'YYYY-MM-DD',
  format(date: Date) {
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return [year, month, day].join('-');
  },
  parse(str) {
    const [year, month, day] = str.split('-');
    return new Date(year, month - 1, day);
  },
  blocks: {
    YYYY: {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 2090,
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    DD: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
    },
  },
};

const DateRangePicker = (props: any): JSX.Element => {
  useEffect(() => {
    const dateFromInput = document.querySelectorAll<HTMLInputElement>('.ant-picker-input > input')[0];
    const dateToInput = document.querySelectorAll<HTMLInputElement>('.ant-picker-input > input')[1];

    IMask(dateFromInput, MASK_CONFIG);
    IMask(dateToInput, MASK_CONFIG);
  }, []);

  return <DatePicker.RangePicker {...props} />;
};

export default DateRangePicker;
