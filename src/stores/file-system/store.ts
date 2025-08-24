import { Tree } from "@/core";
import { FileSystemFolderNode } from "@/models";
import { FileSystemStoreActionType } from "./enum";
import { FileSystemContextType } from "@/providers/file-system/file-system.provider";
import { compareFileSystemNodes } from "@/lib/file-system";
import { saveStateToStorage } from "@/lib/persistence";
import { marshalTree } from "@/lib/marshal";
import { debounce } from "@/lib/utils";
import type { FileSystemNodeData } from "@/types";
import type { FileSystemStoreAction } from "./types";

type FileSystemStoreState = Pick<FileSystemContextType, "tree">;

export const FILE_MANAGER_STORE_PERSISTENCE_KEY = "file-manager-store";

const createInitialTree = () => {
  const root = FileSystemFolderNode.generate("root");

  return new Tree<FileSystemNodeData>(root, compareFileSystemNodes);
};

export const fileSystemInitialState: FileSystemStoreState = {
  tree: createInitialTree(),
};

export const fileSystemStoreReducer = (
  state: FileSystemStoreState = fileSystemInitialState,
  action: FileSystemStoreAction
) => {
  switch (action.type) {
    case FileSystemStoreActionType.SET_TREE:
      return {
        ...state,
        tree: action.payload.tree,
      };
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

export const persistFileSystemState = debounce(
  (state: FileSystemStoreState["tree"]) => {
    saveStateToStorage(state, FILE_MANAGER_STORE_PERSISTENCE_KEY, marshalTree);
  },
  300
);
