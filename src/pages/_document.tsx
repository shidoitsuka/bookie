import { Head, Html, Main, NextScript } from 'next/document';

import { augmentDocumentWithEmotionCache } from '@/pages/_app';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roboto-VariableFont.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-datepicker@8.2.1/dist/react-datepicker.min.css"
        />
      </Head>
      <style>
        {`
@keyframes ping {
  0% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.65;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.65;
  }
  100% {
    opacity: 0.3;
  }
}
#text {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 9999;
  padding: 2rem;
  color: white;
  font-size: 3rem;
  font-weight: 700;
  user-select: none;
  animation: ping 1s ease-in infinite;
  transition: .5s ease-out;
}
body {
  display: block;
}
#globalLoader{
  position: fixed;
  z-index: 1700;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: end;
  align-items: end;
}
#loader1, #loader2 {
  width: 50%;
  height: 100%;
  transform: rotate(45deg) scale(3);
  background: #253864;
  transition: 5s ease-out;
  filter: brightness(80%);
}
#loader1 {
  transform-origin: right center;
  translate: 0 5%;
}
#loader2 {
  transform-origin: left center;
}
`}
      </style>
      <body>
        <div id="globalLoader">
          <div id="text">Bookie</div>
          <div id="loader1"></div>
          <div id="loader2"></div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

augmentDocumentWithEmotionCache(Document);

export default Document;
