import { Tree } from "@/core";
import { compareFileSystemNodes } from "@/lib/file-system";
import { FileSystemFolderNode } from "@/models";
import type { FileSystemNodeData } from "@/types";
import type { FileSystemStore, FileSystemStoreAction } from "./types";
import { FileSystemStoreActionType } from "./enum";

export const FILE_MANAGER_STORE_PERSISTENCE_KEY = "file-manager-store";

const createInitialTree = () => {
  const root = FileSystemFolderNode.generate("root");

  return new Tree<FileSystemNodeData>(root, compareFileSystemNodes);
};

const initialState: Partial<FileSystemStore> = {
  tree: createInitialTree(),
};

const reducer = (
  state: Partial<FileSystemStore> = initialState,
  action: FileSystemStoreAction
) => {
  switch (action.type) {
    case FileSystemStoreActionType.ADD_FOLDER:
      break;
    case FileSystemStoreActionType.ADD_FILE:
      break;
    case FileSystemStoreActionType.DELETE_NODE:
      break;
    case FileSystemStoreActionType.RENAME_FILE:
      break;
    case FileSystemStoreActionType.RENAME_FOLDER:
      break;
    case FileSystemStoreActionType.TOGGLE_FOLDER_EXPANSION:
      break;
    default:
      return state;
  }
};
