
 import React, { useCallback, useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { useHistory } from 'react-router-dom';
 import cn from 'clsx';

 import { login, registration} from '@/store/features/auth/slice';
 import { isAuthLoadingSelector } from '@/store/features/auth/selectors';
 import LoginForm from './LoginForm/LoginForm';
 import RegisterForm from './RegisterForm/RegisterForm';
 import { antNotification } from '@/utils/helpers';
 import config from '@/config';
 import styles from './LoginPage.module.scss';

 type FormType = 'login' | 'registry';

 const LoginPage = (): JSX.Element => {
   const dispatch = useDispatch();
   const history = useHistory();

   const isLoading = useSelector(isAuthLoadingSelector);
   const [formType, setFormType] = useState<FormType>('login');

   const submitAuth = useCallback(
     async (username: string, password: string) => {
       const { payload: response } = await dispatch(login({ username, password }));
       if (response && response.errMsg) {
           antNotification(response.errTitle, response.errMsg);
       } else {
           localStorage.setItem("user", JSON.stringify(response));
           history.push(config.routes.mainPage);
       }
     },
     [dispatch, history],
   );

   const submitRegistration = useCallback(
     async (login: string, password: string, email: string) => {
       const { payload: response} = await dispatch(registration({ login, password, email }));
       if (response && response.errMsg) {
           antNotification(response.errTitle, response.errMsg);
       } else {
           setFormType('login');
           antNotification('Пользователь зарегистрирован', "", 'info');
       }
     },
     [dispatch],
   );

   const changeForm = useCallback(
     (type: FormType) => () => {
       setFormType(type);
     },
     [],
   );

     return (
     <main className={cn(styles.loginContainer, styles.loginInner)}>
       <header className={styles.header}>
         <h1>Booking service</h1>
       </header>
       {formType === 'login' && (
         <LoginForm isLoading={isLoading} onLogin={submitAuth} onFormTypeChange={changeForm('registry')} />
       )}
       {formType === 'registry' && (
         <RegisterForm
           isLoading={isLoading}
           onRegistry={submitRegistration}
           onFormTypeChange={changeForm('login')}
         />
       )}
     </main>
   );
 };

 export default LoginPage;


