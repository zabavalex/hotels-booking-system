import React, { useCallback, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TableRowSelection } from 'antd/lib/table/interface';
// import { Table } from 'antd';
//
// import EmptyProvider from '@/components/common/EmptyProvider/EmptyProvider';
// import { Merchant } from '@/types/merchant';
// import { sorterFn } from '@/utils/helpers';
// import { selectMerchant } from '@/store/features/merchant/slice';
// import { selectedMerchantSelector } from '@/store/features/merchant/selectors';
// import styles from './Merchants.module.scss';
//
// const tableScrollOptions = { y: 'calc(100vh - 95px)' };
//
// interface Props {
//   isLoading: boolean;
//   merchants: Merchant[];
// }
//
// const Merchants = ({ isLoading, merchants }: Props): JSX.Element => {
//   const dispatch = useDispatch();
//
//   const selectedMerchant = useSelector(selectedMerchantSelector);
//
//   const handleSelectedRow = useCallback(
//     (field) => {
//       if (field === selectedMerchant) {
//         dispatch(selectMerchant(null));
//       } else {
//         dispatch(selectMerchant(field));
//       }
//     },
//     [dispatch, selectedMerchant],
//   );
//
//   const rowClickHandler = useCallback(
//     (record) => {
//       return {
//         onClick: () => {
//           handleSelectedRow(record.merchantNumber);
//         },
//       };
//     },
//     [handleSelectedRow],
//   );
//
//   const onSelectedRowKeyChange = useCallback(
//     (record) => {
//       handleSelectedRow(record.merchantNumber);
//     },
//     [handleSelectedRow],
//   );
//
//   const rowSelection = useMemo<TableRowSelection<Merchant>>(() => {
//     return {
//       selectedRowKeys: [selectedMerchant],
//       onSelect: onSelectedRowKeyChange,
//     };
//   }, [selectedMerchant, onSelectedRowKeyChange]);
//
//   return (
//     <EmptyProvider emptyMessage="No merchants data">
//       <Table
//         loading={isLoading}
//         rowKey="merchantNumber"
//         className={styles.merchants}
//         dataSource={merchants}
//         pagination={false}
//         scroll={tableScrollOptions}
//         rowSelection={rowSelection}
//         onRow={rowClickHandler}
//       >
//         <Table.Column width={135} sorter={sorterFn('legalName')} title="Legal Name" dataIndex="legalName" />
//         <Table.Column sorter={sorterFn('merchantNumber')} title="Merchant Number" dataIndex="merchantNumber" />
//         <Table.Column sorter={sorterFn('merchantName')} title="Merchant Name" dataIndex="merchantName" />
//       </Table>
//     </EmptyProvider>
//   );
// };
//
// export default Merchants;
