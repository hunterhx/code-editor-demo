import useAppStore from '../stores/useAppStore';
import type { TreeNode } from '../stores/useAppStore';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  path: string;
  name: string;
  isDirectory: boolean;
  childNodes: TreeNode[];
};

// background color for files should remain the "active" color if active tab contains this file (outline == none)

const SidebarModuleFilesItem = ({ path, name, isDirectory, childNodes }: Props) => {
  const setRefActiveFileExplorerItem = useAppStore((store) => store.setRefActiveFileExplorerItem);
  const filesModuleCollapseAllState = useAppStore((store) => store.filesModuleCollapseAllState);
  const setFilesModuleCollapseAllState = useAppStore(
    (store) => store.setFilesModuleCollapseAllState,
  );
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [itemName, setItemName] = useState(name);
  const [itemNameNew, setItemNameNew] = useState(itemName);
  const [errorMessage, setErrorMessage] = useState('');
  const refItem = useRef<HTMLDivElement>(null);
  const refItemButton = useRef<HTMLButtonElement>(null);
  const refItemInput = useRef<HTMLInputElement>(null);
  const refItemInputParent = useRef<HTMLDivElement>(null);
  const refIsNameValid = useRef(true);

  const handleClickOutsideItemButton = (e: MouseEvent) => {
    if (!refItemButton?.current) return;
    if (refItemButton.current.contains(e.target as HTMLElement)) return setIsActive(true);
    setIsActive(false);
  };

  const handleClickOutsideItemInput = async (e: MouseEvent) => {
    if (!refItemInput?.current) return;
    if (refItemInput.current.contains(e.target as HTMLElement)) return setIsRenaming(true);
    setIsRenaming(false);
    setErrorMessage('');
    if (!refIsNameValid.current) {
      setItemNameNew(itemName);
      refIsNameValid.current = true;
    } else {
      await window.electronAPI.renameItem(path, itemName, itemNameNew);
      setItemName(itemNameNew);
    }
    if (!refItemInputParent?.current) return;
    if (refItemInputParent.current.contains(e.target as HTMLElement)) return setIsActive(true);
    setIsActive(false);
  };

  const handleClickButton = () => {
    setIsActive(true);
    if (!isDirectory) return;
    if (filesModuleCollapseAllState == null) return setIsCollapsed(!isCollapsed);
    setIsCollapsed(!filesModuleCollapseAllState);
    setFilesModuleCollapseAllState(null);
  };

  const handleContextMenuButton = async () => {
    if (isDirectory)
      return await window.electronAPI.showSidebarModuleFilesDirectoryItemButtonMenu();
    await window.electronAPI.showSidebarModuleFilesFileItemButtonMenu();
  };

  const handleContextMenuInput = async () => {
    if (isDirectory) return await window.electronAPI.showSidebarModuleFilesDirectoryItemInputMenu();
    await window.electronAPI.showSidebarModuleFilesFileItemInputMenu();
  };

  const handleKeyDownButton = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key != 'Enter') return;
    setIsRenaming(true);
  };

  const handleKeyDownInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Escape') {
      e.preventDefault();
      setIsRenaming(false);
      setErrorMessage('');
      setItemNameNew(itemName);
    }
    if (e.key != 'Enter') return;
    e.preventDefault();
    setIsRenaming(false);
    setErrorMessage('');
    if (!refIsNameValid.current) {
      setItemNameNew(itemName);
      return (refIsNameValid.current = true);
    }
    await window.electronAPI.renameItem(path, itemName, itemNameNew);
    setItemName(itemNameNew);
  };

  const handleInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;
    setItemNameNew(newName);
    await validateItemName(newName);
  };

  const validateItemName = async (nameToValidate: string) => {
    // Reset to false by default, then change to true if passes validation
    refIsNameValid.current = false;

    // Name == original name (no need to rename, so we "skip" it with a blank error message)
    if (nameToValidate == itemName) return setErrorMessage('');

    // Empty name
    if (!nameToValidate) return setErrorMessage("Name can't be empty!");

    // Regex check
    // https://stackoverflow.com/questions/13122492/regular-expression-for-valid-folder-name-c-windows
    const validNameRegex =
      /^(?!(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.[^.]*)?$)[^<>:"/\\|?*\x00-\x1F]*[^<>:"/\\|?*\x00-\x1F\s.]$/;
    const isValidName = validNameRegex.test(nameToValidate);
    if (!isValidName) return setErrorMessage('Invalid name!');

    // Name already used at location
    const isPathAvailable = await window.electronAPI.checkPathAvailable(path, nameToValidate);
    if (!isPathAvailable)
      return setErrorMessage('Folder with this name already exists at this location!');

    // Pass validation
    setErrorMessage('');
    refIsNameValid.current = true;
  };

  const getItemIcon = () => {
    if (!isDirectory) return '📄';
    if (filesModuleCollapseAllState == null) return isCollapsed ? '📁' : '📂';
    return filesModuleCollapseAllState ? '📁' : '📂';
  };

  // Update local collapse state from global collapse state
  useEffect(() => {
    if (!isDirectory) return;
    if (filesModuleCollapseAllState == null) return;
    setIsCollapsed(filesModuleCollapseAllState);
  }, [filesModuleCollapseAllState]);

  // Focus item if active and if not renaming
  useEffect(() => {
    if (!refItemButton?.current) return;
    if (!isActive || isRenaming) return;
    refItemButton.current.focus();
  }, [isActive, isRenaming, refItemButton]);

  // Click outside button listener
  useEffect(() => {
    if (!refItemButton?.current) return;
    if (!isActive) return;
    document.addEventListener('click', handleClickOutsideItemButton);
    document.addEventListener('contextmenu', handleClickOutsideItemButton);
    return () => {
      document.removeEventListener('click', handleClickOutsideItemButton);
      document.removeEventListener('contextmenu', handleClickOutsideItemButton);
    };
  }, [refItemButton, isActive]);

  // Click outside input listener
  useEffect(() => {
    if (!refItemInput?.current) return;
    if (!isRenaming) return;
    document.addEventListener('click', handleClickOutsideItemInput);
    document.addEventListener('contextmenu', handleClickOutsideItemInput);
    return () => {
      document.removeEventListener('click', handleClickOutsideItemInput);
      document.removeEventListener('contextmenu', handleClickOutsideItemInput);
    };
  }, [refItemInput, isRenaming]);

  useEffect(() => {
    if (isActive) {
      setRefActiveFileExplorerItem(refItem);
      console.log('setting ref');
    } else {
      setRefActiveFileExplorerItem(null);
      console.log('unsetting ref');
    }
  }, [isActive]);

  return (
    <div
      className="relative flex w-full flex-col items-start justify-start"
      ref={refItem}
    >
      {errorMessage && (
        <div className="absolute top-[26px] z-10 flex h-min w-full flex-row items-center justify-center rounded-md">
          <div className="rounded-md border border-error bg-error-dark px-1.5 py-0.5 text-center text-sm text-light-1">
            {errorMessage}
          </div>
        </div>
      )}
      {isRenaming ? (
        <div
          className="flex h-min w-full flex-row items-center justify-start rounded-md border border-dark-2 text-left text-sm dark:bg-dark-2 dark:text-light-4"
          ref={refItemInputParent}
        >
          <div className="flex w-full flex-row items-center justify-start gap-1 px-1.5 py-0.5">
            <p className="text-sm">{getItemIcon()}</p>
            <input
              autoFocus
              className="w-full truncate rounded-md px-0.5 outline outline-accent dark:bg-dark-2"
              onChange={handleInputChange}
              onContextMenu={handleContextMenuInput}
              onKeyDown={handleKeyDownInput}
              ref={refItemInput}
              type="text"
              value={itemNameNew}
            ></input>
          </div>
        </div>
      ) : (
        <button
          className={`box-border flex h-min w-full flex-row items-center justify-start rounded-md border text-left text-sm outline-none dark:text-light-4 dark:hover:bg-dark-2 ${
            isActive ? 'border-accent dark:bg-dark-2' : 'border-dark-3 dark:bg-dark-3'
          }`}
          onClick={handleClickButton}
          onContextMenu={handleContextMenuButton}
          onKeyDown={handleKeyDownButton}
          ref={refItemButton}
          tabIndex={-1}
        >
          <div className="flex w-full flex-row items-center justify-start gap-1 px-1.5 py-0.5">
            <p className="text-sm">{getItemIcon()}</p>
            <p className="truncate">{itemName}</p>
          </div>
        </button>
      )}
      {isDirectory && childNodes && (filesModuleCollapseAllState == false || !isCollapsed) && (
        <div className="flex w-full flex-row">
          <div className="ml-2 h-full w-px shrink-0 bg-dark-1"></div>
          <div className="flex w-[calc(100%-9px)] flex-col pl-1">
            {childNodes
              .sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.path.localeCompare(b.path);
              })
              .map((child) => {
                return (
                  <SidebarModuleFilesItem
                    key={child.path}
                    path={child.path}
                    name={child.name}
                    isDirectory={child.isDirectory}
                    childNodes={child.children}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarModuleFilesItem;
