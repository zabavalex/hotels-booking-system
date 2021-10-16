import React, { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Tooltip } from 'antd';
import {
  HomeOutlined,
  FileProtectOutlined,
  UserSwitchOutlined,
  BankOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

import { logout } from '@/store/features/auth/slice';
import Logo from './img/logo.svg';
import config from '@/config';
import { isAuthorisedSelector } from '@/store/features/auth/selectors';
import styles from './GeneralLayout.module.scss';

const { Content, Sider } = Layout;

const GeneralLayout = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthorized = useSelector(isAuthorisedSelector);

  const pathname = useMemo(() => [location.pathname], [location.pathname]);

  useEffect(() => {}, [dispatch, isAuthorized]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
      <Layout>
        <Sider theme="light">
          <div className={styles.logoContainer}>
            <img src={Logo} alt="" width="50" height="50" />
            <div className={styles.logoTitle}>
              <p>Hotel</p>
              <p>Booking Service</p>
            </div>
          </div>

          <Menu mode="inline" theme="light" selectedKeys={pathname}>
            {/*<Menu.Item key={config.routes.mainPage} icon={<HomeOutlined />}>*/}
            {/*  <Link to={config.routes.mainPage}>Main page</Link>*/}
            {/*</Menu.Item>*/}
            <Menu.Item key={config.routes.hotelsPage} icon={<BankOutlined />}>
              <Link to={config.routes.hotelsPage}>Отели</Link>
            </Menu.Item>
            <Menu.Item key={config.routes.bookingsPage} icon={<FileProtectOutlined />}>
              <Link to={config.routes.bookingsPage}>Бронирование</Link>
            </Menu.Item>
          </Menu>
          <section className={styles.sideFooter}>
            <Button icon={<UserSwitchOutlined />} block onClick={handleLogout}>
              Выйти
            </Button>
          </section>
        </Sider>
        <Content className={styles.content}>{children}</Content>
      </Layout>
  );
};

export default GeneralLayout;
