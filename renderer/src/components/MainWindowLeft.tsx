import useAppStore from '../stores/useAppStore';
import ActivityBar from './ActivityBar';
import SidebarLeft from './SidebarLeft';
import TitleBarBufferLeft from './TitleBarBufferLeft';
import TitleBarStoplights from './TitleBarStoplights';
import React, { useEffect, useRef } from 'react';

const MainWindowLeft = () => {
  const isSidebarLeftActive = useAppStore((store) => store.isSidebarLeftActive);
  const setRefMainWindowLeft = useAppStore((store) => store.setRefMainWindowLeft);
  const refMainWindowLeft = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefMainWindowLeft(refMainWindowLeft);
  });

  if (!isSidebarLeftActive) return <div ref={refMainWindowLeft}></div>;
  return (
    <div
      className="flex w-[368px] flex-col"
      ref={refMainWindowLeft}
    >
      <div className="flex h-10 flex-row">
        <TitleBarStoplights />
        <TitleBarBufferLeft />
      </div>
      <div className="flex grow flex-row">
        <ActivityBar />
        <SidebarLeft />
      </div>
    </div>
  );
};

export default MainWindowLeft;
