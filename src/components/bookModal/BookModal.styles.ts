import { hexOpacity, makeStyles } from '@/lib/helper';

import { colors } from '@/config/colors';

export default makeStyles({
  categoryContainer: {
    fontSize: 14,
  },
  uncategorized: {
    fontSize: 14,
    background: hexOpacity(colors.border.main, 0.5, true),
  },
});
