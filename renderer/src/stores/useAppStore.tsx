// https://github.com/pmndrs/zustand#typescript-usage
// https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md
// https://github.com/pmndrs/zustand/blob/main/docs/guides/flux-inspired-practice.md
import React from 'react';
import { create } from 'zustand';

export const MAIN_WINDOW_LEFT_WIDTH_ORIGINAL_PX = 368;
export const MAIN_WINDOW_LEFT_WIDTH_MINIMUM_PX = 200;
export const MAIN_WINDOW_LEFT_WIDTH_FACTOR_PERCENT = 0.75;
export const MAIN_WINDOW_RIGHT_WIDTH_ORIGINAL_PX = 320;
export const MAIN_WINDOW_RIGHT_WIDTH_MINIMUM_PX = 200;
export const MAIN_WINDOW_RIGHT_WIDTH_FACTOR_PERCENT = 0.75;
export const ACTIVITY_BAR_WIDTH_ORIGINAL_PX = 48;

export type SideBarLeftModuleStates = {
  files: boolean;
  search: boolean;
};

export type TreeNode = {
  path: string;
  name: string;
  isDirectory: boolean;
  children: TreeNode[];
};

interface AppState {
  isSidebarLeftActive: boolean;
  setIsSidebarLeftActive: (value: boolean) => void;
  isSidebarRightActive: boolean;
  setIsSidebarRightActive: (value: boolean) => void;
  isStatusBarActive: boolean;
  setIsStatusBarActive: (value: boolean) => void;
  sidebarLeftModuleStates: SideBarLeftModuleStates;
  setSidebarLeftModuleStates: (obj: SideBarLeftModuleStates) => void;
  refMainWindowLeft: React.RefObject<HTMLDivElement> | null;
  setRefMainWindowLeft: (obj: React.RefObject<HTMLDivElement> | null) => void;
  refMainWindowRight: React.RefObject<HTMLDivElement> | null;
  setRefMainWindowRight: (obj: React.RefObject<HTMLDivElement> | null) => void;
  refMainWindowMiddle: React.RefObject<HTMLDivElement> | null;
  setRefMainWindowMiddle: (obj: React.RefObject<HTMLDivElement> | null) => void;
  mainWindowLeftWidth: number;
  setMainWindowLeftWidth: (value: number) => void;
  mainWindowRightWidth: number;
  setMainWindowRightWidth: (value: number) => void;
  mainWindowLeftWidthOriginal: number;
  mainWindowLeftWidthMaximumFactor: number;
  mainWindowLeftWidthMinimum: number;
  mainWindowRightWidthOriginal: number;
  mainWindowRightWidthMaximumFactor: number;
  mainWindowRightWidthMinimum: number;
  activityBarWidthOriginal: number;
  refCollectionManagerDialogCreate: React.RefObject<HTMLDialogElement> | null;
  setRefCollectionManagerDialogCreate: (obj: React.RefObject<HTMLDialogElement> | null) => void;
  refCollectionManagerDialogOpen: React.RefObject<HTMLDialogElement> | null;
  setRefCollectionManagerDialogOpen: (obj: React.RefObject<HTMLDialogElement> | null) => void;
  refCollectionManagerDialogRegister: React.RefObject<HTMLDialogElement> | null;
  setRefCollectionManagerDialogRegister: (obj: React.RefObject<HTMLDialogElement> | null) => void;
  activeCollectionId: string;
  setActiveCollectionId: (id: string) => void;
  activeCollectionName: string;
  setActiveCollectionName: (name: string) => void;
  isCollectionManagerOpen: boolean;
  setIsCollectionManagerOpen: (value: boolean) => void;
  fileTree: TreeNode | null;
  setFileTree: (node: TreeNode) => void;
  isSidebarLeftResizing: boolean;
  setIsSidebarLeftResizing: (value: boolean) => void;
  isSidebarRightResizing: boolean;
  setIsSidebarRightResizing: (value: boolean) => void;
  isSidebarLeftSnapped: boolean;
  setIsSidebarLeftSnapped: (value: boolean) => void;
  isSidebarRightSnapped: boolean;
  setIsSidebarRightSnapped: (value: boolean) => void;
  filesModuleCollapseAllState: boolean | null; // true for all collapsed, false for all uncollapsed, null for neither
  setFilesModuleCollapseAllState: (value: boolean | null) => void;
  refActiveFileExplorerItem: React.RefObject<HTMLDivElement> | null;
  setRefActiveFileExplorerItem: (obj: React.RefObject<HTMLDivElement> | null) => void;
}

const useAppStore = create<AppState>((set) => ({
  isSidebarLeftActive: true,
  setIsSidebarLeftActive: (value) => set(() => ({ isSidebarLeftActive: value })),
  isSidebarRightActive: false,
  setIsSidebarRightActive: (value) => set(() => ({ isSidebarRightActive: value })),
  isStatusBarActive: false,
  setIsStatusBarActive: (value) => set(() => ({ isStatusBarActive: value })),
  sidebarLeftModuleStates: { files: true, search: false },
  setSidebarLeftModuleStates: (obj) => set(() => ({ sidebarLeftModuleStates: obj })),
  refMainWindowLeft: null,
  setRefMainWindowLeft: (obj) => set({ refMainWindowLeft: obj }),
  refMainWindowRight: null,
  setRefMainWindowRight: (obj) => set({ refMainWindowRight: obj }),
  refMainWindowMiddle: null,
  setRefMainWindowMiddle: (obj) => set({ refMainWindowMiddle: obj }),
  mainWindowLeftWidth: MAIN_WINDOW_LEFT_WIDTH_ORIGINAL_PX,
  setMainWindowLeftWidth: (value) => set({ mainWindowLeftWidth: value }),
  mainWindowRightWidth: MAIN_WINDOW_RIGHT_WIDTH_ORIGINAL_PX,
  setMainWindowRightWidth: (value) => set({ mainWindowRightWidth: value }),
  mainWindowLeftWidthOriginal: MAIN_WINDOW_LEFT_WIDTH_ORIGINAL_PX,
  mainWindowLeftWidthMaximumFactor: MAIN_WINDOW_LEFT_WIDTH_FACTOR_PERCENT,
  mainWindowLeftWidthMinimum: MAIN_WINDOW_LEFT_WIDTH_MINIMUM_PX,
  mainWindowRightWidthOriginal: MAIN_WINDOW_RIGHT_WIDTH_ORIGINAL_PX,
  mainWindowRightWidthMaximumFactor: MAIN_WINDOW_RIGHT_WIDTH_FACTOR_PERCENT,
  mainWindowRightWidthMinimum: MAIN_WINDOW_RIGHT_WIDTH_MINIMUM_PX,
  activityBarWidthOriginal: ACTIVITY_BAR_WIDTH_ORIGINAL_PX,
  refCollectionManagerDialogCreate: null,
  setRefCollectionManagerDialogCreate: (obj) => set({ refCollectionManagerDialogCreate: obj }),
  refCollectionManagerDialogOpen: null,
  setRefCollectionManagerDialogOpen: (obj) => set({ refCollectionManagerDialogOpen: obj }),
  refCollectionManagerDialogRegister: null,
  setRefCollectionManagerDialogRegister: (obj) => set({ refCollectionManagerDialogRegister: obj }),
  activeCollectionId: '',
  setActiveCollectionId: (id) => set({ activeCollectionId: id }),
  activeCollectionName: '',
  setActiveCollectionName: (name) => set({ activeCollectionName: name }),
  isCollectionManagerOpen: false,
  setIsCollectionManagerOpen: (value) => set({ isCollectionManagerOpen: value }),
  fileTree: null,
  setFileTree: (node) => set({ fileTree: node }),
  isSidebarLeftResizing: false,
  setIsSidebarLeftResizing: (value) => set({ isSidebarLeftResizing: value }),
  isSidebarRightResizing: false,
  setIsSidebarRightResizing: (value) => set({ isSidebarRightResizing: value }),
  isSidebarLeftSnapped: false,
  setIsSidebarLeftSnapped: (value) => set({ isSidebarLeftSnapped: value }),
  isSidebarRightSnapped: false,
  setIsSidebarRightSnapped: (value) => set({ isSidebarRightSnapped: value }),
  filesModuleCollapseAllState: true,
  setFilesModuleCollapseAllState: (value) => set({ filesModuleCollapseAllState: value }),
  refActiveFileExplorerItem: null,
  setRefActiveFileExplorerItem: (obj) => set({ refActiveFileExplorerItem: obj }),
}));

export default useAppStore;
