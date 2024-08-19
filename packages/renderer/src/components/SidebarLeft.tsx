import useAppStore from '../stores/useAppStore';
import SidebarModuleFiles from './SidebarModuleFiles';
import SidebarModuleSearch from './SidebarModuleSearch';
import React, { useEffect } from 'react';

const SidebarLeft = () => {
  const isSidebarLeftActive = useAppStore((state) => state.isSidebarLeftActive);
  const setMainWindowLeftWidth = useAppStore((state) => state.setMainWindowLeftWidth);
  const isSidebarLeftResizing = useAppStore((state) => state.isSidebarLeftResizing);
  const isSidebarRightResizing = useAppStore((state) => state.isSidebarRightResizing);

  useEffect(() => {
    const value = 12;
    if (!isSidebarLeftActive) setMainWindowLeftWidth(value);
  }, [isSidebarLeftActive]);

  if (!isSidebarLeftActive) return <div></div>;
  if (isSidebarLeftResizing || isSidebarRightResizing) {
    return (
      <div className="pointer-events-none flex h-full shrink grow flex-row overflow-clip dark:bg-dark-3">
        <SidebarModuleFiles />
        <SidebarModuleSearch />
      </div>
    );
  } else {
    return (
      <div className="flex h-full shrink grow flex-row overflow-clip dark:bg-dark-3">
        <SidebarModuleFiles />
        <SidebarModuleSearch />
      </div>
    );
  }
};

export default SidebarLeft;
