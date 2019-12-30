import { createGrid, placeShipsOnBoard } from './Game';

const initialState = {
	playerBoard: createGrid(),
	computerBoard: placeShipsOnBoard(),
	computerMoves: [],
	gameLog: [],
};

function reducers(state = initialState, action) {
	switch (action.type) {
		case 'GENERATE_BOARD':
			return { ...state, playerBoard: placeShipsOnBoard() };
		default:
			return state;
	}
}

export default reducers;
