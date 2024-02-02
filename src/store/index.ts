import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slice/auth';
import { constantSlice } from './slice/constant';
import { ieltsSlice } from './slice/ielts';
import { questionSlice } from './slice/question';
import { testSlice } from './slice/test';
import { tsaSlice } from './slice/tsa';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    constant: constantSlice.reducer,
    question: questionSlice.reducer,
    test: testSlice.reducer,
    tsa: tsaSlice.reducer,
    ielts: ieltsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;
export type RootStore = ReturnType<typeof store.getState>;
