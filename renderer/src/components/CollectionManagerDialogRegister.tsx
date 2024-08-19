import useAppStore from '../stores/useAppStore';
import React, { useEffect, useRef, useState } from 'react';

const CollectionManagerDialogRegister = () => {
  const setActiveCollectionId = useAppStore((store) => store.setActiveCollectionId);
  const setActiveCollectionName = useAppStore((store) => store.setActiveCollectionName);
  const setIsCollectionManagerOpen = useAppStore((store) => store.setIsCollectionManagerOpen);
  const setRefCollectionManagerDialogRegister = useAppStore(
    (store) => store.setRefCollectionManagerDialogRegister,
  );
  const refCollectionManagerDialogRegister = useRef<HTMLDialogElement>(null);
  const [collectionPath, setCollectionPath] = useState('');
  const [errorMessageRegister, setErrorMessageRegister] = useState('');
  const [errorMessagePath, setErrorMessagePath] = useState('');
  const refIsPathValid = useRef(true);

  const handleButtonClickBrowse = async () => {
    const browseDialogResult = await window.electronAPI.registerCollectionSelectPathDialog();
    if (browseDialogResult.canceled) setCollectionPath('');
    const path = browseDialogResult.filePaths[0];
    setCollectionPath(path);
    await validateCollectionPath(path);
  };

  const validateCollectionPath = async (path: string) => {
    // Reset to false by default, then change to true if passes validation
    refIsPathValid.current = false;

    // Empty path
    if (!path) return setErrorMessagePath('No path selected!');

    // Path already in use by another collection
    const isPathAvailable = await window.electronAPI.checkCollectionPathAvailable(path);
    if (!isPathAvailable) {
      return setErrorMessagePath('Folder already registered to another collection!');
    }

    // Pass validation
    setErrorMessagePath('');
    refIsPathValid.current = true;
    // console.log('valid');
  };

  const handleButtonClickGoBack = () => {
    if (!refCollectionManagerDialogRegister?.current) return;
    refCollectionManagerDialogRegister.current.close();
  };

  const handleButtonClickRegister = async () => {
    await validateCollectionPath(collectionPath);
    if (!refIsPathValid.current) return;
    const collectionIdString = await window.electronAPI.createNewCollection(collectionPath);
    const collectionId = await JSON.parse(collectionIdString);
    if (!collectionId) return setErrorMessageRegister('Error registering collection!');
    setErrorMessageRegister('');
    const collectionInfoString = await window.electronAPI.getCollectionInfo(collectionId);
    if (!collectionInfoString) return;
    const collectionInfo = JSON.parse(collectionInfoString);
    setActiveCollectionId(collectionId);
    setActiveCollectionName(collectionInfo.name);
    setIsCollectionManagerOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!refCollectionManagerDialogRegister?.current) return;
    const dialog = refCollectionManagerDialogRegister.current;
    if (e.target == dialog) dialog.close();
  };

  useEffect(() => {
    setRefCollectionManagerDialogRegister(refCollectionManagerDialogRegister);
  }, []);

  useEffect(() => {
    if (!refCollectionManagerDialogRegister?.current) return;
    const dialog = refCollectionManagerDialogRegister.current;
    dialog.addEventListener('click', handleClickOutside);
    return () => dialog.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <dialog
      className="min-w-fit select-none rounded-lg backdrop:bg-dark-4 backdrop:opacity-75 dark:bg-dark-3"
      ref={refCollectionManagerDialogRegister}
    >
      <div className="flex max-h-[calc(100vh-80px)] w-full flex-row gap-5 overflow-clip rounded-lg border p-5 dark:border-dark-1 dark:bg-dark-3">
        <div className="flex w-full min-w-[320px] max-w-xs flex-col gap-2.5 dark:text-light-4">
          <div className="flex flex-col">
            <h2 className="whitespace-nowrap text-lg">Collection registration explained</h2>
            <p className="text-xs italic">
              See our documentation for more info: <a className="text-accent">Add link</a>
            </p>
          </div>
          <div className="h-[1px] w-full dark:bg-dark-1"></div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">When you click the &quot;Register button&quot; button...</p>
          </div>
        </div>
        <div className="w-[1px] shrink-0 dark:bg-dark-1"></div>
        <div className="flex w-full max-w-xs flex-row items-center justify-center">
          <form
            method="dialog"
            className="flex w-full min-w-[320px] flex-col gap-2.5 text-light-4"
          >
            <h2 className="text-lg">Register a collection</h2>
            <div className="h-[1px] w-full dark:bg-dark-1"></div>
            <section className="flex flex-row items-center justify-between gap-2.5">
              <div className="flex max-w-[calc(100%-90px)] flex-col">
                <label className="w-full">Collection path</label>
                <p className="break-words text-xs text-accent">{collectionPath}</p>
                <p className="break-words text-xs italic text-error">{errorMessagePath}</p>
              </div>
              <button
                className="h-9 w-20 rounded-md p-1 dark:bg-dark-2 dark:hover:bg-dark-1"
                onClick={handleButtonClickBrowse}
                type="button"
                title="Browse Files"
              >
                Browse
              </button>
            </section>
            <div className="h-[1px] w-full dark:bg-dark-1"></div>
            <div className="flex flex-row gap-2">
              <button
                className="min-w-20 h-9 grow basis-1/2 rounded-md p-1 dark:bg-dark-2 dark:hover:bg-dark-1"
                onClick={handleButtonClickGoBack}
                type="button"
                title="Go back"
              >
                Go back
              </button>
              <button
                className="min-w-20 h-9 grow basis-1/2 rounded-md bg-accent p-1 hover:bg-accent-light"
                onClick={handleButtonClickRegister}
                type="button"
                title="Register Collection"
              >
                Register
              </button>
            </div>
            <p className="break-words text-sm italic text-error">{errorMessageRegister}</p>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CollectionManagerDialogRegister;
