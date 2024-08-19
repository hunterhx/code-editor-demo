import useAppStore from '../stores/useAppStore';
import React from 'react';

const SidebarModuleSearch = () => {
  const sidebarLeftModuleStates = useAppStore((state) => state.sidebarLeftModuleStates);

  if (!sidebarLeftModuleStates.search) return <div></div>;
  return (
    <div className="h-full">
      <p className="dark:text-light-3">Search</p>
    </div>
  );
};

export default SidebarModuleSearch;
