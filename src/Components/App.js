import React from 'react';

import Grid from './Grid/Grid';
import Controls from './Controls';
import './App.css';

function App() {
	return (
		<div className="App">
			<h1>React/Redux Battleship</h1>
			<Controls />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Grid />
			</div>
		</div>
	);
}

export default App;
