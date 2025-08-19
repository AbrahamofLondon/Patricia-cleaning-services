// pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // NOTE: not async; no fetch/await here
  return (
    <>
      <Head>
        <title>Patricia Cleaning – On-Demand Housekeeping (Min 4h)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="On-demand housekeeping. Minimum 4 hours at a fixed hourly rate. Book online—no contracts."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
