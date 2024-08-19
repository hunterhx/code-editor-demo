import useAppStore from '../stores/useAppStore';
import React from 'react';

const TitleBarBufferRight = () => {
  const isSidebarRightActive = useAppStore((store) => store.isSidebarRightActive);

  const handleDoubleClick = () => {
    window.electronAPI.titleBarDoubleClick();
  };

  if (!isSidebarRightActive) return <div></div>;
  return (
    // add drag-window
    <div
      className="grow border-b dark:border-dark-1 dark:bg-dark-3"
      onDoubleClick={handleDoubleClick}
    ></div>
  );
};

export default TitleBarBufferRight;
