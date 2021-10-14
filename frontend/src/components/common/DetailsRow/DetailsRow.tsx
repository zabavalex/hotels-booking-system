import React, { useMemo } from 'react';
import { Skeleton } from 'antd';

import styles from './DetailsRow.module.scss';

interface Props {
  showSkeleton: boolean;
  title: string;
  maxWidth: number;
  data: string | number;
}

const DetailsRow = ({ showSkeleton, maxWidth, title, data }: Props): JSX.Element => {
  const formattedValue = useMemo(() => {
    if (typeof data === 'string' && data === '') {
      return '-';
    }
    return data;
  }, [data]);

  if (showSkeleton) {
    const minWidth = Math.floor((Math.floor(maxWidth / 2) - 10) / 2);

    const skeletonWidth = {
      left: { width: `${Math.random() * minWidth + minWidth}px` },
      right: { width: `${Math.random() * minWidth + minWidth}px` },
    };

    return (
      <div className={styles.row}>
        <div className={styles.skeletonWrapper}>
          <Skeleton.Input active size="small" className={styles.skeleton} style={skeletonWidth.left} />
          <Skeleton.Input active size="small" className={styles.skeleton} style={skeletonWidth.right} />
        </div>
      </div>
    );
  }

  return (
    <p className={styles.row}>
      <span className={styles.label}>{title}</span>
      <span className={styles.value}>{formattedValue}</span>
    </p>
  );
};

export default DetailsRow;
