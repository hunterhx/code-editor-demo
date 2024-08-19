import useAppStore from '../stores/useAppStore';
import React from 'react';

const SidebarRight = () => {
  const isSidebarRightActive = useAppStore((state) => state.isSidebarRightActive);
  const isSidebarLeftResizing = useAppStore((state) => state.isSidebarLeftResizing);
  const isSidebarRightResizing = useAppStore((state) => state.isSidebarRightResizing);

  if (!isSidebarRightActive) return <div></div>;
  if (isSidebarRightResizing || isSidebarLeftResizing) {
    return (
      <div className="pointer-events-none shrink grow dark:bg-dark-3">
        <p className="dark:text-light-3">SidebarRight</p>
      </div>
    );
  } else {
    return (
      <div className="shrink grow dark:bg-dark-3">
        <p className="dark:text-light-3">SidebarRight</p>
      </div>
    );
  }
};

export default SidebarRight;
