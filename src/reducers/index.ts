// import { UIReducer } from './ui/ui.reducer';

import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

// export const RegisterReducer = {
//   ui: UIReducer,
// };

// import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

// `buildCreateSlice` allows us to create a slice with async thunks.
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

// export type SliceAction<T> = { payload: T; type: string };

// export type TypeReducer<T extends keyof (typeof RegisterReducer)[keyof typeof RegisterReducer]> = {
//   [K in keyof typeof RegisterReducer]: T extends 'getInitialState'
//     ? ReturnType<(typeof RegisterReducer)[K][T]>
//     : (typeof RegisterReducer)[K][T];
// };
