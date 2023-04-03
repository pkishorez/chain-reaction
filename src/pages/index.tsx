import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Chain Reaction</title>
			</Head>
			<main>
				<h1>Hello WOrld!</h1>
			</main>
		</>
	);
}
