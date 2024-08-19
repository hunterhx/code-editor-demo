import useAppStore from '../stores/useAppStore';
import React, { useEffect } from 'react';

const MainWindowRightResizer = () => {
  const isSidebarRightActive = useAppStore((store) => store.isSidebarRightActive);
  const refMainWindowRight = useAppStore((state) => state.refMainWindowRight);
  const setMainWindowRightWidth = useAppStore((state) => state.setMainWindowRightWidth);
  const mainWindowRightWidthMaximumFactor = useAppStore(
    (state) => state.mainWindowRightWidthMaximumFactor,
  );
  const mainWindowRightWidthMinimum = useAppStore((state) => state.mainWindowRightWidthMinimum);
  const mainWindowRightWidthOriginal = useAppStore((state) => state.mainWindowRightWidthOriginal);
  const setIsSidebarRightActive = useAppStore((state) => state.setIsSidebarRightActive);
  const isSidebarRightResizing = useAppStore((store) => store.isSidebarRightResizing);
  const setIsSidebarRightResizing = useAppStore((store) => store.setIsSidebarRightResizing);
  const isSidebarRightSnapped = useAppStore((store) => store.isSidebarRightSnapped);
  const setIsSidebarRightSnapped = useAppStore((store) => store.setIsSidebarRightSnapped);

  const handleMouseDown = () => {
    setIsSidebarRightResizing(true);
  };

  const handleResize = (clientX: number) => {
    if (!refMainWindowRight?.current) return;
    const maxWidth = window.innerWidth * mainWindowRightWidthMaximumFactor;
    const width = refMainWindowRight.current.offsetWidth;
    const clientWidth = window.innerWidth - clientX;

    if (clientX >= window.innerWidth - mainWindowRightWidthMinimum) {
      document.body.style.cursor = 'w-resize';
    } else {
      document.body.style.cursor = 'col-resize';
    }

    if (width <= mainWindowRightWidthMinimum && clientWidth <= mainWindowRightWidthMinimum) {
      if (clientX >= window.innerWidth - mainWindowRightWidthMinimum / 2) {
        refMainWindowRight.current.style.width = '0px';
        setIsSidebarRightSnapped(true);
      } else {
        refMainWindowRight.current.style.width = `${mainWindowRightWidthMinimum}px`;
        setIsSidebarRightSnapped(false);
      }
    } else if (width >= maxWidth && clientWidth >= maxWidth) {
      refMainWindowRight.current.style.width = `${maxWidth}px`;
      setIsSidebarRightSnapped(false);
    } else {
      refMainWindowRight.current.style.width = `${clientWidth}px`;
      setIsSidebarRightSnapped(false);
    }

    setMainWindowRightWidth(refMainWindowRight.current.offsetWidth);
  };

  const handleDoubleClick = () => {
    if (!refMainWindowRight?.current) return;
    refMainWindowRight.current.style.width = `${mainWindowRightWidthOriginal}px`;
    setMainWindowRightWidth(refMainWindowRight.current.offsetWidth);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleResize(e.clientX);

    if (isSidebarRightResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [isSidebarRightResizing, handleResize]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (!refMainWindowRight?.current) return;
      if (refMainWindowRight.current.offsetWidth <= 0) {
        setMainWindowRightWidth(mainWindowRightWidthOriginal);
        setIsSidebarRightActive(false);
        refMainWindowRight.current.style.width = '0px';
      }
      setIsSidebarRightResizing(false);
      setIsSidebarRightSnapped(false);
    };
    window.addEventListener('mouseup', handleMouseUp);

    return () => window.removeEventListener('mouseup', handleMouseUp);
  });

  if (!isSidebarRightActive) return <div></div>;
  return (
    <div className="relative h-full w-px shrink-0 cursor-col-resize dark:bg-dark-1">
      <div
        className="absolute -left-px top-0 h-full w-1 shrink-0 cursor-col-resize hover:bg-accent active:bg-accent"
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
      ></div>
      {isSidebarRightSnapped && (
        <div className="absolute -left-px top-0 h-10 w-1 border-b dark:border-dark-1 dark:bg-dark-3"></div>
      )}
    </div>
  );
};

export default MainWindowRightResizer;
