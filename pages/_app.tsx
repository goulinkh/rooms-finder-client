import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/date-picker.css";
import "../styles/form.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#007a66" />
        <meta
          name="description"
          content="Trouver des salles vides pour les étudiants de l'Université Paul Sabatier"
        />
        <title>Salles vides</title>
        <script defer data-domain="rooms-finder.goulin.fr" src="https://insights.api.goulin.fr/js/insights.js"></script>

      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
