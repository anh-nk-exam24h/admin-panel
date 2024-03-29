import { createAsyncThunk } from '@reduxjs/toolkit';
import { PathAPI } from 'api/route';
import { notify } from 'utils/notify';

import { RequestAPI } from './requestAPI';

// eslint-disable-next-line no-unused-vars
export const loginRequest = createAsyncThunk('auth/login', (payload: any, { dispatch }) => {
  return RequestAPI({
    url: PathAPI.login,
    method: 'POST',
    payload,
  }).then((res: any) => {
    const handleErr = JSON.parse(JSON.stringify(res));
    if (handleErr.status === 401) {
      throw {
        type: 'error',
        message: 'Tài khoản hoặc mật khẩu không đúng',
      };
    } else {
      return res;
    }
  });
  // .catch((err) => {
  //   console.log({err})
  //   notify({
  //     type: 'error',
  //     message: err.message || 'Đã có lỗi xảy ra',
  //   });
  // });
});

export const getConstant = createAsyncThunk('question/getConstant', () => {
  return RequestAPI({
    url: PathAPI.constant,
    method: 'GET',
  })
    .then((res: any) => {
      if (res.status) {
        return res.data;
      }
    })
    .catch((err) => {
      notify({
        type: 'error',
        message: err.message || 'Đã có lỗi xảy ra',
      });
    });
});

export const getUserinfo = createAsyncThunk('roleuser/getRoleUser', () => {
  return RequestAPI({
    url: PathAPI.user,
    method: 'GET',
  })
    .then((res: any) => {
      if (res.status) {
        return res.data;
      }
    })
    .catch((err) => {
      notify({
        type: 'error',
        message: err.message || 'Đã có lỗi xảy ra',
      });
    });
});
export const getConfigWithRole = createAsyncThunk('roleuser/getConfigRoleUser', () => {
  return RequestAPI({
    url: PathAPI.configRole,
    method: 'GET',
  })
    .then((res: any) => {
      if (res.status) {
        return res.data;
      }
    })
    .catch((err) => {
      notify({
        type: 'error',
        message: err.message || 'Đã có lỗi xảy ra',
      });
    });
});
