import config from '@/config';
import { ErrorObject } from '@/types';
import {antNotification} from "@/utils/helpers";

export function getErrorFromResponse(error: any): ErrorObject {
  if(error.response && error.response.data){
    return {
      errTitle: error.response.data.errorTitle,
      errMsg: error.response.data.errorMessage,
      errCode: error.response.data.status
    }
  }
  return {
    errTitle: "Ошибка сервера",
    errMsg: "Попробуйте ещё раз",
    errCode: 0
  };
}
