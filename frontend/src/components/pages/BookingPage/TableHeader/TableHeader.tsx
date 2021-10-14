import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { CloudDownloadOutlined, FilterOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import cn from 'clsx';

import { PaginationData } from '@/types';
import styles from './TableHeader.module.scss';

interface Props {
  className: string;
  hasData: boolean;
}

const TableHeader = ({
  className,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const linkRef = useRef(null);

  return (
    <header className={cn(styles.header, className)}>
      <a ref={linkRef} aria-hidden="true" href="#fake">
        &nbsp;
      </a>
      <h2 className={styles.title}>{children}</h2>
    </header>
  );
};

export default TableHeader;
