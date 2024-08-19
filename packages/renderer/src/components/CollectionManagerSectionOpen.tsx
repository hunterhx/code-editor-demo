import useAppStore from '../stores/useAppStore';
import CollectionManagerDialogOpen from './CollectionManagerDialogOpen';
import React from 'react';

const CollectionManagerSectionOpen = () => {
  const refCollectionManagerDialogOpen = useAppStore(
    (store) => store.refCollectionManagerDialogOpen,
  );

  const handleClick = () => {
    if (!refCollectionManagerDialogOpen?.current) return;
    refCollectionManagerDialogOpen.current.showModal();
  };

  return (
    <section className="flex shrink-0 grow select-none flex-row items-center gap-8">
      <label className="text-md flex-flex-col grow dark:text-light-3">
        <p>Open an already registered collection</p>
        <p className="text-xs italic">Select from your existing collections.</p>
      </label>
      <button
        className="h-9 w-20 rounded-md p-1 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent dark:bg-dark-2 dark:text-light-3 dark:hover:bg-dark-1 dark:active:text-light-1"
        onClick={handleClick}
        title="Open Existing Collection"
      >
        Open
      </button>
      <CollectionManagerDialogOpen />
    </section>
  );
};

export default CollectionManagerSectionOpen;
