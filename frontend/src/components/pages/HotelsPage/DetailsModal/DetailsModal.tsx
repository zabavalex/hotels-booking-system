import React, { useCallback, useRef, useState } from 'react';
import { Modal, Card, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'clsx';

import {
  isBookingLoadingSelector,
  isHotelDetailsLoadingSelector,
} from '@/store/features/hotel/selectors';
import {BookingParams, Hotel} from '@/types/hotel';
import DetailsRow from '@/components/common/DetailsRow/DetailsRow';
import { CloseOutlined, WalletOutlined } from '@ant-design/icons';
import BookingDialog from '../BookingDialog/BookingDialog';
import { antNotification } from '@/utils/helpers';
import { bookingHotel } from '@/store/features/hotel/slice';
import styles from './DetailsModal.module.scss';
import { useClickOutside } from '@/utils/hooks';

const COL_1 = [
  { title: 'Название', field: 'name' },
  { title: 'Количество свободных комнат', field: 'numberAvailableRooms' },
  { title: 'Комнат всего', field: 'numberRooms' },
  { title: 'Цена за комнату ', field: 'price' },
];
const COL_2 = [
  { title: 'Страна', field: 'country' },
  { title: 'Город', field: 'city' },
  { title: 'Адрес', field: 'address' },
  { title: 'Владелец', field: 'ownerLogin' },
];

interface Props {
  isVisible: boolean;
  details: Hotel;
  onModalClose: () => void;
}

const DetailsModal = ({ isVisible, details, onModalClose }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const refundRef = useRef(null);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const isBookingLoading = useSelector(isBookingLoadingSelector);
  const detailsAreLoading = useSelector(isHotelDetailsLoadingSelector);

  const handleBooking = useCallback(
    async () => {
      const { payload } = await dispatch(bookingHotel());

      if (payload && payload.errMsg) {
        antNotification(payload.errTitle, payload.errMsg);
      }
      setIsBookingOpen(false);
    },
    [dispatch],
  );


  const toggleBooking = useCallback(() => {
    setIsBookingOpen((isOpen) => !isOpen);
  }, []);

  const closeBooking = useCallback(() => {
    if (isBookingOpen && !isBookingLoading) {
      setIsBookingOpen(false);
    }
  }, [isBookingOpen, isBookingLoading]);


  useClickOutside(refundRef, closeBooking);

  return (
    <Modal
      centered
      title={(
        <div className={styles.header}>
          <p className={styles.headerTitle}>Отель</p>
          <button
              className={cn(styles.headerBtn, isBookingOpen && styles.active)}
              type="button"
              disabled={isBookingLoading}
              onClick={toggleBooking}
          >
            <WalletOutlined />
            <span className={styles.btnTitle}>Забронировать</span>
          </button>
        </div>
      )}
      closeIcon={<CloseOutlined className={styles.close} />}
      className={cn(isBookingOpen && styles.headerShadow)}
      width="850px"
      visible={isVisible}
      footer={null}
      onCancel={onModalClose}
    >
      <section ref={refundRef} className={cn(styles.refundWrapper, isBookingOpen && styles.refundOpen)}>
        <BookingDialog
          isLoading={isBookingLoading}
          isOpen={isBookingOpen}
          onBookingSubmit={handleBooking}
          onBookingCancel={closeBooking}
        />
      </section>
      <section className={cn(styles.cards, isBookingOpen && styles.cardsDisabled)}>
        <Card title={details?.name}>
          <Row gutter={16}>
            <Col span={12} className={styles.detailsCol}>
              {COL_1.map((row) => (
                <DetailsRow
                  key={row.title}
                  maxWidth={350}
                  showSkeleton={detailsAreLoading}
                  title={row.title}
                  data={details?.[row.field]}
                />
              ))}
            </Col>
            <Col span={12} className={styles.detailsCol}>
              {COL_2.map((row) => (
                <DetailsRow
                  key={row.title}
                  maxWidth={350}
                  showSkeleton={detailsAreLoading}
                  title={row.title}
                  data={details?.[row.field]}
                />
              ))}
            </Col>
          </Row>
        </Card>
        <Card title="Описание" className={styles.marginTop}>
          <h1>{details?.description}</h1>
        </Card>
      </section>
    </Modal>
  );
};

export default DetailsModal;
