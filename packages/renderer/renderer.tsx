import electronAPI from '../preload/preload';
import './index.css';
import App from './src/App';
import React from 'react';
import ReactDOM from 'react-dom/client';

declare global {
  interface Window {
    electronAPI: typeof electronAPI;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
