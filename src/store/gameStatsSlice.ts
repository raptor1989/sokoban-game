import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getPlayerPos, level1 } from '../constants/levels';

export type Position = { x: number; y: number };

interface IGameStats {
    level: number[][];
    player: Position;
    levelComplete: boolean;
    prevLevelState?: number[][];
}

const initialState: IGameStats = {
    level: [...level1],
    player: getPlayerPos(level1),
    levelComplete: false
};

export const gameStatsSlice = createSlice({
    name: 'gameStats',
    initialState,
    reducers: {
        setPlayerPos: (state, action: PayloadAction<Position>) => {
            state.player = action.payload;
        },
        setLevel: (state, action: PayloadAction<number[][]>) => {
            state.level = action.payload;
        },
        setLevelComplete: (state, action: PayloadAction<boolean>) => {
            state.levelComplete = action.payload;
        },
        setPrevLevelState: (state, action: PayloadAction<number[][] | undefined>) => {
            state.prevLevelState = action.payload;
        }
    }
});

export const { setPlayerPos, setLevel, setLevelComplete, setPrevLevelState } = gameStatsSlice.actions;

export const selectPlayerPos = (state: RootState) => state.gameStats.player;
export const selectLevel = (state: RootState) => state.gameStats.level;
export const selectLevelComplete = (state: RootState) => state.gameStats.levelComplete;
export const selectPrevLevelState = (state: RootState) => state.gameStats.prevLevelState;