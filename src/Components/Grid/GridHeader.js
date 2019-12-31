import React from 'react';

export default function GridHeader() {
	const items = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K'];
	return (
		<div className="grid-header">
			{items.map(item => (
				<span className="row-item" key={`header-item-${item}`}>
					{item}
				</span>
			))}
		</div>
	);
}
