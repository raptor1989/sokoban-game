import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getPlayerPos, level01, level1 } from '../const/levels';

export type Position = { x: number; y: number };

interface IGameStats {
    level: Array<number[]>;
    player: Position;
}

const initialState: IGameStats = {
    level: [...level01],
    player: getPlayerPos(level01)
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
export const selectLevel = (state: RootState) => state.gameStats.level;