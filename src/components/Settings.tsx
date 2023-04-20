import './Settings.scss';
import Select, { SingleValue } from 'react-select';
import { IOptionSelect, getPlayerPos, levelOptions } from '../constants/levels';
import { dispatch } from '../store';
import { setLevel, setLevelComplete, setPlayerPos } from '../store/gameStatsSlice';
import { MouseEvent, useState } from 'react';

const Settings = () => {
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

    return (
        <div className="settings">
            <Select options={levelOptions} className="level-select" onChange={onChangeLevel} isSearchable={false} />
            <button onClick={onResetClick}>Reset</button>
        </div>
    );
};

export default Settings;
