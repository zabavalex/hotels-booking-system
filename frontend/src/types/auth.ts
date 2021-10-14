import { ErrorObject } from './index';

export interface User {
  login: string;
  token: string;
}

interface PortalUserPermittedMenu {
  menuID: number;
  menuName: string;
}

export interface SimpleResult {
  success: boolean;
}

export interface UserResult {
  login: string;
  role: string;
  token: string;
}

export interface SessionResult {
  success: boolean;
}

export interface RegistrationResult {
  registrationResult: ErrorObject;
}
