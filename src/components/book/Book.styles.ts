import { hexOpacity, makeStyles } from '@/lib/helper';

import { colors } from '@/config/colors';

export default makeStyles({
  cardContainer: {
    background: colors.paper.main,
    minHeight: '26rem',
  },
  listContainer: {
    background: colors.paper.main,
    display: 'flex',
    gap: 24,
  },
  listDetailContainer: {
    background: colors.secondary.main,
  },
  categoryContainer: {
    fontSize: 14,
  },
  uncategorized: {
    fontSize: 14,
    background: hexOpacity(colors.border.main, 0.5, true),
  },
});
