import React from 'react';
import { connect } from 'react-redux';

function Controls({ generateBoard, startGame, acceptPlacement, endGame, gameEnd, winner, notes, hideNotes }) {
	return (
		<div className="game-controls">
			{!startGame ? (
				<>
					<button onClick={() => generateBoard(true)}>Generate Board</button>
					<button onClick={() => acceptPlacement()}>Start Game</button>
				</>
			) : null}
			<button onClick={() => hideNotes()}>{notes ? 'Hide Notes' : 'Show Notes'}</button>
			{gameEnd ? <h2>Game Over! {winner} Wins!</h2> : null}
			{startGame ? <button onClick={() => endGame()}>End Game</button> : ''}
			{notes ? (
				<p className="notes">
					As of right now you can only place your ships on the board programatically. Clicking the{' '}
					<code>Generate Board</code> button will place the ships on the board in a random configuration. Keep
					pressing the <code>Generate Board</code> until you have a placement that is acceptable, then press
					the <code>Start Game</code> button. When ready to fire, select a tile on the right hand board and
					click. The game log towards the bottom left keeps track of the last 10 moves by the player and
					computer. The sunk ships column tracks which ships have been sunk. The game will continue until
					either use sinks 5 ships or the <code>End Game</code> button is selected.
				</p>
			) : null}
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	generateBoard: task => dispatch({ type: 'GENERATE_BOARD', payload: task }),
	acceptPlacement: () => dispatch({ type: 'ACCEPT_SHIP_PLACEMENT', playload: null }),
	endGame: () => dispatch({ type: 'END_GAME', playload: null }),
	hideNotes: () => dispatch({ type: 'HIDE_NOTES', playload: null }),
});

const mapStateToProps = state => ({
	startGame: state.gameStarted,
	gameEnd: state.gameEnd,
	winner: state.winner,
	notes: state.notes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
