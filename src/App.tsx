import './App.scss';
import GameElements from './const/GameElements';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerPos, selectLevel, setLevel, setPlayerPos } from './store/gameStatsSlice';
import { dispatch } from './store';
import cloneDeep from 'lodash/cloneDeep';
import Box from './images/i3.gif';
import BoxOnGoal from './images/i4.gif';
import Player from './images/i5.gif';

const App = () => {
    const ref = useRef<HTMLDivElement>(null);

    const playerPos = useSelector(selectPlayerPos);
    const level = useSelector(selectLevel);

    const movePlayer = (dx: number, dy: number) => {
        const newCol = playerPos.x + dx;
        const newRow = playerPos.y + dy;
        const oldCell = level[playerPos.y][playerPos.x];
        const newCell = level[newRow][newCol];
        const newLevelState = cloneDeep(level);

        switch (newCell) {
            case GameElements.Wall:
                break;
            case GameElements.Empty:
            case GameElements.Goal:
                newLevelState[playerPos.y][playerPos.x] =
                    oldCell === GameElements.PlayerOnGoal ? GameElements.Goal : GameElements.Empty;
                newLevelState[newRow][newCol] =
                    newCell === GameElements.Goal ? GameElements.PlayerOnGoal : GameElements.Player;
                dispatch(setPlayerPos({ x: newCol, y: newRow }));
                dispatch(setLevel(newLevelState));
                break;
            case GameElements.Box:
            case GameElements.BoxOnGoal:
                const newBoxCol = newCol + dx;
                const newBoxRow = newRow + dy;
                const newBoxCell = level[newBoxRow][newBoxCol];
                if ([GameElements.Box, GameElements.BoxOnGoal, GameElements.Wall].some((x) => x === newBoxCell)) {
                    return;
                }
                newLevelState[playerPos.y][playerPos.x] =
                    oldCell === GameElements.PlayerOnGoal ? GameElements.Goal : GameElements.Empty;
                newLevelState[newRow][newCol] =
                    newCell === GameElements.BoxOnGoal ? GameElements.PlayerOnGoal : GameElements.Player;
                newLevelState[newBoxRow][newBoxCol] =
                    newBoxCell === GameElements.Goal || newBoxCell === GameElements.BoxOnGoal
                        ? GameElements.BoxOnGoal
                        : GameElements.Box;
                dispatch(setPlayerPos({ x: newCol, y: newRow }));
                dispatch(setLevel(newLevelState));
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

    useEffect(() => {
        ref?.current?.focus();
    }, []);

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
                            } else if (cell === GameElements.Player || cell === GameElements.PlayerOnGoal) {
                                return (
                                    <div key={`${indexRow}-${indexCell}`} className="player">
                                        <img src={Player} alt="box" />
                                    </div>
                                );
                            } else if (cell === GameElements.Goal) {
                                return <div key={`${indexRow}-${indexCell}`} className="goal"></div>;
                            } else if (cell === GameElements.Box) {
                                return (
                                    <div key={`${indexRow}-${indexCell}`} className="box">
                                        <img src={Box} alt="box" />
                                    </div>
                                );
                            } else if (cell === GameElements.BoxOnGoal) {
                                return (
                                    <div key={`${indexRow}-${indexCell}`} className="goal">
                                        <img src={BoxOnGoal} alt="box" />
                                    </div>
                                );
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
