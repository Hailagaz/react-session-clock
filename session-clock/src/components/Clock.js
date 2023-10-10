import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button } from '@mui/material';
import {
	decrementBreak,
	incrementBreak,
	decrementSession,
	incrementSession,
	resetClock,
	toggleClock,
	selectClock,
	selectIsRunning,
	selectIsSession,
} from '../redux/clockSlice';
import useInterval from '../hooks/useInterval';
import beepSound from '../audio/BeepSound.wav';

const Clock = () => {
	const dispatch = useDispatch();
	const { breakLength, sessionLength, timerLabel, timeLeft } = useSelector(selectClock);
	const isRunning = useSelector(selectIsRunning);
	const isSession = useSelector(selectIsSession);

	// Helper function to format time in mm:ss
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');
		return `${mins}:${secs}`;
	};

	// Handle start/stop button click
	const handleStartStopClick = () => {
		dispatch(toggleClock());
	};

	// Handle reset button click
	const handleResetClick = () => {
		dispatch(resetClock());
	};

	// Handle break and session length changes
	const handleBreakDecrement = () => {
		if (!isRunning && breakLength > 1) {
			dispatch(decrementBreak());
		}
	};

	const handleBreakIncrement = () => {
		if (!isRunning && breakLength < 60) {
			dispatch(incrementBreak());
		}
	};

	const handleSessionDecrement = () => {
		if (!isRunning && sessionLength > 1) {
			dispatch(decrementSession());
		}
	};

	const handleSessionIncrement = () => {
		if (!isRunning && sessionLength < 60) {
			dispatch(incrementSession());
		}
	};

	// Beep sound when timer reaches 0
	const beepRef = useRef();

	useInterval(
		() => {
			if (timeLeft === 0) {
				beepRef.current.play();
				if (isSession) {
					dispatch(toggleClock()); // Switch to break
				} else {
					dispatch(toggleClock()); // Switch to session
				}
			}
		},
		isRunning ? 1000 : null
	);

	return (
		<Grid container spacing={2} justifyContent="center">
			<Grid item xs={12}>
				<Typography variant="h4" id="timer-label">
					{timerLabel}
				</Typography>
				<Typography variant="h2" id="time-left">
					{formatTime(timeLeft)}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={2} justifyContent="center">
					<Grid item>
						<Typography variant="h6" id="break-label">
							Break Length
						</Typography>
						<Button id="break-decrement" onClick={handleBreakDecrement}>
							-
						</Button>
						<Typography variant="h6" id="break-length">
							{breakLength}
						</Typography>
						<Button id="break-increment" onClick={handleBreakIncrement}>
							+
						</Button>
					</Grid>
					<Grid item>
						<Typography variant="h6" id="session-label">
							Session Length
						</Typography>
						<Button id="session-decrement" onClick={handleSessionDecrement}>
							-
						</Button>
						<Typography variant="h6" id="session-length">
							{sessionLength}
						</Typography>
						<Button id="session-increment" onClick={handleSessionIncrement}>
							+
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Button id="start_stop" onClick={handleStartStopClick}>
					{isRunning ? 'Pause' : 'Start'}
				</Button>
				<Button id="reset" onClick={handleResetClick}>
					Reset
				</Button>
				<audio id="beep" preload="auto" src={beepSound} ref={beepRef} />
			</Grid>
		</Grid>
	);
};

export default Clock;
