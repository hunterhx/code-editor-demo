import React from 'react';

const CollectionManagerSectionSync = () => {
  const handleClick = () => undefined;

  return (
    <section className="flex shrink-0 grow select-none flex-row items-center gap-8">
      <label className="text-md flex grow flex-col dark:text-light-3">
        <p>Sync to a remote collection</p>
        <p className="text-xs italic">Not currently available. Coming soon!</p>
      </label>
      <button
        className="h-9 w-20 cursor-not-allowed rounded-md p-1 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent dark:bg-dark-2 dark:text-light-3  dark:group-active:text-light-1"
        disabled
        onClick={handleClick}
        tabIndex={-1}
        title="Sync to Remote Collection"
      >
        Sync
      </button>
    </section>
  );
};

export default CollectionManagerSectionSync;
