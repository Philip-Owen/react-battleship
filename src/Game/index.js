export function createGrid() {
	let grid = [];
	for (let i = 0; i < 11; i++) {
		let row = [];
		for (let j = 0; j < 11; j++) {
			row.push(0);
		}
		grid.push(row);
	}
	return grid;
}

export function placeShipsOnBoard() {
	const board = createGrid();
	placeShips(board);
	return board;
}

function placeShips(board) {
	const ships = ['Patrol Boat', 'Destroyer', 'Sub', 'Battleship', 'Carrier'];

	ships.forEach(ship => {
		const { len } = getShip(ship);
		const direction = Math.ceil(Math.random() * 6) % 2 === 0 ? 'vertical' : 'horizontal';

		let row = Math.floor(Math.random() * 11);
		let col = Math.floor(Math.random() * 11);

		var coords = checkShipFitsBoard(col, row, direction, len);

		while (!checkSpaceIsOpen(coords.col, coords.row, direction, len, board)) {
			let row = Math.floor(Math.random() * 11);
			let col = Math.floor(Math.random() * 11);
			coords = checkShipFitsBoard(col, row, direction, len);
		}

		placeShip(coords.col, coords.row, ship, direction, board);
	});
}

function checkSpaceIsOpen(colStart, rowStart, direction, len, board) {
	if (direction === 'vertical') {
		for (let i = 0; i < len; i++) {
			let row = rowStart + i;
			if (board[row][colStart]) {
				return false;
			}
		}
	} else if (direction === 'horizontal') {
		for (let i = 0; i < len; i++) {
			let col = colStart + i;
			if (board[rowStart][col]) {
				return false;
			}
		}
	}
	return true;
}

function checkShipFitsBoard(col, row, direction, len) {
	const coords = { col, row };

	if (direction === 'vertical') {
		while (coords.row + len > 11) {
			coords.row = Math.floor(Math.random() * 11);
		}
	}

	if (direction === 'horizontal') {
		while (coords.col + len > 11) {
			coords.col = Math.floor(Math.random() * 11);
		}
	}
	return coords;
}

function placeShip(colStart, rowStart, ship, direction, board) {
	const { len, char } = getShip(ship);
	// Check ship direction
	if (direction === 'vertical') {
		for (let i = 0; i < len; i++) {
			let row = rowStart + i;
			board[row][colStart] = char;
		}
	}

	if (direction === 'horizontal') {
		for (let i = 0; i < len; i++) {
			let col = colStart + i;
			board[rowStart][col] = char;
		}
	}
}

function getShip(ship) {
	switch (ship) {
		case 'Patrol Boat':
			return { len: 2, char: 'P' };
		case 'Destroyer':
			return { len: 3, char: 'D' };
		case 'Sub':
			return { len: 3, char: 'S' };
		case 'Battleship':
			return { len: 4, char: 'B' };
		case 'Carrier':
			return { len: 5, char: 'C' };
		default:
			return;
	}
}