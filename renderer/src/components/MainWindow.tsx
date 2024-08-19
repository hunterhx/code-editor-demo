import MainWindowLeft from './MainWindowLeft';
import MainWindowLeftResizer from './MainWindowLeftResizer';
import MainWindowMiddle from './MainWindowMiddle';
import MainWindowRight from './MainWindowRight';
import MainWindowRightResizer from './MainWindowRightResizer';
import StatusBar from './StatusBar';
import React from 'react';

const MainWindow = () => {
  return (
    <div className="flex h-screen select-none flex-col">
      <div className="flex h-full flex-row">
        <MainWindowLeft />
        <MainWindowLeftResizer />
        <MainWindowMiddle />
        <MainWindowRightResizer />
        <MainWindowRight />
      </div>
      <StatusBar />
    </div>
  );
};

export default MainWindow;
