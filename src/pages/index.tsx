import { Logo } from "@/components/logo";
import { ChainReaction } from "@/components/work.chain-reaction/chain-reaction";
import { MARGIN } from "@/constants";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Chain Reaction</title>
				<meta name="description" content="Chain Reaction Game." />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preload" href="/fonts/style.css" as="style" />
			</Head>
			<main
				className="my-10"
				style={{ marginLeft: MARGIN, marginBottom: MARGIN }}
			>
				<div className="max-w-screen-max mx-auto">
					<h1 className="font-bold flex items-center gap-2">
						<Logo className="w-10 h-10" />
						<span>Chain Reaction</span>
					</h1>
					<hr className="my-10" />
					<ChainReaction />
				</div>
			</main>
		</>
	);
}
