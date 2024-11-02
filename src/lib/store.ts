// src/lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import trainingSlice from './slices/trainingSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      training: trainingSlice,
    },
    devTools: true,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
