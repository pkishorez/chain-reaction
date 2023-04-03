import { assign } from "@xstate/immer";
import { range } from "lodash-es";
import invariant from "tiny-invariant";
import { actions, createMachine, raise } from "xstate";
import { choose } from "xstate/lib/actions";
import { getBurstCount, getGridNeighbours } from "./grid-utils";

let uniqId = 0;

export interface Player {
	name: string;
	color: string;
}

const defaultValue = {
	grid: { rows: 5, cols: 5 },
	players: [],
	blastQueue: [],
	currentPlayerIndex: 0,
	game: {},
};

export const machine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QGEAWBDAlgOwAQCUx0BjAF0wHtsBiZAGQHkBlAUQG0AGAXUVAAcKsTOSq8QAD0QBaAEwcArADoZATnkAWAIwyAbOoAcAZnV6ANCACe0zR3WKA7PvUcdmwzPsr3++wF9f5mhYeIQkItiKTGAANmBkOFAACtHoFmAATrDUiXQAggCaLPhMAPqsdCzIACosACKcPEggAkLhYpIImvZK+jry9gOGQ-I+veZWnSqaDlM6MuryhioqvToq-oEYOARE8VSKAOLoALZg2XmF+CUA6gwAcg1iLcKU2O2I8nKKi-peJkPqAz6caIbQ6ByfBZzfT6TRdDiGDYgILbUJ7CJHU7UfAsJhVXL4KqPJrPNpNDpSTT6RQcOHqNTqJb2KmaFQ6EEIYzTDgcFS6XlTFZIlEhXbhQ4nMCKa5YcjYKAAMQo6QAktg+ABXUjUFV3RIAVSqJRYdxqOPq3CegheonJiBW02c810ehkGjGllB80UK1UvL0ahkSx0wq2orCrwlp0Uas1pBY2FIGUg1HEsFI6CTinQADMk+kABQcACUtDDOwj+0xUtjWoT+cgxP41rJoA6mjWHEUsNZhl52kMRkMHJhinpcnkOiWHm0GlDwQr6KjUty2Ewx0zCWouTuKoAsrkqir7iVavd2JaSS3Xu8EPY5ooOz5DJ9VDop-IOfJNHYdBx7O4Ki2PYbrzPOqJipG1aKKu66bvKqbppmUq5vmBY7vuh7HncJRHnuLAMIapYiou4rQbBG5ylATbNNetptl6hj2D6GhDGosIIoCHI6PoShOoOTFaPMAzgeGS5qi86DRNQeIEkaBy5PhNGkjedoIFIQyKFOPIKD+9jqPYPJ9ByUzKFO74uB2NhzJo-gBCA2AUBAcBiCRaKtrRrSqQx6luoYygMmCBjGGYnrqayMhme4XS9sJeiiaRkZRLE8TyskqQZPAV5efREjSAYWlDEYFk+LyIwcjIP7fI4vK-EGbKOOoCXuVBkpWjlbxqQZkU-H8U7GECHLctovFwvobocDIMiwjIzWQVWkrSrKCRKqq6pau1NqdT5Ax2CYthuPpajyOVYXaHYbIrJ4LrdF4s32W580YottbxomyYQJtHntu4SjyEBIxrFSzr2CO1LjgoU58sybpNQ95YtQt0YUfBUBfd5eWdIYNjfE4LjLCozJUuyYXfnYU3YyBvyMkY6zwwuiPPdG1YMAAbhk6O5R0iwXbxk68pZLgVYCNLdDxBhyBO-RzZWEQSeQUmc9tmOUt2LqTd+2M2EGmgchpdjYwifRaCM00wnZvhAA */
		id: "Chain Reaction",
		context: defaultValue,
		initial: "Initial",
		tsTypes: {} as import("./machine.typegen").Typegen0,

		on: {
			CLOSE: { target: "Initial", actions: "resetGame" },
		},

		states: {
			SelectingPlayers: {
				on: {
					PLAYERS_SELECTED: {
						target: "Game",
						actions: assign((ctx, event) => {
							ctx.players = event.players.map((v) => ({
								...v,
								startedPlaying: false,
							}));
							const { rows, cols } = event.grid;
							ctx.grid = { rows, cols };
							ctx.game = range(rows * cols).reduce(
								(acc, posId) => {
									acc[posId] = {
										dots: [],
										playerIndex: undefined,
									};
									return acc;
								},
								{} as typeof ctx.game
							);
						}),
					},
				},
			},

			Game: {
				initial: "WaitingForInput",
				states: {
					WaitingForInput: {
						on: {
							INPUT_ENTERED: {
								target: "InputEntered",
								cond: "isValidInput",
							},
						},
					},

					InputEntered: {
						entry: [
							"onInputEnter",
							"setPlayerStatusPlaying",
							"setupAnimationQueue",
						],
						after: {
							0: "Animating",
						},
					},

					Animating: {
						on: {
							ANIMATION_DONE: [
								{
									target: "WaitingForInput",
									actions: [
										"setNextPlayer",
										"checkIfGameOver",
									],
								},
							],
						},

						entry: [
							"onAnimationBlast",
							"blastAnimationTicker",
							"exitAnimationIfQueueEmpty",
						],

						after: {
							ANIMATION_TIMEOUT: {
								target: "Animating",
								actions: [
									"onAnimationBlast",
									"blastAnimationTicker",
									"exitAnimationIfQueueEmpty",
									"checkIfGameOver",
								],
							},
						},
					},

					GameOver: {},
				},
				on: {
					PLAYER_WON: {
						target: ".GameOver",
						actions: [
							"onGameOver",
							assign((ctx, event) => {
								ctx.gameOver = {
									playerIndex: event.playerIndex,
								};
							}),
						],
					},

					RESTART: {
						target: "SelectingPlayers",
						actions: assign(() => defaultValue),
					},
				},
			},

			Initial: {
				on: {
					START_GAME: "SelectingPlayers",
				},
			},
		},

		schema: {
			context: {} as {
				grid: { rows: number; cols: number };
				currentPlayerIndex: number;
				game: {
					[posId: number]:
						| {
								playerIndex: number | undefined;
								dots: { id: number; isNew: boolean }[];
						  }
						| undefined;
				};
				gameOver?: { playerIndex: number };
				players: (Player & { startedPlaying: boolean })[];
				blastQueue: { posId: number }[];
			},
			events: {} as
				| { type: "START_GAME" }
				| {
						type: "PLAYERS_SELECTED";
						players: Player[];
						grid: { rows: number; cols: number };
				  }
				| { type: "PLAYER_WON"; playerIndex: number }
				| { type: "RESTART" }
				| { type: "INPUT_ENTERED"; posId: number }
				| { type: "TICK" }
				| { type: "ANIMATION_DONE" }
				| { type: "CLOSE" },
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
	},
	{
		guards: {
			isValidInput: (ctx, event) => {
				const currentPlayerIndex = ctx.currentPlayerIndex;
				const currentBlock = ctx.game[event.posId];

				if (!currentBlock) return true;
				const currentBlockPlayer = currentBlock.playerIndex;

				if (!Number.isInteger(currentBlockPlayer)) return true;

				return currentBlockPlayer === currentPlayerIndex;
			},
		},
		delays: {
			ANIMATION_TIMEOUT: 400,
		},
		actions: {
			resetGame: assign(() => defaultValue),
			setPlayerStatusPlaying: assign((ctx) => {
				ctx.players[ctx.currentPlayerIndex].startedPlaying = true;
			}),
			setupAnimationQueue: assign((ctx, event) => {
				const currentBlock = ctx.game[event.posId];
				const newDotId = ++uniqId;
				const newBlock = {
					...currentBlock,
					playerIndex: ctx.currentPlayerIndex,
					dots: [
						...(currentBlock?.dots ?? []),
						{ id: newDotId, isNew: true },
					],
				};

				ctx.game[event.posId] = newBlock;
				ctx.blastQueue = [{ posId: event.posId }];
			}),

			blastAnimationTicker: assign((ctx) => {
				let queue: {
					posId: number;
				}[] = [];

				for (let entry of ctx.blastQueue) {
					const { posId } = entry;
					const blockUnderTest = ctx.game[posId];

					if (!blockUnderTest) continue;

					if (
						blockUnderTest.dots.length >=
						getBurstCount(ctx.grid, posId)
					) {
						blockUnderTest.playerIndex = undefined;

						getGridNeighbours(ctx.grid, posId).forEach(
							({ posId: neighbourPosId }) => {
								const animatedDot = blockUnderTest.dots.shift();
								invariant(
									typeof animatedDot !== "undefined",
									"Dot should exist"
								);

								const existingNeighbourDots =
									ctx.game[neighbourPosId]?.dots ?? [];

								ctx.game[neighbourPosId] = {
									dots: [
										...existingNeighbourDots,
										{ ...animatedDot, isNew: false },
									],
									playerIndex: ctx.currentPlayerIndex,
								};
								queue.push({ posId: neighbourPosId });
							}
						);
					}
				}

				ctx.blastQueue = queue;
			}),
			exitAnimationIfQueueEmpty: choose([
				{
					cond: (ctx) => ctx.blastQueue.length === 0,
					actions: raise({ type: "ANIMATION_DONE" }),
				},
			]),

			setNextPlayer: assign((ctx) => {
				const isGameOver = (playerIndex: number) => {
					if (!ctx.players[playerIndex].startedPlaying) {
						return false;
					}

					return !new Set(
						Object.values(ctx.game).map((v) => v?.playerIndex)
					).has(playerIndex);
				};

				for (let i = 1; i < ctx.players.length; i++) {
					let nextPlayer =
						(ctx.currentPlayerIndex + i) % ctx.players.length;
					if (!isGameOver(nextPlayer)) {
						ctx.currentPlayerIndex = nextPlayer;
						return;
					}
				}
			}),

			checkIfGameOver: actions.pure((ctx) => {
				// Check if atleast one player did not play yet.
				const allPlayersPlayed = ctx.players.every(
					(player) => player.startedPlaying
				);
				if (!allPlayersPlayed) {
					return;
				}

				// Check if there is only one player left.
				const currentValidPlayers = new Set(
					Object.values(ctx.game)
						.map((player) => player?.playerIndex)
						.filter(
							(playerIndex): playerIndex is number =>
								playerIndex !== undefined
						)
				);
				if (currentValidPlayers.size === 1) {
					return raise({
						type: "PLAYER_WON",
						playerIndex: currentValidPlayers.values().next().value,
					});
				}
			}),
		},
	}
);
