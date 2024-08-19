import useAppStore from '../stores/useAppStore';
import TitleBarStoplights from './TitleBarStoplights';
import React from 'react';

const TitleBarStoplightsAlternate = () => {
  const isSidebarLeftActive = useAppStore((store) => store.isSidebarLeftActive);

  if (isSidebarLeftActive) return <div></div>;
  return <TitleBarStoplights />;
};

export default TitleBarStoplightsAlternate;
