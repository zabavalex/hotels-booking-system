import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  hasPermission: boolean;
  redirect: string;
}

const PermissionRoute = ({ hasPermission, redirect, ...props }: Props): JSX.Element => {
  if (hasPermission) {
    return <Route {...props} />;
  }
  return <Redirect to={redirect} />;
};

export default PermissionRoute;
