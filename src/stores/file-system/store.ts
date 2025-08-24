import { Tree } from "@/core";
import { compareFileSystemNodes } from "@/lib/file-system";
import { FileSystemFolderNode } from "@/models";
import type { FileSystemNodeData } from "@/types";
import type { FileSystemStoreAction } from "./types";
import { FileSystemStoreActionType } from "./enum";
import { FileSystemContextType } from "@/providers/file-system/file-system.provider";

export const FILE_MANAGER_STORE_PERSISTENCE_KEY = "file-manager-store";

const createInitialTree = () => {
  const root = FileSystemFolderNode.generate("root");

  return new Tree<FileSystemNodeData>(root, compareFileSystemNodes);
};

export const fileSystemInitialState: Pick<FileSystemContextType, "tree"> = {
  tree: createInitialTree(),
};

export const fileSystemStoreReducer = (
  state: Pick<FileSystemContextType, "tree"> = fileSystemInitialState,
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
