import React from 'react';
import { Grid, Paper } from '@mui/material';
import Clock from './components/Clock';
import './App.css';

function App() {
	return (
		<Grid
			container
			spacing={0}
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh' }}
		>
			<Grid item xs={12}>
				<Paper className="App">
					<Clock />
				</Paper>
			</Grid>
		</Grid>
	);
}

export default App;
