import "@/styles/globals.css";
import { getPath } from "@/utils";
import type { AppProps } from "next/app";
import Head from "next/head";

const description =
  "The Chain Reaction game is built as a Progressive Web App (PWA) which means it can be installed on a user's device just like a native app. This also allows it to work offline and provide an app-like experience.";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="application-name" content="Chain Reaction Game" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Chain Reaction Game" />
        <meta name="description" content={description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="white" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta
          name="theme-color"
          content="#fafafa"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#242424"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" href={getPath("/logo/icon_x192.png")} />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href={getPath("/logo/icon_x48.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href={getPath("/logo/icon_x128.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={getPath("/logo/icon_x192.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href={getPath("/logo/icon_x512.png")}
        />
        <link rel="manifest" href={getPath("/site.webmanifest")} />
        <link
          rel="mask-icon"
          href={getPath("/icons/safari-pinned-tab.svg")}
          color="white"
        />
        <link rel="Favicon" href={getPath("/favicon.ico")} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
