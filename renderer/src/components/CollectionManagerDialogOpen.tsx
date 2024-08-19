import useAppStore from '../stores/useAppStore';
import CollectionManagerCollectionItem from './CollectionManagerCollectionItem';
import React, { useEffect, useRef, useState } from 'react';

type CollectionArrayItem = {
  id: string;
  name: string;
  path: string;
};

const CollectionManagerDialogOpen = () => {
  const activeCollectionId = useAppStore((store) => store.activeCollectionId);
  const setRefCollectionManagerDialogOpen = useAppStore(
    (store) => store.setRefCollectionManagerDialogOpen,
  );
  const [collectionList, setCollectionList] = useState<CollectionArrayItem[]>([]);
  const refCollectionManagerDialogOpen = useRef<HTMLDialogElement>(null);

  const getCollectionList = async () => {
    const collectionsString = await window.electronAPI.getCollectionList();
    const collections = await JSON.parse(collectionsString);
    const collectionsArray = [];
    for (const collectionId in collections) {
      const collection = collections[collectionId];
      collectionsArray.push({ id: collectionId, path: collection.path, name: collection.name });
    }
    if (!collectionsArray) return;
    collectionsArray.sort((a, b) => {
      if (a.id == activeCollectionId) return -1;
      if (b.id == activeCollectionId) return 1;
      return a.name.localeCompare(b.name);
    });
    setCollectionList(collectionsArray);
  };

  const handleButtonClickGoBack = () => {
    if (!refCollectionManagerDialogOpen?.current) return;
    refCollectionManagerDialogOpen.current.close();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!refCollectionManagerDialogOpen?.current) return;
    const dialog = refCollectionManagerDialogOpen.current;
    if (e.target == dialog) dialog.close();
  };

  useEffect(() => {
    setRefCollectionManagerDialogOpen(refCollectionManagerDialogOpen);
    getCollectionList();
  }, []);

  useEffect(() => {
    if (!refCollectionManagerDialogOpen?.current) return;
    const dialog = refCollectionManagerDialogOpen.current;
    dialog.addEventListener('click', handleClickOutside);
    return () => dialog.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <dialog
      className="min-w-fit select-none rounded-lg backdrop:bg-dark-4 backdrop:opacity-75 dark:bg-dark-3"
      ref={refCollectionManagerDialogOpen}
    >
      <div className="flex max-h-[calc(100vh-80px)] w-full flex-row gap-5 overflow-clip rounded-lg border p-5 dark:border-dark-1 dark:bg-dark-3">
        <div className="flex w-full min-w-[320px] max-w-xs flex-col gap-2.5 dark:text-light-4">
          <div className="flex flex-col">
            <h2 className="whitespace-nowrap text-lg">Opening an existing collection</h2>
            <p className="text-xs italic">
              See our documentation for more info: <a className="text-accent">Add link</a>
            </p>
          </div>
          <div className="h-[1px] w-full dark:bg-dark-1"></div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">When you open an existing collection...</p>
            <p className="text-sm">
              Right click on a collection for more options &#40;rename, move, etc.&#41;.
            </p>
            <p className="text-sm">
              De-registering a collection doesn&#39;t delete its contents or modify the collection
              folder in any way - it only removes it from this list. To re-register a de-registered
              collection, exit this dialog and click &quot;Register&quot;
            </p>
          </div>
        </div>
        <div className="w-[1px] shrink-0 dark:bg-dark-1"></div>
        <div className="flex w-full min-w-[320px] max-w-xs flex-col items-center gap-1 overflow-x-clip overflow-y-scroll">
          {collectionList.length > 0 ? (
            collectionList.map((collection) => {
              return (
                <CollectionManagerCollectionItem
                  key={collection.id}
                  id={collection.id}
                  name={collection.name}
                  path={collection.path}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center text-center">
              <p className="italic text-error">No collections detected!</p>
              <p className="text-light-4">
                Create new collection by closing this dialog and pressing the &quot;Create&quot;
                button.
              </p>
            </div>
          )}
          <div className="my-2 h-[1px] w-full dark:bg-dark-1"></div>
          <button
            className="min-w-20 h-9 w-full rounded-md p-1 text-light-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent dark:bg-dark-2 dark:hover:bg-dark-1"
            onClick={handleButtonClickGoBack}
            type="button"
            title="Go back"
          >
            Go back
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CollectionManagerDialogOpen;
