import useAppStore from '../stores/useAppStore';
import React from 'react';

const ActivityBarButtonFiles = () => {
  const isSidebarLeftActive = useAppStore((store) => store.isSidebarLeftActive);
  const setIsSidebarLeftActive = useAppStore((store) => store.setIsSidebarLeftActive);
  const sidebarLeftModuleStates = useAppStore((store) => store.sidebarLeftModuleStates);
  const setSidebarLeftModuleStates = useAppStore((store) => store.setSidebarLeftModuleStates);
  const refMainWindowLeft = useAppStore((store) => store.refMainWindowLeft);
  const mainWindowLeftWidth = useAppStore((store) => store.mainWindowLeftWidth);

  const handleClick = () => {
    resizeMainWindowLeft();
    if (sidebarLeftModuleStates.files) {
      setIsSidebarLeftActive(!isSidebarLeftActive);
    } else {
      setIsSidebarLeftActive(true);
      setSidebarLeftModuleStates({ files: true, search: false });
    }
  };

  const resizeMainWindowLeft = () => {
    if (!refMainWindowLeft?.current) return;
    if (isSidebarLeftActive && sidebarLeftModuleStates.files) {
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
        title="File Explorer" // is this copyrighted by Windows?
      >
        🗄️
      </button>
    </div>
  );
};

export default ActivityBarButtonFiles;
