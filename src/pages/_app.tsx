import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createEmotionSsrAdvancedApproach } from 'tss-react/next/pagesDir';

import '@/styles/globals.scss';

import StoreProvider from '@/lib/storeProvider';

import { colors } from '@/config/colors';

// import '@/styles/colors.scss';
const { augmentDocumentWithEmotionCache, withAppEmotionCache } = createEmotionSsrAdvancedApproach({
  key: 'css',
});
export { augmentDocumentWithEmotionCache };

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [globalLoading, setGlobalLoading] = useState(false);

  const toggleGlobalLoader = (loading = false) => {
    const globalLoader = document.getElementById('globalLoader') ?? undefined;
    const globalLoadingEl1 = document.getElementById('loader1') ?? undefined;
    const globalLoadingEl2 = document.getElementById('loader2') ?? undefined;
    const textEl = document.getElementById('text') ?? undefined;
    if (loading) {
      textEl?.style.setProperty('display', 'block');
      globalLoader?.style.setProperty('display', 'flex');
      globalLoadingEl1?.style.setProperty('translate', '5%');
      globalLoadingEl2?.style.setProperty('translate', '0%');
      textEl?.style.setProperty('translate', '0 0');
    } else {
      globalLoadingEl1?.style.setProperty('translate', '-650%');
      globalLoadingEl2?.style.setProperty('translate', '650%');
      textEl?.style.setProperty('translate', '0 10rem');
      setTimeout(() => {
        textEl?.style.setProperty('display', 'none');
        globalLoader?.style.setProperty('display', 'none');
      }, 2000);
    }
  };

  useEffect(() => {
    toggleGlobalLoader(globalLoading);
  }, [globalLoading]);

  return (
    <>
      {/* <NavBar
        navItems={[
          { name: 'Home', link: '/' },
          { name: 'Profile', link: '/profile' },
        ]}
      /> */}
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
          transition={{
            ease: 'easeOut',
            duration: 0.5,
          }}
        >
          <ThemeProvider
            theme={createTheme({
              palette: {
                primary: {
                  main: colors.primary.main,
                  light: colors.primary.light,
                  dark: colors.primary.dark,
                },
              },
              components: {
                MuiInputBase: {
                  styleOverrides: {
                    input: {
                      background: colors.paper.main,
                      borderRadius: '5rem',
                    },
                  },
                },
              },
            })}
          >
            <StoreProvider>
              <Component {...pageProps} />
            </StoreProvider>
          </ThemeProvider>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default withAppEmotionCache(App);
