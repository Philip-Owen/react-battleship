import React from 'react';

export default function GridSide() {
	const items = [...Array(10).keys()];
	return (
		<div className="col">
			{items.map(item => (
				<span className="row-item" key={`side-item-${item}`}>
					{item + 1}
				</span>
			))}
		</div>
	);
}
