import useAppStore from '../stores/useAppStore';
import React, { useEffect } from 'react';

const MainWindowLeftResizer = () => {
  const isSidebarLeftActive = useAppStore((store) => store.isSidebarLeftActive);
  const refMainWindowLeft = useAppStore((state) => state.refMainWindowLeft);
  const setMainWindowLeftWidth = useAppStore((state) => state.setMainWindowLeftWidth);
  const mainWindowLeftWidthMaximumFactor = useAppStore(
    (state) => state.mainWindowLeftWidthMaximumFactor,
  );
  const mainWindowLeftWidthMinimum = useAppStore((state) => state.mainWindowLeftWidthMinimum);
  const mainWindowLeftWidthOriginal = useAppStore((state) => state.mainWindowLeftWidthOriginal);
  const setIsSidebarLeftActive = useAppStore((store) => store.setIsSidebarLeftActive);
  const activityBarWidthOriginal = useAppStore((store) => store.activityBarWidthOriginal);
  const isSidebarLeftResizing = useAppStore((store) => store.isSidebarLeftResizing);
  const setIsSidebarLeftResizing = useAppStore((store) => store.setIsSidebarLeftResizing);
  const isSidebarLeftSnapped = useAppStore((store) => store.isSidebarLeftSnapped);
  const setIsSidebarLeftSnapped = useAppStore((store) => store.setIsSidebarLeftSnapped);

  const handleMouseDown = () => {
    setIsSidebarLeftResizing(true);
  };

  const handleResize = (clientX: number) => {
    if (!refMainWindowLeft?.current) return;
    const maxWidth = window.innerWidth * mainWindowLeftWidthMaximumFactor;
    const width = refMainWindowLeft.current.offsetWidth;

    if (clientX <= mainWindowLeftWidthMinimum) {
      document.body.style.cursor = 'e-resize';
    } else {
      document.body.style.cursor = 'col-resize';
    }

    if (width <= mainWindowLeftWidthMinimum && clientX <= mainWindowLeftWidthMinimum) {
      if (clientX <= (mainWindowLeftWidthMinimum + activityBarWidthOriginal) / 2) {
        refMainWindowLeft.current.style.width = `${activityBarWidthOriginal}px`;
        setIsSidebarLeftSnapped(true);
      } else {
        refMainWindowLeft.current.style.width = `${mainWindowLeftWidthMinimum}px`;
        setIsSidebarLeftSnapped(false);
      }
    } else if (width >= maxWidth && clientX >= maxWidth) {
      refMainWindowLeft.current.style.width = `${maxWidth}px`;
      setIsSidebarLeftSnapped(false);
    } else {
      refMainWindowLeft.current.style.width = `${clientX}px`;
      setIsSidebarLeftSnapped(false);
    }

    setMainWindowLeftWidth(refMainWindowLeft.current.offsetWidth);
  };

  const handleDoubleClick = () => {
    if (!refMainWindowLeft?.current) return;
    refMainWindowLeft.current.style.width = `${mainWindowLeftWidthOriginal}px`;
    setMainWindowLeftWidth(refMainWindowLeft.current.offsetWidth);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleResize(e.clientX);

    if (isSidebarLeftResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [isSidebarLeftResizing, handleResize]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (!refMainWindowLeft?.current) return;
      if (refMainWindowLeft.current.offsetWidth <= activityBarWidthOriginal) {
        setMainWindowLeftWidth(mainWindowLeftWidthOriginal);
        setIsSidebarLeftActive(false);
        refMainWindowLeft.current.style.width = '0px';
      }
      setIsSidebarLeftResizing(false);
      setIsSidebarLeftSnapped(false);
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  });

  if (!isSidebarLeftActive) return <div></div>;
  return (
    <div className="relative h-full w-px shrink-0 cursor-col-resize dark:bg-dark-1">
      <div
        className="absolute -left-px top-0 h-full w-1 shrink-0 cursor-col-resize hover:bg-accent active:bg-accent"
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
      ></div>
      {isSidebarLeftSnapped && (
        <div className="absolute -left-px top-0 h-10 w-1 border-b dark:border-dark-1 dark:bg-dark-3"></div>
      )}
    </div>
  );
};

export default MainWindowLeftResizer;
