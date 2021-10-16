import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import cn from 'clsx';

import { antNotification, sorterFn } from '@/utils/helpers';
import EmptyProvider from '@/components/common/EmptyProvider/EmptyProvider';
import FilterDialog from './FilterDialog/FilterDialog';
import DetailsModal from './DetailsModal/DetailsModal';
import {
    getHotels,
    saveFilter, saveDetails, resetDetails, saveHotel,
} from '@/store/features/hotel/slice';
import {Hotel, HotelCreate, HotelsFilter} from '@/types/hotel';
import TableHeader from '@/components/common/TableHeader/TableHeader';
import {
  isHotelLoadingSelector,
  hotelDetailsSelector,
  hotelsSelector,
} from '@/store/features/hotel/selectors';
import styles from './HotelsPage.module.scss';
import { useClickOutside } from '@/utils/hooks';
import HotelCreateDialog from "@/components/pages/HotelsPage/HotelCreateDialog/HotelCreateDialog";

const tableScrollOptions = {
  x: 1,
  y: 'calc(100vh - 160px)',
};

const HotelsPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const createHotelRef = useRef(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateHotelOpen, setIsCreateHotelOpen] = useState(false);

  const isLoading = useSelector(isHotelLoadingSelector);
  const hotels = useSelector(hotelsSelector);
  const details = useSelector(hotelDetailsSelector);

  const toggleFilter = useCallback(() => {
    setIsFilterOpen((isOpen) => !isOpen);
    setIsCreateHotelOpen(false);
  }, []);

  const toggleCreateHotel = useCallback(() => {
    setIsCreateHotelOpen((isOpen) => !isOpen);
    setIsFilterOpen(false);
  }, []);

  const closeFilter = useCallback(() => {
    if (isFilterOpen && !isLoading) {
      setIsFilterOpen(false);
    }
  }, [isFilterOpen, isLoading]);

  const closeHotelCreate = useCallback(() => {
    if (isCreateHotelOpen && !isLoading) {
      setIsCreateHotelOpen(false);
    }
  }, [isCreateHotelOpen, isLoading]);

  const toggleDetails = useCallback(() => {
    setIsDetailsOpen((isOpen) => !isOpen);
  }, []);

  const submitFilter = useCallback(
    async (data: HotelsFilter) => {
      dispatch(saveFilter(data));
      await dispatch(getHotels());
      toggleFilter();
    },
    [dispatch, toggleFilter],
  );

  const submitHotelCreate = useCallback(
      async (data: HotelCreate) => {
        await dispatch(saveHotel(data));
        toggleCreateHotel();
      },
      [dispatch, toggleCreateHotel],
  );


  const rowClickHandler = useCallback(
    (record: Hotel) => {
      return {
        onClick: async () => {
          dispatch(resetDetails());
          dispatch(saveDetails(record));
          toggleDetails();
        },
      };
    },
    [dispatch, toggleDetails],
  );

  useClickOutside(filterRef, closeFilter, 'ant-picker');
  useClickOutside(createHotelRef, closeFilter, 'ant-picker');

  return (
    <div className={styles.wrapper}>
      <TableHeader
        className={cn(isFilterOpen || isCreateHotelOpen && styles.headerShadow)}
        filterActive={isFilterOpen}
        createHotelActive={isCreateHotelOpen}
        isLoading={isLoading}
        onFilterClick={toggleFilter}
        onCreateHotelClick={toggleCreateHotel}
      >
        Отели
      </TableHeader>
      <section ref={filterRef} className={cn(styles.filterWrapper, { [styles.filterOpen]: isFilterOpen })}>
        <FilterDialog
          resetFields={isFilterOpen}
          isLoading={isLoading}
          onFilterCancel={closeFilter}
          onFilterSubmit={submitFilter}
        />
      </section>
      <section ref={createHotelRef} className={cn(styles.createHotelWrapper, { [styles.createHotelOpen]: isCreateHotelOpen })}>
        <HotelCreateDialog
            resetFields={isCreateHotelOpen}
            isLoading={isLoading}
            onHotelCreateCancel={closeHotelCreate}
            onHotelCreateSubmit={submitHotelCreate}
        />
      </section>
      <EmptyProvider emptyMessage="Нет подходящих отелей" headerHeight={60}>
        <Table
          rowKey="uuid"
          dataSource={hotels}
          pagination={false}
          scroll={tableScrollOptions}
          loading={isLoading}
          className={cn(styles.table, { [styles.tableDisabled]: isFilterOpen || isCreateHotelOpen })}
          onRow={rowClickHandler}
        >
          <Table.Column
            width={190}
            sorter={sorterFn('name')}
            title="Название"
            dataIndex="name"
          />
          <Table.Column
            width={175}
            sorter={sorterFn('country')}
            title="Страна"
            dataIndex="country"
          />
          <Table.Column
            width={195}
            sorter={sorterFn('city')}
            title="Город"
            dataIndex="city"
          />
          <Table.Column
            width={215}
            sorter={sorterFn('address')}
            title="Адрес"
            dataIndex="address"
          />
          <Table.Column
            width={230}
            sorter={sorterFn('numberAvailableRooms')}
            title="Количество&nbsp;комнат&nbsp;доступно"
            dataIndex="numberAvailableRooms"
          />
          <Table.Column
            width={215}
            sorter={sorterFn('numberRooms')}
            title="Количество&nbsp;комнат&nbsp;всего"
            dataIndex="numberRooms"
          />
          <Table.Column
            width={185}
            sorter={sorterFn('ownerLogin')}
            title="Владелец"
            dataIndex="ownerLogin"
          />
          </Table>
      </EmptyProvider>
      <DetailsModal details={details} isVisible={isDetailsOpen} onModalClose={toggleDetails} />
    </div>
  );
};

export default HotelsPage;
