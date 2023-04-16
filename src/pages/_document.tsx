import { useThemeStore } from "@/components/use-theme";
import clsx from "clsx";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={clsx("bg-base text-base font-poppins")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
