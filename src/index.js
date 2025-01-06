import React from 'react';
import ReactDOM from 'react-dom/client'; // 注意這裡
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // 使用 createRoot
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
