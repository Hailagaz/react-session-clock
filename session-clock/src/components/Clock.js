import React, { useState, useRef } from 'react';
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
import beepSound from '../audio/BeepSound.wav';

const Clock = () => {
	const dispatch = useDispatch();
	const { breakLength, sessionLength, timerLabel, isRunning } = useSelector(selectClock);
	const isSession = useSelector(selectIsSession);

	const [timeLeft, setTimeLeft] = useState(sessionLength * 60);

	const timerRef = useRef(null);
	const beepRef = useRef();

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');
		return `${mins}:${secs}`;
	};

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setTimeLeft((prevTimeLeft) => {
				if (prevTimeLeft === 1) {
					beepRef.current.play();
					dispatch(toggleClock()); // Switch to break
					return breakLength * 60;
				}
				return prevTimeLeft - 1;
			});
		}, 1000);
	};

	const stopTimer = () => {
		clearInterval(timerRef.current);
	};

	const handleStartStopClick = () => {
		if (isRunning) {
			stopTimer();
		} else {
			startTimer();
		}
		dispatch(toggleClock());
	};

	const handleResetClick = () => {
		stopTimer();
		dispatch(resetClock());
		setTimeLeft(sessionLength * 60);
	};

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
			setTimeLeft((prevTimeLeft) => prevTimeLeft - 60);
		}
	};

	const handleSessionIncrement = () => {
		if (!isRunning && sessionLength < 60) {
			dispatch(incrementSession());
			setTimeLeft((prevTimeLeft) => prevTimeLeft + 60);
		}
	};

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
