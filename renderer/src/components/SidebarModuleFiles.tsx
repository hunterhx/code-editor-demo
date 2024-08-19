import useAppStore from '../stores/useAppStore';
import SidebarModuleFilesItem from './SidebarModuleFilesItem';
import React, { useEffect } from 'react';

// parseFileTree and keep in state (changing object values in state won't cause re-renders?)
// When manipulating the tree, also make any corresponding calls to the actual file system

const SidebarModuleFiles = () => {
  const refActiveFileExplorerItem = useAppStore((store) => store.refActiveFileExplorerItem);
  const setFilesModuleCollapseAllState = useAppStore(
    (state) => state.setFilesModuleCollapseAllState,
  );
  const filesModuleCollapseAllState = useAppStore((store) => store.filesModuleCollapseAllState);
  const sidebarLeftModuleStates = useAppStore((state) => state.sidebarLeftModuleStates);
  const activeCollectionId = useAppStore((state) => state.activeCollectionId);
  const activeCollectionName = useAppStore((state) => state.activeCollectionName);
  const fileTree = useAppStore((state) => state.fileTree);
  const setFileTree = useAppStore((state) => state.setFileTree);

  const handleContextMenu = async () => {
    await window.electronAPI.showSidebarModuleFilesMenu();
  };

  const handleClickRefreshButton = async () => {
    console.log('refresh');
    await getCollectionFileTree();
  };

  const handleClickNewFileButton = () => {
    console.log('new file');
    // create a new file in the currently active folder (see VS Code behavior)
  };

  const handleClickNewFolderButton = () => {
    console.log('new folder');
    // create a new folder in the currently active folder (see VS Code behavior)
  };

  const handleClickCollapseButton = () => {
    if (filesModuleCollapseAllState == null) return setFilesModuleCollapseAllState(true);
    setFilesModuleCollapseAllState(!filesModuleCollapseAllState);
  };

  const getCollectionFileTree = async () => {
    if (!activeCollectionId) return;
    const activeCollectionInfoString =
      await window.electronAPI.getCollectionInfo(activeCollectionId);
    if (!activeCollectionInfoString) return;
    const activeCollectionInfo = await JSON.parse(activeCollectionInfoString);
    const fileTreeString = await window.electronAPI.getCollectionFileTree(
      activeCollectionInfo.path,
      activeCollectionInfo.name,
    );
    if (!fileTreeString) return;
    const fileTreeParsed = await JSON.parse(fileTreeString);
    setFileTree(fileTreeParsed);
  };

  useEffect(() => {
    getCollectionFileTree();
  }, [activeCollectionId]);

  useEffect(() => {
    if (!refActiveFileExplorerItem?.current) return console.log(null);
    console.log(refActiveFileExplorerItem.current);
  }, [refActiveFileExplorerItem]);

  if (!sidebarLeftModuleStates.files) return <div></div>;
  return (
    <div className="flex h-full max-h-[calc(100vh-40px)] w-full flex-col items-center justify-start gap-1.5 overflow-clip">
      <div className="flex w-full flex-col px-2 text-sm dark:text-light-4">
        <div className="flex h-8 flex-row items-center justify-between px-0.5">
          <p className="truncate">{activeCollectionName}</p>
          <div className="flex flex-row items-center justify-center gap-1">
            <button
              className="flex h-6 w-6 flex-row items-center justify-center rounded-md border dark:border-dark-1 dark:bg-dark-2 hover:dark:bg-dark-1"
              title="New File..."
              onClick={handleClickNewFileButton}
            >
              📄
            </button>
            <button
              className="flex h-6 w-6 flex-row items-center justify-center rounded-md border dark:border-dark-1 dark:bg-dark-2 hover:dark:bg-dark-1"
              title="New Folder..."
              onClick={handleClickNewFolderButton}
            >
              📁
            </button>
            <button
              className="flex h-6 w-6 flex-row items-center justify-center rounded-md border dark:border-dark-1 dark:bg-dark-2 hover:dark:bg-dark-1"
              title="Refresh"
              onClick={handleClickRefreshButton}
            >
              🔄
            </button>
            <button
              className="flex h-6 w-6 flex-row items-center justify-center rounded-md border dark:border-dark-1 dark:bg-dark-2 hover:dark:bg-dark-1"
              title="Collapse/un-collapse all"
              onClick={handleClickCollapseButton}
            >
              ↕️
            </button>
          </div>
        </div>
        <div className="h-[1px] w-full dark:bg-dark-1"></div>
      </div>
      <div
        className="flex h-full w-full flex-col items-center justify-start overflow-x-clip overflow-y-scroll px-2"
        onContextMenu={handleContextMenu}
      >
        {fileTree &&
          fileTree.children.map((child) => {
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
  );
};

export default SidebarModuleFiles;
