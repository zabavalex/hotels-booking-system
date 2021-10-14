import React, { useCallback, useRef, useState } from 'react';
import { Modal, Card, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'clsx';


import {BookingParams, Hotel} from '@/types/hotel';
import DetailsRow from '@/components/common/DetailsRow/DetailsRow';
import { CloseOutlined, WalletOutlined } from '@ant-design/icons';
import { antNotification } from '@/utils/helpers';
import styles from './DetailsModal.module.scss';
import { useClickOutside } from '@/utils/hooks';
import {BookingDetails} from "@/types/booking";
import {deleteBooking} from "@/store/features/booking/slice";
import {isBookingDetailsLoadingSelector, isDeleteLoadingSelector} from "@/store/features/booking/selectors";
import DeleteDialog from "@/components/pages/BookingPage/DeleteDialog/DeleteDialog";


const COL_0 = [
  { title: 'Дата заселения', field: 'dateFrom' },
  { title: 'Дата выселения', field: 'dateTo' },
];
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
  details: BookingDetails;
  onModalClose: () => void;
}

const DetailsModal = ({ isVisible, details, onModalClose }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const refundRef = useRef(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isDeleteLoading = useSelector(isDeleteLoadingSelector);
  const detailsAreLoading = useSelector(isBookingDetailsLoadingSelector);

  const handleDelete = useCallback(
    async () => {
      const { payload } = await dispatch(deleteBooking());

      if (payload && payload.errMsg) {
        antNotification(payload.errTitle, payload.errMsg);
      }
      setIsDeleteOpen(false);
    },
    [dispatch],
  );


  const toggleDelete = useCallback(() => {
    setIsDeleteOpen((isOpen) => !isOpen);
  }, []);

  const closeDelete = useCallback(() => {
    if (isDeleteOpen && !isDeleteLoading) {
      setIsDeleteOpen(false);
    }
  }, [isDeleteOpen, isDeleteLoading]);


  useClickOutside(refundRef, closeDelete);

  return (
    <Modal
      centered
      title={(
        <div className={styles.header}>
          <p className={styles.headerTitle}/>
          <button
              className={cn(styles.headerBtn, isDeleteOpen && styles.active)}
              type="button"
              disabled={isDeleteLoading}
              onClick={toggleDelete}
          >
            <WalletOutlined />
            <span className={styles.btnTitle}>Удалить</span>
          </button>
        </div>
      )}
      closeIcon={<CloseOutlined className={styles.close} />}
      className={cn(isDeleteOpen && styles.headerShadow)}
      width="850px"
      visible={isVisible}
      footer={null}
      onCancel={onModalClose}
    >
      <section ref={refundRef} className={cn(styles.refundWrapper, isDeleteOpen && styles.refundOpen)}>
        <DeleteDialog
          isLoading={isDeleteLoading}
          isOpen={isDeleteOpen}
          onDeleteSubmit={handleDelete}
          onDeleteCancel={closeDelete}
        />
      </section>
      <section className={cn(styles.cards, isDeleteOpen && styles.cardsDisabled)}>
        <Card title="Бронирование" className={styles.marginTop}>
          {COL_0.map((row) => (
              <DetailsRow
                  key={row.title}
                  maxWidth={500}
                  showSkeleton={detailsAreLoading}
                  title={row.title}
                  data={details?.[row.field]}
              />
          ))}
        </Card>
        <Card title="Отель">
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
        </Card>
      </section>
    </Modal>
  );
};

export default DetailsModal;
