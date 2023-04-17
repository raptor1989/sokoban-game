import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export type Position = { x: number; y: number };

interface IGameStats {
    level: Array<number[]>;
    player: Position;
}

const initialState: IGameStats = {
    level: [],
    player: { x: 0, y: 0 }
};

export const gameStatsSlice = createSlice({
    name: 'gameStats',
    initialState,
    reducers: {
        setPlayerPos: (state, action: PayloadAction<Position>) => {
            state.player = action.payload;
        },
        setLevel: (state, action: PayloadAction<Array<number[]>>) => {
            state.level = action.payload;
        }
    }
});

export const { setPlayerPos, setLevel } = gameStatsSlice.actions;

export const selectPlayerPos = (state: RootState) => state.gameStats.player;
