import { RootState } from '@/store/store';
import { ErrorObject, Fetch } from '@/types/index';

/**
 * Is user authenticated or not
 * @param state
 */
export const isAuthorisedSelector = (state: RootState): boolean => {
  return state.auth.isAuthorised;
};

/**
 * Is session expired
 * @param state
 */
export const hasSessionErrorSelector = (state: RootState): ErrorObject | null => {
  if (!state.auth.isAuthorised) {
    return null;
  }

  const errors = ['auth', 'contact', 'inventory', 'merchant', 'transaction'];
  const match = errors.find((err) => state[err] && state[err].error?.errCode === 401);

  return match ? state[match].error : null;
};

/**
 * Is auth request in progress
 * @param state
 */
export const isAuthLoadingSelector = (state: RootState): boolean => {
  return state.auth.authFetchingState === Fetch.Pending;
};

/**
 * Is session request in progress
 * @param state
 */
export const isSessionCheckedSelector = (state: RootState): boolean => {
  return [Fetch.Fulfilled, Fetch.Rejected].includes(state.auth.sessionFetchingState);
};
