import React from 'react';
import { connect } from 'react-redux';

function SunkLog({ computerSunk, playerSunk }) {
	console.log(computerSunk);
	return (
		<div className="sunk-log">
			<h3>Sunk Ships</h3>
			<div>
				<div className="sunk">
					<div>
						<h4>Player Ships</h4>
						<div className="sunk-log">
							{playerSunk.length > 0 ? playerSunk.map(ship => <span>{ship}</span>) : null}
						</div>
					</div>
					<div>
						<h4>Computer Ships</h4>
						<div className="sunk-ships">
							{computerSunk.length > 0 ? computerSunk.map(ship => <span>{ship}</span>) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	computerSunk: state.computerShips.sunk,
	playerSunk: state.playerShips.sunk,
});

export default connect(mapStateToProps)(SunkLog);
