import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setLocalStorage } from '@/lib/helper';

import UIState from '@/reducers/ui/ui.state';

export const UIReducer = createSlice({
  name: 'ui',
  initialState: UIState,
  reducers: (create) => ({
    setTheme: create.reducer((state, action: PayloadAction<'light' | 'dark'>) => {
      setLocalStorage('theme', action.payload);
      state.theme = action.payload;
    }),
    showErrorAlert: create.reducer((state, action: PayloadAction<string | string[]>) => {
      state.errorLists = Array.isArray(action.payload) ? action.payload : [action.payload];
    }),
  }),
});

export const { setTheme, showErrorAlert } = UIReducer.actions;
