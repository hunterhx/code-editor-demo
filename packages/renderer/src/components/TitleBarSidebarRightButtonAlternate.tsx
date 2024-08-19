import useAppStore from '../stores/useAppStore';
import TitleBarSidebarRightButton from './TitleBarSidebarRightButton';
import React from 'react';

const TitleBarSidebarRightButtonAlternate = () => {
  const isSidebarRightActive = useAppStore((store) => store.isSidebarRightActive);

  if (isSidebarRightActive) return <div></div>;
  return <TitleBarSidebarRightButton />;
};

export default TitleBarSidebarRightButtonAlternate;
