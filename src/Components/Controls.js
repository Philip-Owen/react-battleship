import React from 'react';
import { connect } from 'react-redux';

function Controls({ generateBoard, accepted, acceptPlacement, endGame, gameEnd, winner }) {
	return (
		<div>
			{!accepted ? (
				<>
					<button onClick={() => generateBoard(true)}>Generate Board</button>
					<button onClick={() => acceptPlacement()}>Accept Placement</button>
				</>
			) : null}
			{gameEnd ? <h2>Game Over! {winner} Wins!</h2> : null}
			{accepted ? <button onClick={() => endGame()}>End Game</button> : ''}
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	generateBoard: task => dispatch({ type: 'GENERATE_BOARD', payload: task }),
	acceptPlacement: () => dispatch({ type: 'ACCEPT_SHIP_PLACEMENT', playload: null }),
	endGame: () => dispatch({ type: 'END_GAME', playload: null }),
});

const mapStateToProps = state => ({
	accepted: state.placementAccepted,
	gameEnd: state.gameEnd,
	winner: state.winner,
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
