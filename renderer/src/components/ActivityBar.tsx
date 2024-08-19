import ActivityBarButtonCollectionManager from './ActivityBarButtonCollectionManager';
import ActivityBarButtonFiles from './ActivityBarButtonFiles';
import ActivityBarButtonGraph from './ActivityBarButtonGraph';
import ActivityBarButtonSearch from './ActivityBarButtonSearch';
import ActivityBarButtonSettings from './ActivityBarButtonSettings';
import React from 'react';

const ActivityBar = () => {
  return (
    <div className="flex h-full w-12 shrink-0 flex-col items-center justify-between border-r dark:border-dark-1 dark:bg-dark-3">
      <div className="flex flex-col gap-1.5 pt-2">
        <ActivityBarButtonFiles />
        <ActivityBarButtonSearch />
        <ActivityBarButtonGraph />
      </div>
      <div className="flex flex-col gap-1 pb-2">
        <ActivityBarButtonCollectionManager />
        <ActivityBarButtonSettings />
      </div>
    </div>
  );
};

export default ActivityBar;
