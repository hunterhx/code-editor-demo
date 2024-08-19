import React from 'react';

const ActivityBarButtonSettings = () => {
  const handleClick = () => undefined;

  return (
    <div className="h-8 w-8 rounded-md border dark:border-dark-1 dark:bg-dark-2 dark:hover:bg-dark-1">
      <button
        className="h-full w-full select-none"
        onClick={handleClick}
        title="Settings"
      >
        ⚙️
      </button>
    </div>
  );
};

export default ActivityBarButtonSettings;
