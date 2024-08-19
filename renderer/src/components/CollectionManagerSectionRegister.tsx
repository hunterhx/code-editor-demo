import useAppStore from '../stores/useAppStore';
import CollectionManagerDialogRegister from './CollectionManagerDialogRegister';
import React from 'react';

const CollectionManagerSectionCreate = () => {
  const refCollectionManagerDialogRegister = useAppStore(
    (store) => store.refCollectionManagerDialogRegister,
  );

  const handleClick = () => {
    if (!refCollectionManagerDialogRegister?.current) return;
    refCollectionManagerDialogRegister.current.showModal();
  };

  return (
    <section className="flex shrink-0 grow select-none flex-row items-center gap-8">
      <label className="text-md grow dark:text-light-3">
        <p>Register an existing folder as a collection</p>
        <p className="text-xs italic">Already have a folder to use as a collection? Start here.</p>
      </label>
      <button
        className="h-9 w-20 rounded-md p-1 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent dark:bg-dark-2 dark:text-light-3 dark:hover:bg-dark-1 dark:active:text-light-1"
        onClick={handleClick}
        title="Register Folder as Collection"
      >
        Register
      </button>
      <CollectionManagerDialogRegister />
    </section>
  );
};

export default CollectionManagerSectionCreate;
