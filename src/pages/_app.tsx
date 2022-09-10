import "../styles/global.css";

import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

import initAuth from "../utils/initAuth";
import { rtlCache } from "../utils/rtl-cache";

initAuth();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    emotionCache={rtlCache}
    theme={{
      dir: "rtl",
      colorScheme: "light",
    }}
  >
    <Component {...pageProps} />
  </MantineProvider>
);

export default MyApp;
