import "../styles/globals.css";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";
export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
