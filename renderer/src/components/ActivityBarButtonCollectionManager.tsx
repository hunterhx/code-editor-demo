import useAppStore from '../stores/useAppStore';
import React from 'react';

const ActivityBarButtonCollectionManager = () => {
  const setIsCollectionManagerOpen = useAppStore((store) => store.setIsCollectionManagerOpen);

  const handleClick = () => setIsCollectionManagerOpen(true);

  return (
    <div className="h-8 w-8 rounded-md border dark:border-dark-1 dark:bg-dark-2 dark:hover:bg-dark-1">
      <button
        className="h-full w-full select-none"
        onClick={handleClick}
        title="Collection Manager"
      >
        🗃️
      </button>
    </div>
  );
};

export default ActivityBarButtonCollectionManager;
