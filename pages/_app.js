import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";

function App({ Component, pageProps: { session, ...pageProps } }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon_io/favicon-32x32.png" />
            <link rel="apple-touch-icon" href="/favicon_io/favicon-16x16.png" />
            <link rel="manifest" href="/favicon_io/site.webmanifest" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default App;
