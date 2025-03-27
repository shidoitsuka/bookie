import { makeStyles } from '@/lib/helper';

import { colors } from '@/config/colors';

export default makeStyles({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    backgroundImage: 'url(/images/bg-paper.png)',
    color: colors.textBlack.main,
  },
  inputAdornment: {
    background: colors.primary.main,
    cursor: 'pointer',
    borderRadius: '5rem',
    transition: 'all .3s',
    '&:hover': {
      background: colors.primary.light,
    },
    '&.disabled': {
      background: colors.border.main,
      cursor: 'default',
    },
  },
  searchIcon: {
    color: colors.textWhite.main,
    marginLeft: 8,
  },
  viewBtn: {
    '&:hover': {
      background: colors.primary.light,
      color: colors.textWhite.main,
    },
  },
  activeView: {
    background: colors.primary.main,
    color: colors.textWhite.main,
  },
});
