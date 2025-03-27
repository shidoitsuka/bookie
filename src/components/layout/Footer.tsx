import * as React from 'react';

import useStyles from './Footer.styles';

const Footer: React.FC = () => {
  const { classes } = useStyles();
  return (
    <footer className={`${classes.footerContainer} shadow-inner`}>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
