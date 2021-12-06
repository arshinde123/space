import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Slice
const slice = createSlice({
    name: 'time',
    initialState: {
        totalTime: 0,
    },
    reducers: {
        totalTimeSaved: (time, action) => {
            time.totalTime = action.payload.totalTime;
        },
    },
});

const { totalTimeSaved } = slice.actions;

export default slice.reducer;

export const saveTotalTime = (totalTime) => (dispatch, getState) => {
    dispatch(totalTimeSaved({ totalTime }));
};

// selectors
export const getTotalTime = createSelector(
    (state) => state.entities.time,
    (time) => time.totalTime
);
