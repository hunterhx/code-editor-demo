import useAppStore from '../stores/useAppStore';
import TitleBarSidebarRightButton from './TitleBarSidebarRightButton';
import React from 'react';

const TitleBarTabs = () => {
  const isSidebarLeftSnapped = useAppStore((store) => store.isSidebarLeftSnapped);
  const isSidebarRightSnapped = useAppStore((store) => store.isSidebarRightSnapped);

  return (
    <div className="flex grow flex-row justify-between dark:bg-dark-3">
      {isSidebarLeftSnapped && (
        <div className="h-full w-[28px] border-b dark:border-dark-1 dark:bg-dark-3"></div>
      )}
      <p className="w-full border-b dark:border-dark-1 dark:text-light-3">Tabs</p>
      {isSidebarRightSnapped && <TitleBarSidebarRightButton />}
    </div>
  );
};

export default TitleBarTabs;
