import React, { useCallback, useMemo } from 'react';
import { ConfigProvider, Empty } from 'antd';

import styles from './EmptyProvider.module.scss';

interface Props {
  emptyMessage: string;
  headerHeight?: number;
}

const EmptyProvider = ({ emptyMessage, headerHeight = 0, children }: React.PropsWithChildren<Props>): JSX.Element => {
  const height = useMemo(() => {
    return {
      height: `calc(100vh - ${133 + headerHeight}px)`,
    };
  }, [headerHeight]);

  const emptyComponent = useCallback(() => {
    return (
      <div className={styles.emptyWrapper} style={height}>
        <Empty description={emptyMessage} />
      </div>
    );
  }, [emptyMessage, height]);

  return <ConfigProvider renderEmpty={emptyComponent}>{children}</ConfigProvider>;
};

export default EmptyProvider;
