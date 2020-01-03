import React from 'react';
import { connect } from 'react-redux';

function GameLog({ gameLog, computerSunk }) {
	return (
		<div>
			<h3>Game Log</h3>
			<div className="logs">
				{gameLog.length > 0
					? gameLog.map((log, i) =>
							i < 9 ? (
								<span>
									{log.player}: {log.col} {log.row} {log.turn} {log.ship ? `${log.ship} sunk` : null}
								</span>
							) : null
					  )
					: null}
			</div>
		</div>
	);
}
  
const mapStateToProps = state => ({
	gameLog: state.gameLog,
});

export default connect(mapStateToProps)(GameLog);
