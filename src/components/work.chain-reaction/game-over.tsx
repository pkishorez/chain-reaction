import Confetti from "react-confetti";
import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { Portal } from "@/components/portal";
import { useWindowSize } from "@/components/useWindowSize";
import type { Player } from "./chain-reaction/machine";

export const GameOver = ({
	player,
	onClose,
}: {
	player: Player;
	onClose?: () => void;
}) => {
	const { width, height } = useWindowSize();

	return (
		<>
			<Modal
				onClose={onClose}
				className="bg-opacity-0 max-w-screen-mobile"
			>
				<h1 className="text-center flex flex-col gap-3">
					<span className="font-bold p-2 text-[1.5em] backdrop-blur-xl bg-base bg-opacity-50 rounded-md">
						{player.name}
					</span>
					<span>won!</span>
				</h1>
				<Button
					className="mx-auto flex justify-center gap-2 items-center mt-5"
					onClick={onClose}
				>
					<span className="carbon-restart" />
					Restart
				</Button>
			</Modal>
			<Portal>
				<Confetti
					recycle={false}
					width={width}
					height={height}
					style={{ zIndex: 1000 }}
				/>
			</Portal>
		</>
	);
};
