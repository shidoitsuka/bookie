import { getTheme } from '@/lib/helper';

const UIState = {
  theme: getTheme(),
  errorLists: [] as string[],
};

export default UIState;
