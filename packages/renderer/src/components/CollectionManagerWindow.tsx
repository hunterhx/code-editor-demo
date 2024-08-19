import CollectionManagerLogo from './CollectionManagerLogo';
import CollectionManagerSectionCreate from './CollectionManagerSectionCreate';
import CollectionManagerSectionOpen from './CollectionManagerSectionOpen';
import CollectionManagerSectionRegister from './CollectionManagerSectionRegister';
import CollectionManagerSectionSync from './CollectionManagerSectionSync';
import React from 'react';

const CollectionManagerWindow = () => {
  const handleDoubleClick = () => {
    window.electronAPI.titleBarDoubleClick();
  };

  return (
    <div className="flex h-screen shrink-0 grow flex-col items-center overflow-clip bg-dark-4">
      <div
        // add drag-window
        className="w-full shrink-0 basis-10 border-b dark:border-dark-1 dark:bg-dark-3"
        onDoubleClick={handleDoubleClick}
      ></div>
      <div className="mx-2.5 flex grow flex-col items-center justify-center gap-8">
        <CollectionManagerLogo />
        <div className="flex flex-col gap-3">
          <CollectionManagerSectionCreate />
          <div className="h-[1px] w-full dark:bg-dark-1"></div>
          <CollectionManagerSectionOpen />
          <div className="h-[1px] w-full dark:bg-dark-1"></div>
          <CollectionManagerSectionRegister />
          <div className="h-[1px] w-full dark:bg-dark-1"></div>
          <CollectionManagerSectionSync />
        </div>
      </div>
    </div>
  );
};

export default CollectionManagerWindow;
