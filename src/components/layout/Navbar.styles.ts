import { makeStyles } from '@/lib/helper';

import { colors } from '@/config/colors';

export default makeStyles({
  active: {
    background: colors.primary.main,
    borderRadius: 1000,
    fontWeight: 600,
    padding: '4px 14px',
    '& > span': {
      color: colors.textWhite.main,
    },
  },
  nonAcitve: {
    padding: 8,
  },
});
