import * as React from 'react';

import Footer from '@/components/layout/Footer';

import useStyle from '@/styles/index.styles';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { classes } = useStyle();
  return (
    <div className={`appContainer ${classes.mainContainer}`}>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
