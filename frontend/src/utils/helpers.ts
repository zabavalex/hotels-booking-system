import React from 'react';
import { notification } from 'antd';
import { addDays } from 'date-fns';

export type NotificationType = 'error' | 'success' | 'info' | 'warning';
/**
 * Ant design notification
 *
 * @param message
 * @param description
 * @param type
 */
export function antNotification(
  message: string,
  description: string | React.ReactNode,
  type: NotificationType = 'error',
): void {
  notification[type]({
    message,
    description,
    placement: 'topRight',
    duration: 5,
  });
}

type AnyValue = { [key: string]: string | number };
/**
 * Sorts table's rows
 *
 * @param fieldName
 */
export function sorterFn(fieldName: string) {
  return (a: AnyValue, b: AnyValue): number => {
    if (!(fieldName in a)) {
      return 0;
    }
    const first = a[fieldName];
    const second = b[fieldName];

    if (typeof first === 'string' && typeof second === 'string') {
      return first.localeCompare(second);
    }
    if (typeof first === 'number' && typeof second === 'number') {
      return first - second;
    }
    return 0;
  };
}

/**
 * Get tomorrow's date
 */
export function tomorrowDate(): Date {
  return addDays(new Date(), 1);
}
