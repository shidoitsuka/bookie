import { getTheme } from '@/lib/helper';

import { Color } from '@/types/colors';

const light: Color = {
  primary: { main: '#0794FE', light: '#4cacf5', dark: '#0679cf' },
  secondary: { main: '#253864', light: '#253864', dark: '#253864' },
  error: { main: '#FC5252', light: '', dark: '' },
  success: { main: '#64DE54', light: '', dark: '' },
  textWhite: { main: '#F2F2F2', light: '#FFFFFF', dark: '#E6E6E6' },
  textBlack: { main: '#262626', light: '#474747', dark: '#000000' },
  paper: { main: '#F5F5F5', light: '#FFFFFF', dark: 'E3E3E3' },
  border: { main: '#D2D2D2', light: '', dark: '#C2C2C2' },
};

const dark: Color = {
  primary: { main: '#0794FE', light: '#4cacf5', dark: '#0679cf' },
  secondary: { main: '#253864', light: '#253864', dark: '#253864' },
  error: { main: '#FC5252', light: '', dark: '' },
  success: { main: '#64DE54', light: '', dark: '' },
  textWhite: { main: '#262626', light: '#474747', dark: '#000000' },
  textBlack: { main: '#F2F2F2', light: '#FFFFFF', dark: '#E6E6E6' },
  paper: { main: '#020305', light: '#333333', dark: '#000000' },
  border: { main: '', light: '', dark: '' },
};

export const colors = getTheme() === 'dark' ? dark : light;
