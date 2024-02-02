import { createSlice } from '@reduxjs/toolkit';
import { getUserinfo, loginRequest } from 'api';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    dataUser: {},
    userInfo: {},
  },
  reducers: {
    setDataUser: (state, action) => {
      state.dataUser = action.payload;
      localStorage.removeItem('tk');
      if (action.payload.status) {
        localStorage.setItem('tk', action.payload.token);
      }
    },
    setUserinfo: (state, action) => {
      state.userInfo = action.payload;
      // localStorage.removeItem('tk');
      // if (action.payload.status) {
      //     localStorage.setItem('tk', action.payload.token);
      // }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      authSlice.caseReducers.setDataUser(state, action);
    });
    builder.addCase(getUserinfo.fulfilled, (state, action) => {
      authSlice.caseReducers.setUserinfo(state, action);
    });
  },
});

export const { setDataUser, setUserinfo } = authSlice.actions;
