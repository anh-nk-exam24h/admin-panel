import { RequestAPIParams } from 'types';
import customAxios from 'utils/customAxios';
import { generateRoutePath } from 'utils/utils';

import { notify as Notify } from './../utils/notify';

export const RequestAPI = (data: RequestAPIParams) => {
  const { url, method, params, pagination, payload, notify, hiddenMessage = false } = data;
  // convert objec to a query string
  const pathFomated = generateRoutePath(url, params, pagination);
  return customAxios
    .request({
      url: pathFomated,
      method,
      data: payload,
    })
    .then((res) => {
      if (notify && res.status) {
        Notify({ type: notify.type, message: notify.message });
      }
      return res;
    })
    .catch((err) => {
      if (!hiddenMessage) {
        Notify({ type: 'error', message: err.message });
      }
      throw err;
    });
};

export const getMediaLink = (type: string, url: string, payload: any) => {
  const formData = new FormData();
  // Update the formData object => binary data
  formData.append(type, payload);

  return customAxios
    .post(url, formData)
    .then((res: any) => {
      if (res.status) {
        Notify({ type: 'success', message: 'Tải file lên thành công' });
        return res;
      }
    })
    .catch((err) => {
      console.log(err.message);
      Notify({ type: 'error', message: 'File tải lên lỗi' });
      return err;
    });
};
