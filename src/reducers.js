import { createGrid, placeShipsOnBoard, playerFire, shipTracker, generateComputerTurns, computerFire } from './Game';
import { updateGameBoard } from './Helpers';

const initialState = {
	playerBoard: createGrid(),
	computerBoard: placeShipsOnBoard(),
	gameBoard: createGrid(),
	computerMoves: generateComputerTurns(),
	gameLog: [],
	gameStarted: false,
	playerShips: shipTracker(),
	computerShips: shipTracker(),
	playerSunk: [],
	computerSunk: [],
	playerTurn: true,
	gameEnd: false,
	winner: '',
};

function reducers(state = initialState, action) {
	switch (action.type) {
		case 'GENERATE_BOARD':
			return { ...state, playerBoard: placeShipsOnBoard() };
		case 'PLAYER_FIRE':
			const [col, row] = action.payload;
			const turn = playerFire([col, row], state.computerBoard, state.computerShips);

			const a = {
				gameBoard: updateGameBoard(state.gameBoard, row, col, turn.shot),
				gameLog: [turn.log, ...state.gameLog],
				...(turn.ships ? { computerShips: turn.ships } : {}),
				...(turn.sunk ? { computerSunk: [...state.computerSunk, turn.sunk] } : {}),
				...(turn.gameEnd ? { gameEnd: true, winner: 'Player', playerTurn: false } : {}),
			};

			return {
				...state,
				...a,
			};
		case 'COMPUTER_FIRE':
			if (state.gameEnd) {
				return state;
			}
			const compTurn = computerFire(state.computerMoves, state.playerShips, state.playerBoard);
			return {
				...state,
				gameLog: [compTurn.log, ...state.gameLog],
				playerTurn: true,
				computerMoves: compTurn.moves,
				...(compTurn.ships ? { playerShips: compTurn.ships } : {}),
				...(compTurn.shot
					? { playerBoard: updateGameBoard(state.playerBoard, compTurn.row, compTurn.col, compTurn.shot) }
					: {}),
				...(compTurn.gameEnd ? { gameEnd: true, winner: 'Computer', playerTurn: false } : {}),
			};
		case 'ACCEPT_SHIP_PLACEMENT':
			return { ...state, gameStarted: true };
		case 'PLAYER_TURN':
			return { ...state, playerTurn: !state.playerTurn };
		case 'END_GAME':
			return {
				playerBoard: createGrid(),
				computerBoard: placeShipsOnBoard(),
				gameBoard: createGrid(),
				computerMoves: generateComputerTurns(),
				gameLog: [],
				gameStarted: false,
				playerShips: shipTracker(),
				computerShips: shipTracker(),
				playerSunk: [],
				computerSunk: [],
				playerTurn: true,
				gameEnd: false,
				winner: '',
			};
		default:
			return state;
	}
}

export default reducers;
