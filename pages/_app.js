import AppProvider from "../AppProvider";
import { Layout } from "../components";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
