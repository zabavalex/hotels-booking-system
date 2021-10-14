import React, { useCallback, useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Form, Button, Empty } from 'antd';
// import { format } from 'date-fns';
//
// import DetailsRow from '@/components/common/DetailsRow/DetailsRow';
// import { MerchTransactionStatistics } from '@/types/merchant';
// import TransChart from '../TransChart/TransChart';
// import { selectedMerchantSelector } from '@/store/features/merchant/selectors';
// import RangePicker from '@/components/common/RangePicker/RangePicker';
// import { tomorrowDate } from '@/utils/helpers';
// import styles from './TransStatistics.module.scss';
//
// const validationConfig = {
//   dateStart: [{ required: true, message: '' }],
//   dateEnd: [{ required: true, message: '' }],
// };
//
// const rangePickerPH: [string, string] = ['Date start', 'Date end'];
//
// const INIT_VALUES = {
//   dateRange: [new Date(), tomorrowDate()],
// };
// interface Props {
//   isLoading: boolean;
//   transStatistics: MerchTransactionStatistics;
//   onGetStatistics: (dateStart: string, dateEnd: string) => void;
// }
//
// const TransStatistics = ({ isLoading, transStatistics, onGetStatistics }: Props): JSX.Element => {
//   const [form] = Form.useForm();
//
//   const selectedMerchant = useSelector(selectedMerchantSelector);
//   const [datesValid, setDatesValid] = useState(true);
//
//   const chartOne = useMemo(() => {
//     if (!transStatistics) {
//       return null;
//     }
//     return {
//       labels: ['Total hotel amount', 'Total successful amount', 'Total unsuccessful amount'],
//       values: [
//         transStatistics.totalTransactionsAmount,
//         transStatistics.totalSuccessfulTransactionsAmount,
//         transStatistics.totalUnsuccessfulTransactionsAmount,
//       ],
//     };
//   }, [transStatistics]);
//
//   const chartTwo = useMemo(() => {
//     if (!transStatistics) {
//       return null;
//     }
//     return {
//       labels: ['Total hotel count', 'Total successful count', 'Total unsuccessful count'],
//       values: [
//         transStatistics.totalTransactionsCount,
//         transStatistics.totalSuccessfulTransactionsCount,
//         transStatistics.totalUnsuccessfulTransactionsCount,
//       ],
//     };
//   }, [transStatistics]);
//
//   const onFinish = useCallback(
//     ({ dateRange }) => {
//       const dateFrom = format(dateRange[0], 'yyyy-MM-dd');
//       const dateTo = format(dateRange[1], 'yyyy-MM-dd');
//
//       onGetStatistics(dateFrom, dateTo);
//     },
//     [onGetStatistics],
//   );
//
//   const handleDates = useCallback((dateRange) => {
//     setDatesValid(dateRange?.length);
//   }, []);
//
//   const clearDates = useCallback(async () => {
//     form.setFieldsValue({ dateRange: undefined });
//     try {
//       await form.validateFields(['dateRange']);
//     } catch (error) {
//       // skip error
//     }
//     setDatesValid(false);
//   }, [form]);
//
//   const disabledDate = useCallback((current) => {
//     return current > tomorrowDate();
//   }, []);
//
//   const loadDisabled = useMemo(() => {
//     return isLoading || !datesValid;
//   }, [datesValid, isLoading]);
//
//   return (
//     <div className={styles.statisticsWrapper}>
//       <Form form={form} initialValues={INIT_VALUES} layout="inline" className={styles.form} onFinish={onFinish}>
//         <Form.Item label="Date range" name="dateRange" className={styles.dateRange} rules={validationConfig.dateStart}>
//           <RangePicker
//             placeholder={rangePickerPH}
//             disabledDate={disabledDate}
//             disabled={isLoading}
//             onChange={handleDates}
//           />
//         </Form.Item>
//         <div className={styles.btnGroup}>
//           <Form.Item>
//             <Button type="default" htmlType="button" onClick={clearDates} disabled={isLoading}>
//               Clear
//             </Button>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" disabled={loadDisabled}>
//               Load
//             </Button>
//           </Form.Item>
//         </div>
//       </Form>
//       <div className={styles.statistics}>
//         {!transStatistics && !isLoading ? (
//           <div className={styles.emptyStatistics}>
//             <Empty />
//           </div>
//         ) : (
//           <>
//             <DetailsRow
//               maxWidth={500}
//               showSkeleton={isLoading}
//               title="Total hotel count"
//               data={transStatistics?.totalTransactionsCount}
//             />
//             <DetailsRow
//               maxWidth={500}
//               showSkeleton={isLoading}
//               title="Total successful count"
//               data={transStatistics?.totalSuccessfulTransactionsCount}
//             />
//             <DetailsRow
//               maxWidth={500}
//               showSkeleton={isLoading}
//               title="Total unsuccessful count"
//               data={transStatistics?.totalUnsuccessfulTransactionsCount}
//             />
//             <DetailsRow
//               maxWidth={500}
//               showSkeleton={isLoading}
//               title="Total hotel amount"
//               data={transStatistics?.totalTransactionsAmount}
//             />
//             <DetailsRow
//               maxWidth={500}
//               showSkeleton={isLoading}
//               title="Total successful amount"
//               data={transStatistics?.totalSuccessfulTransactionsAmount}
//             />
//             <DetailsRow
//               maxWidth={500}
//               showSkeleton={isLoading}
//               title="Total unsuccessful amount"
//               data={transStatistics?.totalUnsuccessfulTransactionsAmount}
//             />
//           </>
//         )}
//       </div>
//       {chartOne && chartTwo && (
//         <div className={styles.charts}>
//           <TransChart labels={chartTwo.labels} values={chartTwo.values} />
//           <TransChart labels={chartOne.labels} values={chartOne.values} />
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default TransStatistics;
