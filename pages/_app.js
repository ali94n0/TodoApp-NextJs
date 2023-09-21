import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
