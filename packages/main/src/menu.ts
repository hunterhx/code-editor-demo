import { Menu, MenuItemConstructorOptions } from 'electron';

const isMac = process.platform === 'darwin';

export const showCollectionMangerCollectionItemMenu = () => {
  const templateMac = [
    { label: 'Move...' },
    { label: 'Rename...' },
    { label: 'De-register' },
    { label: 'Reveal in Finder' },
  ] as MenuItemConstructorOptions[];
  const templateWindows = [
    { label: 'Move...' },
    { label: 'Rename...' },
    { label: 'De-register collection' },
    { label: 'View collection in Explorer' },
  ] as MenuItemConstructorOptions[];
  const template = isMac ? templateMac : templateWindows;
  const menu = Menu.buildFromTemplate(template);
  menu.popup();
};

export const showSidebarModuleFilesDirectoryItemButtonMenu = () => {
  const templateMac = [
    { label: 'New File...' },
    { label: 'New Folder...' },
    { label: 'Reveal in Finder' },
    { type: 'separator' },
    { label: 'Cut' },
    { label: 'Copy' },
    { label: 'Paste' },
    { type: 'separator' },
    { label: 'Copy Path' },
    { label: 'Copy Relative Path' },
    { type: 'separator' },
    { label: 'Rename...' },
    { label: 'Delete' },
  ] as MenuItemConstructorOptions[];
  const templateWindows = [] as MenuItemConstructorOptions[];
  const template = isMac ? templateMac : templateWindows;
  const menu = Menu.buildFromTemplate(template);
  menu.popup();
};

export const showSidebarModuleFilesDirectoryItemInputMenu = () => {
  const templateMac = [
    { label: 'Undo' },
    { label: 'Redo' },
    { type: 'separator' },
    { label: 'Cut' },
    { label: 'Copy' },
    { label: 'Paste' },
    { type: 'separator' },
    { label: 'Select All' },
  ] as MenuItemConstructorOptions[];
  const templateWindows = [] as MenuItemConstructorOptions[];
  const template = isMac ? templateMac : templateWindows;
  const menu = Menu.buildFromTemplate(template);
  menu.popup();
};

export const showSidebarModuleFilesFileItemButtonMenu = () => {
  const templateMac = [
    { label: 'Open With...' },
    { label: 'Reveal in Finder' },
    { type: 'separator' },
    { label: 'Cut' },
    { label: 'Copy' },
    { type: 'separator' },
    { label: 'Copy Path' },
    { label: 'Copy Relative Path' },
    { type: 'separator' },
    { label: 'Rename...' },
    { label: 'Delete' },
  ] as MenuItemConstructorOptions[];
  const templateWindows = [] as MenuItemConstructorOptions[];
  const template = isMac ? templateMac : templateWindows;
  const menu = Menu.buildFromTemplate(template);
  menu.popup();
};

export const showSidebarModuleFilesFileItemInputMenu = () => {
  const templateMac = [
    { label: 'Undo' },
    { label: 'Redo' },
    { type: 'separator' },
    { label: 'Cut' },
    { label: 'Copy' },
    { label: 'Paste' },
    { type: 'separator' },
    { label: 'Select All' },
  ] as MenuItemConstructorOptions[];
  const templateWindows = [] as MenuItemConstructorOptions[];
  const template = isMac ? templateMac : templateWindows;
  const menu = Menu.buildFromTemplate(template);
  menu.popup();
};

export const showSidebarModuleFilesMenu = () => {
  const templateMac = [
    { label: 'New File...' },
    { label: 'New Folder...' },
    { label: 'Reveal in Finder' },
    { type: 'separator' },
    { label: 'Copy Path' },
    { label: 'Copy Relative Path' },
  ] as MenuItemConstructorOptions[];
  const templateWindows = [] as MenuItemConstructorOptions[];
  const template = isMac ? templateMac : templateWindows;
  const menu = Menu.buildFromTemplate(template);
  menu.popup();
};

export * as menu from './menu';
