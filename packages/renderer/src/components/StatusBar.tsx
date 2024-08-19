import useAppStore from '../stores/useAppStore';
import React from 'react';

const StatusBar = () => {
  const isStatusBarActive = useAppStore((state) => state.isStatusBarActive);

  if (!isStatusBarActive) return <div></div>;
  return (
    <div className="h-5 border-t border-red-500">
      <p className="text-xs">StatusBar</p>
    </div>
  );
};

export default StatusBar;
