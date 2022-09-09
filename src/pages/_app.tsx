import "../styles/global.css";

import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MantineProvider theme={{}}>
    <Component {...pageProps} />
  </MantineProvider>
);

export default MyApp;
