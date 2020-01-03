export function createGrid() {
	let grid = [];
	for (let i = 0; i < 10; i++) {
		let row = [];
		for (let j = 0; j < 10; j++) {
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

		let row = Math.floor(Math.random() * 10);
		let col = Math.floor(Math.random() * 10);

		var coords = checkShipFitsBoard(col, row, direction, len);

		while (!checkSpaceIsOpen(coords.col, coords.row, direction, len, board)) {
			let row = Math.floor(Math.random() * 10);
			let col = Math.floor(Math.random() * 10);
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
		while (coords.row + len > 10) {
			coords.row = Math.floor(Math.random() * 10);
		}
	}

	if (direction === 'horizontal') {
		while (coords.col + len > 10) {
			coords.col = Math.floor(Math.random() * 10);
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

export function playerFire([col, row], board, ships) {
	let turn = {};
	if (board[row][col] === 0) {
		turn.shot = 'M';
		turn.log = createLog('Player', [col, row], 'Miss', null);
	} else {
		let ship = null;
		let sunk = ships.sunk;
		turn.shot = 'H';
		ships[board[row][col]].hits++;
		const { name, len, hits } = ships[board[row][col]];
		if (hits >= len) {
			ship = name;
			sunk = [...ships.sunk, name];
		}
		turn = {
			shot: 'H',
			ships: { ...ships, sunk: sunk },
			log: createLog('Player', [col, row], 'Hit', ship),
			...(sunk.length === 5 ? { gameEnd: true, winner: 'Player' } : {}),
		};
	}
	return turn;
}

export function shipTracker() {
	return {
		P: {
			name: 'Patrol Boat',
			len: 2,
			hits: 0,
		},
		D: {
			name: 'Destroyer',
			len: 3,
			hits: 0,
		},
		S: {
			name: 'Submarine',
			len: 3,
			hits: 0,
		},
		B: {
			name: 'Battleship',
			len: 4,
			hits: 0,
		},
		C: {
			name: 'Carrier',
			len: 5,
			hits: 0,
		},
		sunk: [],
	};
}

function createLog(player, [col, row], turn, ship) {
	return {
		player: player,
		col: convertColCharacter(col),
		row: row + 1,
		turn: turn,
		...(ship ? { ship: ship } : {}),
	};
}

function convertColCharacter(col) {
	const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K'];
	return cols[col];
}

export function generateComputerTurns() {
	const grid = createGrid();
	const moves = [];
	grid.map((row, i) => row.map((col, j) => moves.push(`${j}-${i}`)));
	return moves;
}

export function computerFire(moves, ships, board) {
	const randomPosition = Math.floor(Math.random() * moves.length);
	const coords = moves[randomPosition].split('-');
	const col = parseInt(coords[0]);
	const row = parseInt(coords[1]);

	let turn = {};

	if (board[row][col] === 0) {
		turn.log = createLog('Computer', [col, row], 'Miss', null);
	} else {
		let ship = null;
		let sunk = ships.sunk;
		turn.shot = 'H';
		ships[board[row][col]].hits++;
		const { name, len, hits } = ships[board[row][col]];
		if (hits >= len) {
			ship = name;
			sunk = [...ships.sunk, name];
		}
		turn = {
			shot: 'H',
			ships: { ...ships, sunk: sunk },
			log: createLog('Computer', [col, row], 'Hit', ship),
			col: col,
			row: row,
			...(sunk.length === 5 ? { gameEnd: true } : {}),
		};
	}
	turn.moves = moves.filter((move, i) => i !== randomPosition);
	return turn;
}
