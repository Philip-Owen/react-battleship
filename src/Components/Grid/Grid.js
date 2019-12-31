import React from 'react';
import { connect } from 'react-redux';

import GridHeader from './GridHeader';
import GridSide from './GridSide';

function Grid({ playerBoard }) {
	return (
		<div className="grid">
			<GridHeader />
			<div className="grid-container">
				<GridSide />
				<div className="col">
					{playerBoard.map((row, i) => {
						return (
							<div className="row" key={`row-${i}`}>
								{row.map((col, j) => (
									<span
										data-target={`${j}-${i}`}
										key={`row-${j}-${i}`}
										className={col === 0 ? 'row-item' : 'row-item ship'}
									>
										{col === 0 ? 'o' : col}
									</span>
								))}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	playerBoard: state.playerBoard,
});

export default connect(mapStateToProps)(Grid);
