import React, {useState, useCallback, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import cn from 'clsx';

import { antNotification, sorterFn } from '@/utils/helpers';
import EmptyProvider from '@/components/common/EmptyProvider/EmptyProvider';
import styles from './BookingPage.module.scss';
import { useClickOutside } from '@/utils/hooks';
import {bookingDetailsSelector, bookingSelector, isBookingLoadingSelector} from "@/store/features/booking/selectors";
import {Booking} from "@/types/booking";
import {
  getBookingsDetails,
  getBookingsList,
  resetBooking,
  resetDetails,
} from "@/store/features/booking/slice";
import DetailsModal from "@/components/pages/BookingPage/DetailsModal/DetailsModal";
import TableHeader from "@/components/pages/BookingPage/TableHeader/TableHeader";

const tableScrollOptions = {
  x: 1,
  y: 'calc(100vh - 160px)',
};

const BookingsPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const filterRef = useRef(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const isLoading = useSelector(isBookingLoadingSelector);
  const bookings = useSelector(bookingSelector);
  const details = useSelector(bookingDetailsSelector);

  const toggleDetails = useCallback(() => {
    setIsDetailsOpen((isOpen) => !isOpen);
  }, []);


  const rowClickHandler = useCallback(
    (record: Booking) => {
      return {
        onClick: async () => {
          const { payload } = await dispatch(
              getBookingsDetails(record),
          );
          toggleDetails();
          if (payload && payload.errMsg) {
            antNotification(payload.errTitle, payload.errMsg);
          }
        },
        
      };
    },
    [dispatch, toggleDetails],
  );

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getBookingsList());
    };

    void fetch();

    return () => {
      dispatch(resetBooking());
    };
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <TableHeader
        className={cn(isFilterOpen && styles.headerShadow)}
        hasData={bookings?.length > 0}
      >
        Бронирование
      </TableHeader>
      <EmptyProvider emptyMessage="Бронирование отсуствует" headerHeight={60}>
        <Table
          rowKey="uuid"
          dataSource={bookings}
          pagination={false}
          scroll={tableScrollOptions}
          loading={isLoading}
          className={cn(styles.table, { [styles.tableDisabled]: isFilterOpen })}
          onRow={rowClickHandler}
        >
          <Table.Column
            width={250}
            sorter={sorterFn('dateFrom')}
            title="Дата начала"
            dataIndex="dateFrom"
          />
          <Table.Column
            width={250}
            sorter={sorterFn('dateTo')}
            title="Дата окончания"
            dataIndex="dateTo"
          />
          </Table>
      </EmptyProvider>
      <DetailsModal details={details} isVisible={isDetailsOpen} onModalClose={toggleDetails} />
    </div>
  );
};

export default BookingsPage;
