import { Logo } from "@/components/logo";
import { Theme } from "@/components/theme";
import { useThemeStore } from "@/components/use-theme";
import { ChainReaction } from "@/components/work.chain-reaction/chain-reaction";
import { MARGIN } from "@/constants";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  const { theme } = useThemeStore();
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <Head>
        <title>Chain Reaction</title>
        <meta name="description" content="Chain Reaction Game." />
      </Head>
      <main
        className="my-10"
        style={{ marginLeft: MARGIN, marginRight: MARGIN }}
      >
        <div className="max-w-screen-max mx-auto">
          <h1 className="font-bold flex items-center gap-2">
            <Logo className="w-10 h-10 shrink-0" />
            <span className="whitespace-nowrap flex-grow">Chain Reaction</span>
            <Theme />
          </h1>
          <hr className="my-10" />
          <ChainReaction />
        </div>
      </main>
    </>
  );
}
