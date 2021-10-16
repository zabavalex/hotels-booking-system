import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { CloudDownloadOutlined, FilterOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import cn from 'clsx';

import { PaginationData } from '@/types';
import styles from './TableHeader.module.scss';

interface Props {
    className: string;
    filterActive: boolean;
    createHotelActive: boolean;
    pagination?: PaginationData;
    isLoading: boolean;
    onFilterClick: () => void;
    onCreateHotelClick: () => void;
    onPage?: (value: number) => void;
}

const TableHeader = ({
    className,
    children,
    filterActive,
    createHotelActive,
    pagination,
    isLoading,
    onFilterClick,
    onCreateHotelClick,
    onPage,
}: PropsWithChildren<Props>): JSX.Element => {
  const linkRef = useRef(null);

  const handleNextPage = useCallback(
    (type: 'up' | 'down') => () => {
      if (filterActive) {
        onFilterClick();
      }
      onPage(type === 'up' ? 1 : -1);
    },
    [filterActive, onFilterClick, onPage],
  );

  return (
    <header className={cn(styles.header, className)}>
        <button
            className={cn(styles.filterBtn, filterActive || createHotelActive && styles.active)}
            type="button"
            disabled={isLoading}
            onClick={onFilterClick}
        >
            <FilterOutlined />
            <span className={styles.btnTitle}>Фильтр</span>
        </button>
        <button
            className={cn(styles.filterBtn, filterActive || createHotelActive && styles.active)}
            type="button"
            disabled={isLoading}
            onClick={onCreateHotelClick}
        >
            <FilterOutlined />
            <span className={styles.btnTitle}>Создать отель</span>
        </button>
      <a ref={linkRef} aria-hidden="true" href="#fake">
        &nbsp;
      </a>
      <h2 className={styles.title}>{children}</h2>
      {pagination && (
        <div className={styles.pagination}>
          <button type="button" disabled={pagination.page === 1 || isLoading} onClick={handleNextPage('down')}>
            <LeftOutlined />
          </button>
          <span className={styles.page}>{pagination.page}</span>
          <button type="button" disabled={pagination.isLast || isLoading} onClick={handleNextPage('up')}>
            <RightOutlined />
          </button>
        </div>
      )}
    </header>
  );
};

export default TableHeader;
