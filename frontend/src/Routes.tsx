import React, { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Redirect, Switch } from 'react-router-dom';
import { Spin } from 'antd';

import config from '@/config';
import {
  isAuthorisedSelector,
  hasSessionErrorSelector,
  isSessionCheckedSelector,
} from '@/store/features/auth/selectors';
import PermissionRoute from '@/components/common/PermissionRoute/PermissionRoute';
import GeneralLayout from '@/components/layouts/GeneralLayout/GeneralLayout';
import LoginPage from '@/components/pages/LoginPage/LoginPage';
import MainPage from '@/components/pages/MainPage/MainPage';
import HotelsPage from "@/components/pages/HotelsPage/HotelsPage";
import { checkSession, logout } from '@/store/features/auth/slice';
import { antNotification } from '@/utils/helpers';
import BookingsPage from "@/components/pages/BookingPage/BookingsPage";

const Routes = (): JSX.Element => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(isAuthorisedSelector);
  const isSessionChecked = useSelector(isSessionCheckedSelector);
  const sessionError = useSelector(hasSessionErrorSelector);

  const { routes } = config;

  useEffect(() => {
    if (sessionError) {
      dispatch(logout());
      antNotification('Auth error', sessionError.errMsg);
    }
  }, [dispatch, sessionError]);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  if (!isSessionChecked && !isAuthorized) {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    } as CSSProperties;

    return (
      <main style={style}>
        <Spin size="large" />
      </main>
    );
  }

  return (
    <Router>
      <Switch>
        <PermissionRoute
          exact
          path={routes.loginPage}
          redirect={routes.hotelsPage}
          component={LoginPage}
          hasPermission={!isAuthorized}
        />
        <GeneralLayout>
          <PermissionRoute
            path={routes.mainPage}
            redirect={routes.loginPage}
            component={MainPage}
            hasPermission={isAuthorized}
          />
          <PermissionRoute
            path={routes.hotelsPage}
            redirect={routes.loginPage}
            component={HotelsPage}
            hasPermission={isAuthorized}
          />
          <PermissionRoute
            path={routes.bookingsPage}
            redirect={routes.loginPage}
            component={BookingsPage}
            hasPermission={isAuthorized}
          />
        </GeneralLayout>
        <Redirect to={routes.loginPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
