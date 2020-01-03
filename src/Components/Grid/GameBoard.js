import React from 'react';
import { connect } from 'react-redux';

import GridHeader from './GridHeader';
import GridSide from './GridSide';
import GridItem from './GridItem';

function Grid({ gameBoard }) {
	return (
		<div className="grid">
			<GridHeader />
			<div className="grid-container">
				<GridSide />
				<div className="col">
					{gameBoard.map((row, i) => {
						return (
							<div className="row" key={`row-${i}`}>
								{row.map((col, j) => (
									<GridItem
										coords={`${j}-${i}`}
										char={col}
										key={`row-${j}-${i}`}
										className={col === 0 ? 'row-item' : 'row-item ship'}
									/>
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
	gameBoard: state.gameBoard,
});

export default connect(mapStateToProps)(Grid);
