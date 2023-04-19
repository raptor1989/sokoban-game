import './App.scss';
import { level1, getPlayerPos } from './const/levels';
import GameElements from './const/GameElements';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerPos, selectLevel, setLevel, setPlayerPos } from './store/gameStatsSlice';
import { dispatch } from './store';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

const App = () => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        dispatch(setLevel([...level1]));
        dispatch(setPlayerPos(getPlayerPos(level1)));
        ref?.current?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const playerPos = useSelector(selectPlayerPos, isEqual);
    const level = useSelector(selectLevel);

    const movePlayer = (dx: number, dy: number) => {
        const newCol = playerPos.x + dx;
        const newRow = playerPos.y + dy;

        if (newCol < 0 || newRow < 0 || newRow >= level.length || newCol >= level[0].length) {
            return;
        }

        const cell = level[newRow][newCol];

        switch (cell) {
            case GameElements.Wall:
                break;
            case GameElements.Empty:
            case GameElements.Goal:
                dispatch(setPlayerPos({ x: newCol, y: newRow }));
                const newLevelState = cloneDeep(level);
                newLevelState[playerPos.y][playerPos.x] = GameElements.Empty;
                newLevelState[newRow][newCol] = GameElements.Player;
                dispatch(setLevel(newLevelState));

                break;
            case GameElements.Box:
            case GameElements.BoxOnGoal:
                break;

            default:
                break;
        }
    };

    const handleKeyPress = (event: any) => {
        const { key } = event;
        switch (key) {
            case 'ArrowUp':
                movePlayer(0, -1);
                break;
            case 'ArrowDown':
                movePlayer(0, 1);
                break;
            case 'ArrowLeft':
                movePlayer(-1, 0);
                break;
            case 'ArrowRight':
                movePlayer(1, 0);
                break;
            default:
                break;
        }
    };

    const handleOnBlur = () => {
        ref?.current?.focus();
    };

    return (
        <div className="board" ref={ref} tabIndex={-1} onKeyDown={handleKeyPress} onBlur={handleOnBlur}>
            {level.map((row, indexRow) => {
                return (
                    <div key={`${indexRow}`} className="row">
                        {row.map((cell, indexCell) => {
                            if (cell === GameElements.Wall) {
                                return <div key={`${indexRow}-${indexCell}`} className="wall"></div>;
                            } else if (cell === GameElements.Empty) {
                                return <div key={`${indexRow}-${indexCell}`} className="empty"></div>;
                            } else if (cell === GameElements.Player) {
                                return <div key={`${indexRow}-${indexCell}`} className="player"></div>;
                            } else if (cell === GameElements.Box) {
                                return <div key={`${indexRow}-${indexCell}`} className="box"></div>;
                            } else if (cell === GameElements.Goal) {
                                return <div key={`${indexRow}-${indexCell}`} className="goal"></div>;
                            }
                            return <div key={`${indexRow}-${indexCell}`} className="background"></div>;
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default App;
