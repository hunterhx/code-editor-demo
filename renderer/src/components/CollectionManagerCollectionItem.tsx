import useAppStore from '../stores/useAppStore';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  id: string;
  name: string;
  path: string;
};

const CollectionManagerCollectionItem = ({ id, name, path }: Props) => {
  const activeCollectionId = useAppStore((store) => store.activeCollectionId);
  const setActiveCollectionId = useAppStore((store) => store.setActiveCollectionId);
  const setActiveCollectionName = useAppStore((store) => store.setActiveCollectionName);
  const setIsCollectionManagerOpen = useAppStore((store) => store.setIsCollectionManagerOpen);
  const [isActiveCollection, setIsActiveCollection] = useState(false);
  const refCollectionPath = useRef(path);
  const refCollectionName = useRef(name);
  const refCollectionId = useRef(id);

  const handleClick = () => {
    setActiveCollectionId(refCollectionId.current);
    setActiveCollectionName(refCollectionName.current);
    setIsCollectionManagerOpen(false);
  };

  const handleContextMenu = async () => {
    await window.electronAPI.showCollectionMangerCollectionItemMenu();
  };

  const checkIfActiveCollection = async () => {
    if (activeCollectionId != refCollectionId.current) return;
    setIsActiveCollection(true);
  };

  useEffect(() => {
    checkIfActiveCollection();
  }, [activeCollectionId]);

  return (
    <button
      className="group flex w-full max-w-xs flex-col items-start justify-start gap-1.5 rounded-md p-1.5 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent dark:bg-dark-2 dark:hover:bg-dark-1"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="w-full break-words text-left text-sm dark:text-light-3 dark:group-active:text-light-1">
        <span className="text-sm font-semibold text-accent">{isActiveCollection && 'Active'}</span>{' '}
        {refCollectionName.current}
      </div>
      <div className="w-full break-words text-left text-xs dark:text-light-4 dark:group-active:text-light-2">
        {refCollectionPath.current}
      </div>
    </button>
  );
};

export default CollectionManagerCollectionItem;
