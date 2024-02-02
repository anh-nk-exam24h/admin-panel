import { createSlice } from '@reduxjs/toolkit';
import { getConfigWithRole, getConstant } from 'api';
import { constantDefault } from 'constant';

type configFormType = {
  properties: Array<
    Partial<{
      name: string;
      type: string | undefined;
      inputType: string;
      scope: string;
      isAutoComputed: boolean;
      computeFormula: any;
    }>
  >;
  propertyConfig: {
    disable: Array<string>;
  };
};
const configFormDefault: configFormType = {
  properties: [],
  propertyConfig: {
    disable: [],
  },
};

export const constantSlice = createSlice({
  name: 'constant',
  initialState: {
    constant: constantDefault,
    configForm: configFormDefault,
  },
  reducers: {
    setConstant: (state, action) => {
      if (action?.payload?.baikiemtra) {
        state.constant = action.payload;
      } else {
        state.constant = constantDefault;
      }
    },
    setConfigForm: (state, action) => {
      state.configForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConstant.fulfilled, (state, action) => {
      constantSlice.caseReducers.setConstant(state, action);
    });
    builder.addCase(getConfigWithRole.fulfilled, (state, action) => {
      constantSlice.caseReducers.setConfigForm(state, action);
    });
    // call API sau khi dispatch, ket qua cua API tra ve se duoc dua vao action
  },
});
