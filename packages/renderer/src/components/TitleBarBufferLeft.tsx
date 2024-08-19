import useAppStore from '../stores/useAppStore';
import React from 'react';

const TitleBarBufferLeft = () => {
  const isSidebarLeftActive = useAppStore((store) => store.isSidebarLeftActive);

  const handleDoubleClick = async () => {
    window.electronAPI.titleBarDoubleClick();
  };

  if (!isSidebarLeftActive) return <div></div>;
  return (
    // add drag-window
    <div
      className="grow border-b dark:border-dark-1 dark:bg-dark-3"
      onDoubleClick={handleDoubleClick}
    ></div>
  );
};

export default TitleBarBufferLeft;
