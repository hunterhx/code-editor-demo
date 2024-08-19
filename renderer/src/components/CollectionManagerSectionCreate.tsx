import useAppStore from '../stores/useAppStore';
import CollectionManagerDialogCreate from './CollectionManagerDialogCreate';
import React from 'react';

const CollectionManagerSectionCreate = () => {
  const refCollectionManagerDialogCreate = useAppStore(
    (store) => store.refCollectionManagerDialogCreate,
  );

  const handleClick = () => {
    if (!refCollectionManagerDialogCreate?.current) return;
    refCollectionManagerDialogCreate.current.showModal();
  };

  return (
    <section className="flex shrink-0 grow select-none flex-row items-center gap-8">
      <label className="text-md flex grow flex-col dark:text-light-3">
        <p>Create a new folder to hold your collection</p>
        <p className="text-xs italic">If you&#39;re new to Rote, start here.</p>
      </label>
      <button
        className="h-9 w-20 rounded-md p-1 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent dark:bg-dark-2 dark:text-light-3 dark:hover:bg-dark-1 dark:active:text-light-1"
        onClick={handleClick}
        title="Create New Collection"
      >
        Create
      </button>
      <CollectionManagerDialogCreate />
    </section>
  );
};

export default CollectionManagerSectionCreate;
