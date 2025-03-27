'use-client';

import { Action, combineSlices, configureStore } from '@reduxjs/toolkit';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { ThunkDispatch } from 'redux-thunk';

import RegisterReducer from '@/lib/reducers';

import { UIReducer } from '@/reducers/ui/ui.reducer';

export type SliceAction<T> = { payload: T; type: string };

export type TypeReducer<T extends keyof (typeof RegisterReducer)[keyof typeof RegisterReducer]> = {
  [K in keyof typeof RegisterReducer]: T extends 'getInitialState'
    ? ReturnType<(typeof RegisterReducer)[K][T]>
    : (typeof RegisterReducer)[K][T];
};

const reducer = combineSlices(UIReducer);

const persistedReducer = persistReducer(
  { key: 'localNextBoilterplate', version: 1, storage },
  reducer
);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
const client = new QueryClient();

const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export type RootState = TypeReducer<'getInitialState'>;
export type AppDispatch = ThunkDispatch<RootState, any, Action>;

export default StoreProvider;
