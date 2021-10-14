import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import styles from '@/components/layouts/GeneralLayout/GeneralLayout.module.scss';

// import Merchants from './Merchants/Merchants';
// import TransStatistics from './TransStatistics/TransStatistics';
// import {
//   isMerchantsLoadingSelector,
//   isTransStatisticsLoadingSelector,
//   merchantsSelector,
//   transStatisticsSelector,
// } from '@/store/features/merchant/selectors';
// import { availableMerchants, merchTransactionStatistics, resetMerchant } from '@/store/features/merchant/slice';

const MainPage = (): JSX.Element => {
  const dispatch = useDispatch();

  // const merchants = useSelector(merchantsSelector);
  // const isMerchantsLoading = useSelector(isMerchantsLoadingSelector);
  // const transStatistics = useSelector(transStatisticsSelector);
  // const isTransStatisticsLoading = useSelector(isTransStatisticsLoadingSelector);
  //
  // useEffect(() => {
  //   const fetch = async () => {
  //     await dispatch(availableMerchants());
  //   };
  //
  //   void fetch();
  //
  //   return () => {
  //     dispatch(resetMerchant());
  //   };
  // }, [dispatch]);

  // const getStatistics = useCallback(
  //   async (from: string, to: string) => {
  //     await dispatch(merchTransactionStatistics({ from, to }));
  //   },
  //   [dispatch],
  // );

  return (
    <Row gutter={20}>
      <Col span={11}>
      </Col>
    </Row>
  );
};

export default MainPage;
