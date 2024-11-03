'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';
import { loginSuccess } from '../lib/slices/authSlice';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    // Initialize the store with the token from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        storeRef.current.dispatch(loginSuccess(token));
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
