import clsx from "clsx";
import { useState } from "react";
import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import type { Player } from "./chain-reaction/machine";

const colors = ["#800180", "#c65915", "#d61323", "#05676b", "#2d2d2d"];
export const SelectPlayers = ({
	onDone,
	onClose,
}: {
	onDone: (players: Player[], grid: { rows: number; cols: number }) => void;
	onClose?: () => void;
}) => {
	const [dims, setValue] = useState(5);
	const [players, setPlayers] = useState<string[]>(["Player1", "Player2"]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onDone(
			players.map((player, i) => ({ name: player, color: colors[i] })),
			{ rows: dims, cols: dims }
		);
	};

	return (
		<Modal className="max-w-screen-mobile" closeButton onClose={onClose}>
			<form onSubmit={onSubmit} className={clsx("relative")}>
				<div className="flex flex-col gap-5">
					<h2>Select Players</h2>
					<div className="flex gap-2 items-center">
						<input
							className="p-2 bg-base1 flex-grow"
							type="number"
							value={dims}
							min={5}
							max={20}
							onChange={(e) => setValue(Number(e.target.value))}
							placeholder="Rows"
						/>
						<span className="i-carbon-close text-lg scale-150 shrink-0" />
						<input
							className="p-2 bg-base1 flex-grow"
							type="number"
							min={5}
							max={20}
							onChange={(e) => setValue(Number(e.target.value))}
							value={dims}
							placeholder="Cols"
						/>
					</div>
					{players.map((player, i) => (
						<label key={i} className="flex items-center gap-2">
							<span
								className="w-8 h-8 shrink-0"
								style={{ backgroundColor: colors[i] }}
							/>
							<input
								type="text"
								autoFocus
								value={player}
								onChange={(e) =>
									setPlayers((players) => {
										const newPlayers = [...players];
										newPlayers[i] = e.target.value;
										return newPlayers;
									})
								}
								className={clsx(
									"flex-grow shrink w-0",
									"p-2 bg-base1 border border-transparent focus:border-base-invert outline-none"
								)}
							/>
							{players.length > 2 && (
								<Button
									type="button"
									onClick={() =>
										setPlayers((players) =>
											players.filter((_, j) => j !== i)
										)
									}
								>
									<span className="i-carbon-trash-can" />
								</Button>
							)}
						</label>
					))}
					{players.length < 5 && (
						<Button
							type="button"
							onClick={() => setPlayers([...players, ""])}
						>
							+ Add
						</Button>
					)}
					<Button type="submit">Done</Button>
				</div>
			</form>
		</Modal>
	);
};
