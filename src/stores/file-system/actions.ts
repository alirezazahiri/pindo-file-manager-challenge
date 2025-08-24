import { FileSystemStoreActionType } from "./enum";
import type { FileSystemNodeData } from "@/types";
import type { FileSystemStoreAction } from "./types";
import type { Tree } from "@/core";

export const setTree = (
  tree: Tree<FileSystemNodeData>
): FileSystemStoreAction => {
  return {
    type: FileSystemStoreActionType.SET_TREE,
    payload: {
      tree,
    },
  };
};

export const addFolder = (
  parentId: string,
  name: string
): FileSystemStoreAction => {
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

export const renameFolder = (
  id: string,
  newName: string
): FileSystemStoreAction => {
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
