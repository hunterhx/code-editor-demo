import useAppStore from '../stores/useAppStore';
import React, { useEffect, useRef, useState } from 'react';

const CollectionManagerDialogCreate = () => {
  const setActiveCollectionId = useAppStore((store) => store.setActiveCollectionId);
  const setActiveCollectionName = useAppStore((store) => store.setActiveCollectionName);
  const setIsCollectionManagerOpen = useAppStore((store) => store.setIsCollectionManagerOpen);
  const setRefCollectionManagerDialogCreate = useAppStore(
    (store) => store.setRefCollectionManagerDialogCreate,
  );
  const refCollectionManagerDialogCreate = useRef<HTMLDialogElement>(null);
  const [collectionName, setCollectionName] = useState('');
  const [collectionPath, setCollectionPath] = useState('');
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessagePath, setErrorMessagePath] = useState('');
  const [errorMessageCreate, setErrorMessageCreate] = useState('');
  const refIsNameValid = useRef(false);
  const refIsPathValid = useRef(false);

  const validateCollectionName = async (name: string, path: string = collectionPath) => {
    // Reset to false by default, then change to true if passes validation
    refIsNameValid.current = false;

    // Empty name
    if (!name) return setErrorMessageName('No name specified!');

    // Regex check
    // https://stackoverflow.com/questions/13122492/regular-expression-for-valid-folder-name-c-windows
    const validNameRegex =
      /^(?!(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.[^.]*)?$)[^<>:"/\\|?*\x00-\x1F]*[^<>:"/\\|?*\x00-\x1F\s.]$/;
    const isValidName = validNameRegex.test(name);
    if (!isValidName) return setErrorMessageName('Invalid collection name!');

    // Name already used at path
    if (path) {
      const isPathAvailable = await window.electronAPI.checkCollectionPathAvailable(path, name);
      if (!isPathAvailable) {
        return setErrorMessageName('Folder with this name already exists at specified path!');
      }
    }

    // Pass validation
    setErrorMessageName('');
    refIsNameValid.current = true;
  };

  const validateCollectionPath = async (path: string) => {
    // Reset to false by default, then change to true if passes validation
    refIsPathValid.current = false;

    // Empty path
    if (!path) return setErrorMessagePath('No path selected!');

    // Revalidate name
    await validateCollectionName(collectionName, path);
    if (!refIsNameValid.current) return;

    // Pass validation
    setErrorMessagePath('');
    refIsPathValid.current = true;
  };

  const handleInputChangeCollectionName = async (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setCollectionName(name);
    await validateCollectionName(name);
  };

  const handleButtonClickBrowse = async () => {
    const browseDialogResult = await window.electronAPI.createNewCollectionSelectPathDialog();
    if (browseDialogResult.canceled) setCollectionPath('');
    const path = browseDialogResult.filePaths[0];
    setCollectionPath(path);
    await validateCollectionPath(path);
  };

  const handleButtonClickCreate = async () => {
    await validateCollectionName(collectionName);
    await validateCollectionPath(collectionPath);
    if (!refIsNameValid.current || !refIsPathValid.current) return;
    const collectionIdString = await window.electronAPI.createNewCollection(
      collectionPath,
      collectionName,
    );
    const collectionId = await JSON.parse(collectionIdString);
    if (!collectionId) return setErrorMessageCreate('Error creating collection!');
    setErrorMessageCreate('');
    setActiveCollectionId(collectionId);
    setActiveCollectionName(collectionName);
    setIsCollectionManagerOpen(false);
  };

  const handleButtonClickGoBack = () => {
    if (!refCollectionManagerDialogCreate?.current) return;
    refCollectionManagerDialogCreate.current.close();
  };

  const handleInputKeyDownCollectionName = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') e.preventDefault();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!refCollectionManagerDialogCreate?.current) return;
    const dialog = refCollectionManagerDialogCreate.current;
    if (e.target == dialog) dialog.close();
  };

  useEffect(() => {
    setRefCollectionManagerDialogCreate(refCollectionManagerDialogCreate);
  }, []);

  useEffect(() => {
    if (!refCollectionManagerDialogCreate?.current) return;
    const dialog = refCollectionManagerDialogCreate.current;
    dialog.addEventListener('click', handleClickOutside);
    return () => dialog.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <dialog
      className="min-w-fit select-none rounded-lg backdrop:bg-dark-4 backdrop:opacity-75 dark:bg-dark-3"
      ref={refCollectionManagerDialogCreate}
    >
      <div className="flex max-h-[calc(100vh-80px)] w-full flex-row gap-5 overflow-clip rounded-lg border p-5 dark:border-dark-1 dark:bg-dark-3">
        <div className="flex w-full min-w-[320px] max-w-xs flex-col gap-2.5 dark:text-light-4">
          <div className="flex flex-col">
            <h2 className="whitespace-nowrap text-lg">Collection creation explained</h2>
            <p className="text-xs italic">
              See our documentation for more info: <a className="text-accent">Add link</a>
            </p>
          </div>
          <div className="h-[1px] w-full dark:bg-dark-1"></div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              When you click the &quot;Create&quot; button, a new folder representing your
              collection is created at the path you select from the &quot;Browse&quot; button
              prompt.
            </p>
            <p className="text-sm">
              The created collection will then be registered to the internal list. You can
              switch to a different collection using the &quot;Open&quot; button on the previous
              page.
            </p>
            <p className="text-sm">
              There are some rules when naming a new collection. Please keep an eye on the tooltip
              for error messages.
            </p>
          </div>
        </div>
        <div className="w-[1px] shrink-0 dark:bg-dark-1"></div>
        <div className="flex w-full max-w-xs flex-row items-center justify-center">
          <form
            method="dialog"
            className="flex w-full min-w-[320px] flex-col gap-2.5 text-light-4"
          >
            <h2 className="text-lg">Create a new collection</h2>
            <div className="h-[1px] w-full dark:bg-dark-1"></div>
            <section className="flex flex-row items-center justify-between gap-2.5">
              <div className="flex flex-col">
                <label className="w-full">Collection name</label>
                <p className="break-words text-xs italic text-error">{errorMessageName}</p>
              </div>
              <input
                className="h-7 w-[120px] rounded-md border p-1 text-sm dark:border-dark-1 dark:bg-dark-2 dark:text-light-4"
                name="collectionName"
                onChange={handleInputChangeCollectionName}
                onKeyDown={handleInputKeyDownCollectionName}
                placeholder="collection name"
                value={collectionName}
              ></input>
            </section>
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
                title="Browse Files dialog"
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
                onClick={handleButtonClickCreate}
                type="button"
                title="Create Collection"
              >
                Create
              </button>
            </div>
            <p className="break-words text-sm italic text-error">{errorMessageCreate}</p>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CollectionManagerDialogCreate;
