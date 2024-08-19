import CollectionManagerWindow from './components/CollectionManagerWindow';
import MainWindow from './components/MainWindow';
import useAppStore from './stores/useAppStore';
import React, { useEffect } from 'react';

// Fix focus & active highlighting for all elements
// in file explorer, on hover, display full div like in Steam's library view
// Files module arrow keys to navigate
// Files module context menu functionality
// files module buttons functionality
// Optimize collapse/uncollapse all performance => https://youtu.be/nS5qbSJLGx8?si=dUu0bSpmHRFY3RJ5 why is Obsidian so much faster?
// https://stackoverflow.com/questions/65021339/react-render-recursively-is-very-slow-for-many-levels-is-parallelism-available
// General React optimizations in entire app

const App = () => {
  const isCollectionManagerOpen = useAppStore((store) => store.isCollectionManagerOpen);
  const setIsCollectionManagerOpen = useAppStore((store) => store.setIsCollectionManagerOpen);
  const activeCollectionId = useAppStore((store) => store.activeCollectionId);
  const setActiveCollectionId = useAppStore((store) => store.setActiveCollectionId);
  const setActiveCollectionName = useAppStore((store) => store.setActiveCollectionName);

  const updateActiveCollectionId = async () => {
    if (!activeCollectionId) return;
    await window.electronAPI.setActiveCollectionId(activeCollectionId);
  };

  const setInitialActiveCollectionInfo = async () => {
    const activeCollectionIdMainString = await window.electronAPI.getActiveCollectionId();
    const activeCollectionIdMain = JSON.parse(activeCollectionIdMainString);
    if (!activeCollectionIdMain) {
      setIsCollectionManagerOpen(true);
      return;
    }
    setIsCollectionManagerOpen(false);
    const activeCollectionInfoString =
      await window.electronAPI.getCollectionInfo(activeCollectionIdMain);
    const activeCollectionInfo = JSON.parse(activeCollectionInfoString);
    setActiveCollectionId(activeCollectionIdMain);
    setActiveCollectionName(activeCollectionInfo.name);
  };

  useEffect(() => {
    setInitialActiveCollectionInfo();
  }, []);

  useEffect(() => {
    updateActiveCollectionId();
  }, [activeCollectionId]);

  return (
    <div className="h-screen">
      {isCollectionManagerOpen && <CollectionManagerWindow />}
      {!isCollectionManagerOpen && <MainWindow />}
    </div>
  );
};

export default App;
