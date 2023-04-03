import { useMachine } from "@xstate/react";
import clsx from "clsx";
import { Howl } from "howler";
import { range } from "lodash-es";
import { Button } from "@/components/button";

import { Block } from "./block";
import { machine } from "./chain-reaction/machine";
import { GameOver } from "./game-over";
import { SelectPlayers } from "./select-players";

const sound = new Howl({
	src: ["/music/pop.m4a"],
});
const success = new Howl({
	src: ["/music/success.mp3"],
});

export const ChainReaction = () => {
	const [state, send] = useMachine(machine, {
		context: {
			grid: { rows: 5, cols: 5 },
			blastQueue: [],
			currentPlayerIndex: 0,
			players: [
				{ name: "Player1", color: "#2d2d2d", startedPlaying: false },
				{ name: "Player2", color: "violet", startedPlaying: false },
			],
		},
		actions: {
			onInputEnter() {
				if (navigator.vibrate) {
					navigator.vibrate(100);
				}
			},
			onAnimationBlast(context) {
				if (context.blastQueue.length) {
					sound.play();
				}
			},
			onGameOver() {
				success.play();
				if (navigator.vibrate) {
					navigator.vibrate(500);
				}
			},
		},
		devTools: true,
	});

	const gridSize = "min(calc(min(100vw, 100vh) - 40px), 460px)";
	const dotSize = `min(calc(${gridSize} / ${state.context.grid.cols} / 2 - 10px), 30px)`;

	return (
		<div className="flex flex-col gap-2">
			{state.matches("Initial") && (
				<GameRules onStart={() => send({ type: "START_GAME" })} />
			)}

			{state.matches("Game") && (
				<>
					<div className="flex gap-x-5 gap-y-2 flex-wrap mt-5">
						{state.context.players.map((player, i) => (
							<div
								key={player.color}
								className={clsx(
									"flex items-center gap-2",
									"transition-opacity duration-300",
									{
										"opacity-30":
											state.context.currentPlayerIndex !==
											i,
									}
								)}
							>
								<span
									className="w-5 h-5"
									style={{ backgroundColor: player.color }}
								/>
								{player.name}
							</div>
						))}
					</div>
					<div
						className={clsx(
							"grid gap-1 mx-auto text-[100%] z-base"
						)}
						style={{
							width: gridSize,
							height: gridSize,
							gridTemplate: `repeat(${state.context.grid.rows}, minmax(0, 1fr))/repeat(${state.context.grid.cols}, minmax(0, 1fr))`,
						}}
					>
						{range(
							state.context.grid.rows * state.context.grid.cols
						).map((posId) => (
							<Block
								dotWidth={dotSize}
								key={posId}
								className={clsx({
									"cursor-pointer": state.can({
										type: "INPUT_ENTERED",
										posId,
									}),
								})}
								dots={state.context.game[posId]?.dots ?? []}
								color={
									state.context.players[
										state.context.game[posId]
											?.playerIndex ?? 0
									]?.color
								}
								onClick={() => {
									send({
										type: "INPUT_ENTERED",
										posId: posId as number,
									});
								}}
							/>
						))}
					</div>
				</>
			)}

			{state.matches("SelectingPlayers") && (
				<SelectPlayers
					onDone={(players, grid) =>
						send({ type: "PLAYERS_SELECTED", players, grid })
					}
					onClose={() => send({ type: "CLOSE" })}
				/>
			)}
			{state.matches("Game.GameOver") && (
				<GameOver
					player={
						state.context.players[
							state.context.gameOver?.playerIndex ?? 0
						] ?? {}
					}
					onClose={() => send({ type: "CLOSE" })}
				/>
			)}
		</div>
	);
};
function GameRules({ onStart }: { onStart: () => void }) {
	return (
		<div className="mx-auto prose-theme">
			<h2 className="mt-0">Game Rules</h2>
			<p>
				Here are the rules of playing the chain reaction game:
				(Generated by ChatGPT)
			</p>
			<ul>
				<li>
					Each player takes turns placing an atom in one of their
					circles.
				</li>
				<li>
					When an atom is placed, it will activate and shoot out a
					certain number of electrons to neighboring circles.
				</li>
				<li>
					If a neighboring circle has enough electrons to activate its
					own atom, it will do so and shoot out more electrons.{" "}
				</li>
				<li>
					The game continues until all atoms have been activated.{" "}
				</li>
				<li>
					The player with the most atoms remaining at the end of the
					game wins.
				</li>
			</ul>
			<Button className="flex items-center gap-x-2" onClick={onStart}>
				<span className="i-carbon-chart-relationship text-h2" />
				Start Game!
			</Button>
		</div>
	);
}
