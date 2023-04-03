// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	"@@xstate/typegen": true;
	internalEvents: {
		"xstate.after(0)#Chain Reaction.Game.InputEntered": {
			type: "xstate.after(0)#Chain Reaction.Game.InputEntered";
		};
		"xstate.after(ANIMATION_TIMEOUT)#Chain Reaction.Game.Animating": {
			type: "xstate.after(ANIMATION_TIMEOUT)#Chain Reaction.Game.Animating";
		};
		"xstate.init": { type: "xstate.init" };
	};
	invokeSrcNameMap: {};
	missingImplementations: {
		actions: "onAnimationBlast" | "onGameOver" | "onInputEnter";
		delays: never;
		guards: never;
		services: never;
	};
	eventsCausingActions: {
		blastAnimationTicker:
			| "xstate.after(0)#Chain Reaction.Game.InputEntered"
			| "xstate.after(ANIMATION_TIMEOUT)#Chain Reaction.Game.Animating";
		checkIfGameOver:
			| "ANIMATION_DONE"
			| "xstate.after(ANIMATION_TIMEOUT)#Chain Reaction.Game.Animating";
		exitAnimationIfQueueEmpty:
			| "xstate.after(0)#Chain Reaction.Game.InputEntered"
			| "xstate.after(ANIMATION_TIMEOUT)#Chain Reaction.Game.Animating";
		onAnimationBlast:
			| "xstate.after(0)#Chain Reaction.Game.InputEntered"
			| "xstate.after(ANIMATION_TIMEOUT)#Chain Reaction.Game.Animating";
		onGameOver: "PLAYER_WON";
		onInputEnter: "INPUT_ENTERED";
		resetGame: "CLOSE";
		setNextPlayer: "ANIMATION_DONE";
		setPlayerStatusPlaying: "INPUT_ENTERED";
		setupAnimationQueue: "INPUT_ENTERED";
	};
	eventsCausingDelays: {
		ANIMATION_TIMEOUT:
			| "xstate.after(0)#Chain Reaction.Game.InputEntered"
			| "xstate.after(ANIMATION_TIMEOUT)#Chain Reaction.Game.Animating";
	};
	eventsCausingGuards: {
		isValidInput: "INPUT_ENTERED";
	};
	eventsCausingServices: {};
	matchesStates:
		| "Game"
		| "Game.Animating"
		| "Game.GameOver"
		| "Game.InputEntered"
		| "Game.WaitingForInput"
		| "Initial"
		| "SelectingPlayers"
		| {
				Game?:
					| "Animating"
					| "GameOver"
					| "InputEntered"
					| "WaitingForInput";
		  };
	tags: never;
}
