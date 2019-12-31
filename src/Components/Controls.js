import React from 'react';
import { connect } from 'react-redux';

function Controls({ generateBoard, accepted, acceptPlacement, endGame }) {
	return (
		<div>
			{!accepted ? (
				<>
					<button onClick={() => generateBoard(true)}>Generate Board</button>
					<button onClick={() => acceptPlacement()}>Accept Placement</button>
				</>
			) : null}

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
