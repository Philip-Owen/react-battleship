export function updateGameBoard(board, guessRow, guessCol, target) {
	return board.map((row, i) => {
		if (i !== guessRow) {
			return row;
		}
		return row.map((col, j) => {
			if (j !== guessCol) {
				return col;
			}
			return target;
		});
	});
}
