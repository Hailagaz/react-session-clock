import { createSlice } from '@reduxjs/toolkit';

export const clockSlice = createSlice({
	name: 'clock',
	initialState: {
		breakLength: 5,
		sessionLength: 25,
		timerLabel: 'Session',
		timeLeft: 1500, // 25 minutes
		isRunning: false,
		isSession: true,
	},
	reducers: {
		decrementBreak: (state) => {
			if (state.breakLength > 1) {
				state.breakLength -= 1;
			}
		},
		incrementBreak: (state) => {
			if (state.breakLength < 60) {
				state.breakLength += 1;
			}
		},
		decrementSession: (state) => {
			if (state.sessionLength > 1) {
				state.sessionLength -= 1;
				state.timeLeft -= 60;
			}
		},
		incrementSession: (state) => {
			if (state.sessionLength < 60) {
				state.sessionLength += 1;
				state.timeLeft += 60;
			}
		},
		resetClock: (state) => {
			state.breakLength = 5;
			state.sessionLength = 25;
			state.timerLabel = 'Session';
			state.timeLeft = 1500;
			state.isRunning = false;
			state.isSession = true;
		},
		toggleClock: (state) => {
			state.isRunning = !state.isRunning;
		},
	},
});

export const {
	decrementBreak,
	incrementBreak,
	decrementSession,
	incrementSession,
	resetClock,
	toggleClock,
} = clockSlice.actions;

export const selectClock = (state) => state.clock;
export const selectIsRunning = (state) => state.clock.isRunning;
export const selectIsSession = (state) => state.clock.isSession;

export default clockSlice.reducer;
