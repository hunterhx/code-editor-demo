import useAppStore from '../stores/useAppStore';
import ActivityBarAlternate from './ActivityBarAlternate';
import EditorPane from './EditorPane';
import TitleBarSidebarRightButtonAlternate from './TitleBarSidebarRightButtonAlternate';
import TitleBarStoplightsAlternate from './TitleBarStoplightsAlternate';
import TitleBarTabs from './TitleBarTabs';
import React, { useEffect, useRef } from 'react';

const MainWindowMiddle = () => {
  const setRefMainWindowMiddle = useAppStore((store) => store.setRefMainWindowMiddle);
  const refMainWindowMiddle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefMainWindowMiddle(refMainWindowMiddle);
  }, []);

  return (
    <div
      className="flex grow flex-col"
      ref={refMainWindowMiddle}
    >
      <div className="flex h-10 flex-row">
        <TitleBarStoplightsAlternate />
        <TitleBarTabs />
        <TitleBarSidebarRightButtonAlternate />
      </div>
      <div className="flex grow flex-row">
        <ActivityBarAlternate />
        <EditorPane />
      </div>
    </div>
  );
};

export default MainWindowMiddle;
