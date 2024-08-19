import useAppStore from '../stores/useAppStore';
import React from 'react';

const ActivityBarButtonSearch = () => {
  const isSidebarLeftActive = useAppStore((store) => store.isSidebarLeftActive);
  const setIsSidebarLeftActive = useAppStore((store) => store.setIsSidebarLeftActive);
  const sidebarLeftModuleStates = useAppStore((store) => store.sidebarLeftModuleStates);
  const setSidebarLeftModuleStates = useAppStore((store) => store.setSidebarLeftModuleStates);
  const refMainWindowLeft = useAppStore((store) => store.refMainWindowLeft);
  const mainWindowLeftWidth = useAppStore((store) => store.mainWindowLeftWidth);

  const handleClick = () => {
    resizeMainWindowLeft();
    if (sidebarLeftModuleStates.search) {
      setIsSidebarLeftActive(!isSidebarLeftActive);
    } else {
      setIsSidebarLeftActive(true);
      setSidebarLeftModuleStates({ files: false, search: true });
    }
  };

  const resizeMainWindowLeft = () => {
    if (!refMainWindowLeft?.current) return;
    if (isSidebarLeftActive && sidebarLeftModuleStates.search) {
      refMainWindowLeft.current.style.width = `0px`;
    } else {
      refMainWindowLeft.current.style.width = `${mainWindowLeftWidth}px`;
    }
  };

  return (
    <div className="h-8 w-8 rounded-md border dark:border-dark-1 dark:bg-dark-2 dark:hover:bg-dark-1">
      <button
        className="h-full w-full select-none"
        onClick={handleClick}
        title="Search"
      >
        🔍
      </button>
    </div>
  );
};

export default ActivityBarButtonSearch;
