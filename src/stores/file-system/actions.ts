import { FileSystemStoreActionType } from "./enum";
import type { FileSystemStoreAction } from "./types";

export const addFolder = (parentId: string, name: string): FileSystemStoreAction => {
  return {
    type: FileSystemStoreActionType.ADD_FOLDER,
    payload: {
      parentId,
      name,
    },
  };
};

export const addFile = (
  parentId: string,
  name: string,
  extension: string
): FileSystemStoreAction => {
  return {
    type: FileSystemStoreActionType.ADD_FILE,
    payload: {
      parentId,
      name,
      extension,
    },
  };
};

export const deleteNode = (id: string): FileSystemStoreAction => {
  return {
    type: FileSystemStoreActionType.DELETE_NODE,
    payload: {
      id,
    },
  };
};

export const renameFile = (
  id: string,
  newName: string,
  newExtension: string
): FileSystemStoreAction => {
  return {
    type: FileSystemStoreActionType.RENAME_FILE,
    payload: {
      id,
      newName,
      newExtension,
    },
  };
};

export const renameFolder = (id: string, newName: string): FileSystemStoreAction => {
  return {
    type: FileSystemStoreActionType.RENAME_FOLDER,
    payload: {
      id,
      newName,
    },
  };
};

export const toggleFolderExpansion = (id: string): FileSystemStoreAction => {
  return {
    type: FileSystemStoreActionType.TOGGLE_FOLDER_EXPANSION,
    payload: {
      id,
    },
  };
};
