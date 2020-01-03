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
			<div className="title">
				<h1>React Battleship</h1>
				<Controls />
			</div>
			<div className="board-layout">
				<div>
					<Grid />
					<GameLog />
				</div>
				<div>
					<GameBoard />
					<SunkLog />
				</div>
			</div>
		</div>
	);
}

export default App;
