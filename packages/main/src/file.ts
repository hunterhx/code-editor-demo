import { randomUUID } from 'crypto';
import { IpcMainInvokeEvent, app } from 'electron';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { basename, dirname, join } from 'path';

const appName = 'mvp';
const appSettingsDirPath = join(app.getPath('appData'), appName);
const appSettingsFilePath = join(appSettingsDirPath, `${appName}.json`);

class TreeNode {
  path: string;
  name: string;
  isDirectory: boolean;
  children: TreeNode[];
  constructor(path: string, name: string, isDirectory: boolean) {
    this.path = path;
    this.name = name;
    this.isDirectory = isDirectory;
    this.children = [];
  }
}

type CollectionList = {
  [key: string]: Collection;
};

type Collection = {
  name: string;
  path: string;
};

export const generateCollectionId = async (collectionList: CollectionList) => {
  let id = '';
  let isAvailable = false;
  while (!isAvailable) {
    id = randomUUID();
    if (!collectionList.id) isAvailable = true;
  }
  return id;
};

export const checkCollectionPathAvailable = async (
  _event: IpcMainInvokeEvent,
  path: string,
  name?: string,
) => {
  const appSettingsString = await getAppSettings();
  const appSettings = await JSON.parse(appSettingsString);
  const collectionList = appSettings.collections;
  let collectionFolderPath = path;
  if (name) collectionFolderPath = join(path, name);
  for (const key in collectionList) {
    if (collectionList[key].path == collectionFolderPath) return false;
  }
  const contents = await fsPromises.readdir(path, { withFileTypes: true });
  const contentsFiltered = contents.filter((item) => item.isDirectory() && item.name == name);
  if (contentsFiltered.length > 0) return false;
  return true;
};

export const createNewCollection = async (
  _event: IpcMainInvokeEvent,
  path: string,
  name?: string,
) => {
  const appSettingsString = await getAppSettings();
  const appSettings = await JSON.parse(appSettingsString);
  const id = await generateCollectionId(appSettings.collections);
  let collectionFolderPath = '';
  if (!name) {
    name = basename(path);
    collectionFolderPath = path;
  } else {
    collectionFolderPath = join(path, name);
  }
  await initializeCollectionFolder(collectionFolderPath);
  appSettings.activeCollectionId = id;
  appSettings.collections[id] = { name, path: collectionFolderPath };
  await setAppSettings(JSON.stringify(appSettings));
  return JSON.stringify(appSettings.activeCollectionId);
};

export const initializeCollectionFolder = async (collectionPath: string) => {
  const collectionfolderPath = join(collectionPath, `.${appName}`);
  const collectionSettingsFilePath = join(collectionfolderPath, 'settings.json');
  const collectionSettingsExist = fs.existsSync(collectionSettingsFilePath);
  if (collectionSettingsExist) return;
  await fsPromises.mkdir(collectionfolderPath, { recursive: true });
  await fsPromises.writeFile(collectionSettingsFilePath, '{}', { encoding: 'utf-8' });
};

export const getAppSettings = async () => {
  const appSettingsExist = fs.existsSync(appSettingsFilePath);
  if (!appSettingsExist) return '';
  return await fsPromises.readFile(appSettingsFilePath, { encoding: 'utf-8' });
};

export const setAppSettings = async (contents: string) => {
  await fsPromises.writeFile(appSettingsFilePath, contents, { encoding: 'utf-8' });
};

export const initializeAppSettings = async () => {
  const appSettingsString = await getAppSettings();
  if (appSettingsString) return;
  const newAppSettings = { activeCollectionId: '', collections: {} };
  const newAppSettingsString = JSON.stringify(newAppSettings);
  await setAppSettings(newAppSettingsString);
};

export const setActiveCollectionId = async (_event: IpcMainInvokeEvent, id: string) => {
  const appSettingsString = await getAppSettings();
  const appSettings = await JSON.parse(appSettingsString);
  appSettings.activeCollectionId = id;
  const newAppSettingsString = JSON.stringify(appSettings);
  await setAppSettings(newAppSettingsString);
};

export const getActiveCollectionId = async () => {
  const appSettingsString = await getAppSettings();
  const appSettings = await JSON.parse(appSettingsString);
  return JSON.stringify(appSettings.activeCollectionId);
};

export const getCollectionInfo = async (_event: IpcMainInvokeEvent, id: string) => {
  const appSettingsString = await getAppSettings();
  const appSettings = await JSON.parse(appSettingsString);
  return JSON.stringify(appSettings.collections[id]);
};

export const getCollectionList = async () => {
  const appSettingsString = await getAppSettings();
  const appSettings = await JSON.parse(appSettingsString);
  return JSON.stringify(appSettings.collections);
};

export const getCollectionFileTree = async (
  _event: IpcMainInvokeEvent,
  path: string,
  name: string,
) => {
  const rootNode = new TreeNode(path, name, true);
  const stack = [rootNode];
  while (stack.length) {
    const currentNode = stack.pop();
    if (currentNode) {
      const children = await fsPromises.readdir(currentNode.path);
      for (const childName of children) {
        const isValidChild = filterChildren(childName);
        if (!isValidChild) continue;
        const childPath = join(currentNode.path, childName);
        const stat = await fsPromises.lstat(childPath);
        const childNode = new TreeNode(childPath, childName, stat.isDirectory());
        currentNode.children.push(childNode);
        if (stat.isDirectory()) stack.push(childNode);
      }
    }
  }
  return JSON.stringify(rootNode);
};

export const filterChildren = (child: string) => {
  if (child == '.DS_Store') return false;
  if (child == '.mvp') return false;
  return true;
};

export const renameItem = async (
  _event: IpcMainInvokeEvent,
  oldPath: string,
  name: string,
  nameNew: string,
) => {
  const basePath = dirname(oldPath);
  const currentPath = join(basePath, name);
  const newPath = join(basePath, nameNew);
  await fsPromises.rename(currentPath, newPath);
};

export const checkPathAvailable = async (
  _event: IpcMainInvokeEvent,
  oldPath: string,
  name: string,
) => {
  const basePath = dirname(oldPath);
  const contents = await fsPromises.readdir(basePath, { withFileTypes: true });
  const contentsFiltered = contents.filter((item) => item.isDirectory() && item.name == name);
  if (contentsFiltered.length > 0) return false;
  return true;
};

export * as file from './file';
