import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { CloudDownloadOutlined, FilterOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import cn from 'clsx';

import { PaginationData } from '@/types';
import styles from './TableHeader.module.scss';

interface Props {
  className: string;
  filterActive: boolean;
  hasData: boolean;
  pagination?: PaginationData;
  isLoading: boolean;
  onClick: () => void;
  onPage?: (value: number) => void;
}

const TableHeader = ({
  className,
  children,
  filterActive,
  hasData,
  pagination,
  isLoading,
  onClick,
  onPage,
}: PropsWithChildren<Props>): JSX.Element => {
  const linkRef = useRef(null);

  const handleNextPage = useCallback(
    (type: 'up' | 'down') => () => {
      if (filterActive) {
        onClick();
      }
      onPage(type === 'up' ? 1 : -1);
    },
    [filterActive, onClick, onPage],
  );

  return (
    <header className={cn(styles.header, className)}>
      <button
        className={cn(styles.filterBtn, filterActive && styles.active)}
        type="button"
        disabled={isLoading}
        onClick={onClick}
      >
        <FilterOutlined />
        <span className={styles.btnTitle}>Фильтр</span>
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
