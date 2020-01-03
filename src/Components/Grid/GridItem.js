import React from 'react';
import { connect } from 'react-redux';

function GridItem({ coords, char, playerFire, playerTurn, endPlayerTurn, computerFire, gameStarted }) {
	const clickTarget = () => {
		if (!gameStarted) {
			return;
		}

		if (char !== 0) {
			return;
		}
		if (playerTurn) {
			endPlayerTurn();
			let coordsArray = coords.split('-');
			playerFire(coordsArray.map(num => parseInt(num)));
			setTimeout(() => {
				computerFire();
			}, 1);
		}
	};
	return (
		<div
			className={`row-item guess-item ${char === 'M' ? 'miss' : null} ${char === 'H' ? 'hit' : null}`}
			onClick={clickTarget}
		>
			<span>{char === 0 ? 'o' : char}</span>
		</div>
	);
}

const mapStateToProps = state => ({
	playerTurn: state.playerTurn,
	gameEnd: state.gameEnd,
	gameStarted: state.gameStarted,
});

const mapDispatchToProps = dispatch => ({
	playerFire: coords => dispatch({ type: 'PLAYER_FIRE', payload: coords }),
	endPlayerTurn: () => dispatch({ type: 'PLAYER_TURN', payload: null }),
	computerFire: () => dispatch({ type: 'COMPUTER_FIRE', payload: null }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridItem);
