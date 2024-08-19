import React from 'react';

const TitleBarStoplights = () => {
  const handleDoubleClick = async () => {
    window.electronAPI.titleBarDoubleClick();
  };

  return (
    <div
      // add drag-window
      className="h-10 w-[76px] shrink-0 border-b dark:border-dark-1 dark:bg-dark-3"
      onDoubleClick={handleDoubleClick}
    ></div>
  );
};

export default TitleBarStoplights;
