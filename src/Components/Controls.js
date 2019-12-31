import React from 'react';
import { connect } from 'react-redux';

function Controls({ generateBoard }) {
	return (
		<div>
			<button onClick={() => generateBoard(true)}>Generate Board</button>
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	generateBoard: task => dispatch({ type: 'GENERATE_BOARD', payload: task }),
});

export default connect(null, mapDispatchToProps)(Controls);
