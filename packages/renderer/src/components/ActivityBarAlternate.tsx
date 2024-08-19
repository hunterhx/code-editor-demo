import useAppStore from '../stores/useAppStore';
import ActivityBar from './ActivityBar';
import React from 'react';

const ActivityBarAlternate = () => {
  const isSidebarLeftActive = useAppStore((store) => store.isSidebarLeftActive);

  if (isSidebarLeftActive) return <div></div>;
  return <ActivityBar />;
};

export default ActivityBarAlternate;
