import './Settings.scss';
import Select, { SingleValue } from 'react-select';
import { IOptionSelect, getPlayerPos, levelOptions } from '../constants/levels';
import { dispatch } from '../store';
import {
    setLevel,
    setLevelComplete,
    setPlayerPos,
    setPrevLevelState,
    selectPrevLevelState
} from '../store/gameStatsSlice';
import { MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';

const Settings = () => {
    const prevLevelState = useSelector(selectPrevLevelState);

    const [currentLevel, setCurrentLevel] = useState<number[][]>([]);
    const onChangeLevel = (option: SingleValue<IOptionSelect>) => {
        dispatch(setPlayerPos(getPlayerPos(option?.data ?? [])));
        dispatch(setLevel(option?.data ?? []));
        setCurrentLevel(option?.data ?? []);
        dispatch(setLevelComplete(false));
    };

    const onResetClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(setPlayerPos(getPlayerPos(currentLevel)));
        dispatch(setLevel(currentLevel));
        dispatch(setLevelComplete(false));
    };

    const onReturnClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(setPrevLevelState(undefined));
        dispatch(setLevel(prevLevelState ?? []));
        dispatch(setPlayerPos(getPlayerPos(prevLevelState ?? [])));
    };

    return (
        <div className="settings">
            <button onClick={onReturnClick} disabled={!prevLevelState}>
                &#8634; Back
            </button>
            <Select
                options={levelOptions}
                className="level-select"
                onChange={onChangeLevel}
                isSearchable={false}
                defaultValue={levelOptions[0]}
            />
            <button onClick={onResetClick}>Reset</button>
        </div>
    );
};

export default Settings;
