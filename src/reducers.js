import { createGrid, placeShipsOnBoard } from './Game';

const initialState = {
	playerBoard: createGrid(),
	computerBoard: placeShipsOnBoard(),
	computerMoves: [],
	gameLog: [],
	placementAccepted: false,
};

function reducers(state = initialState, action) {
	switch (action.type) {
		case 'GENERATE_BOARD':
			return { ...state, playerBoard: placeShipsOnBoard() };
		case 'ACCEPT_SHIP_PLACEMENT':

			return { ...state, placementAccepted: true };
		case 'END_GAME':
			return initialState;
		default:
			return state;
	}
}

export default reducers;
