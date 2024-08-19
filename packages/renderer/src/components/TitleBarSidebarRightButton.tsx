import useAppStore from '../stores/useAppStore';
import React from 'react';

const TitleBarSidebarRightButton = () => {
  const isSidebarRightActive = useAppStore((store) => store.isSidebarRightActive);
  const setIsSidebarRightActive = useAppStore((state) => state.setIsSidebarRightActive);
  const refMainWindowRight = useAppStore((state) => state.refMainWindowRight);
  const mainWindowRightWidth = useAppStore((state) => state.mainWindowRightWidth);

  const rightSidebarButtonHandleClick = () => {
    resizeMainWindowRight();
    setIsSidebarRightActive(!isSidebarRightActive);
  };

  const resizeMainWindowRight = () => {
    if (!refMainWindowRight?.current) return;
    if (isSidebarRightActive) {
      refMainWindowRight.current.style.width = `0px`;
    } else {
      refMainWindowRight.current.style.width = `${mainWindowRightWidth}px`;
    }
  };

  return (
    <div className="flex w-fit shrink-0 items-center justify-end border-b pr-1 dark:border-dark-1 dark:bg-dark-3">
      <button
        className="h-8 w-8 select-none rounded-md border dark:border-dark-1 dark:bg-dark-2 dark:hover:bg-dark-1"
        onClick={rightSidebarButtonHandleClick}
        title="Toggle Right Sidebar"
      >
        🗄️
      </button>
    </div>
  );
};

export default TitleBarSidebarRightButton;
