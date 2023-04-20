import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './components/Board';
import { Provider } from 'react-redux';
import { store } from './store';
import Settings from './components/Settings';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Settings />
            <Board />
        </Provider>
    </React.StrictMode>
);
