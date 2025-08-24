import { FileSystemStoreActionType } from "./enum";
import type { FileSystemStoreAction } from "./types";

type ActionDispatcher = (...args: any[]) => FileSystemStoreAction;

export const addFolder: ActionDispatcher = (parentId: string, name: string) => {
  return {
    type: FileSystemStoreActionType.ADD_FOLDER,
    payload: {
      parentId,
      name,
    },
  };
};

export const addFile: ActionDispatcher = (
  parentId: string,
  name: string,
  extension: string
) => {
  return {
    type: FileSystemStoreActionType.ADD_FILE,
    payload: {
      parentId,
      name,
      extension,
    },
  };
};

export const deleteNode: ActionDispatcher = (id: string) => {
  return {
    type: FileSystemStoreActionType.DELETE_NODE,
    payload: {
      id,
    },
  };
};

export const renameFile: ActionDispatcher = (
  id: string,
  newName: string,
  newExtension: string
) => {
  return {
    type: FileSystemStoreActionType.RENAME_FILE,
    payload: {
      id,
      newName,
      newExtension,
    },
  };
};

export const renameFolder: ActionDispatcher = (id: string, newName: string) => {
  return {
    type: FileSystemStoreActionType.RENAME_FOLDER,
    payload: {
      id,
      newName,
    },
  };
};

export const toggleFolderExpansion: ActionDispatcher = (id: string) => {
  return {
    type: FileSystemStoreActionType.TOGGLE_FOLDER_EXPANSION,
    payload: {
      id,
    },
  };
};
