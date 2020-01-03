import React from 'react';

import Controls from './Controls';
import Grid from './Grid/Grid';
import GameBoard from './Grid/GameBoard';
import GameLog from './GameLog';
import './App.css';
import SunkLog from './SunkLog';

function App() {
	return (
		<div className="App">
			<h1>React/Redux Battleship</h1>
			<Controls />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Grid />
				<GameBoard />
			</div>
			<div className="game-info">
				<GameLog />
				<SunkLog />
			</div>
		</div>
	);
}

export default App;
