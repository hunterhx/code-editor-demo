import useAppStore from '../stores/useAppStore';
import SidebarRight from './SidebarRight';
import TitleBarBufferRight from './TitleBarBufferRight';
import TitleBarSidebarRightButton from './TitleBarSidebarRightButton';
import React, { useEffect, useRef } from 'react';

const MainWindowRight = () => {
  const isSidebarRightActive = useAppStore((store) => store.isSidebarRightActive);
  const setRefMainWindowRight = useAppStore((store) => store.setRefMainWindowRight);
  const refMainWindowRight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefMainWindowRight(refMainWindowRight);
  }, []);

  if (!isSidebarRightActive) return <div ref={refMainWindowRight}></div>;
  return (
    <div
      className="flex w-[320px] flex-col"
      ref={refMainWindowRight}
    >
      <div className="flex h-10 flex-row">
        <TitleBarBufferRight />
        <TitleBarSidebarRightButton />
      </div>
      <SidebarRight />
    </div>
  );
};

export default MainWindowRight;
