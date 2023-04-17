import { configureStore } from '@reduxjs/toolkit';
import { gameStatsSlice } from './gameStatsSlice';

export const store = configureStore({
    reducer: {
        gameStats: gameStatsSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
