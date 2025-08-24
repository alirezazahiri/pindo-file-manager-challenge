import { Tree } from "@/core";
import { FileSystemFolderNode } from "@/models";
import { FileSystemStateContextType } from "@/providers/file-system/file-system.provider";
import { compareFileSystemNodes } from "@/lib/file-system";
import { saveStateToStorage } from "@/lib/persistence";
import { marshalTree } from "@/lib/marshal";
import { debounce } from "@/lib/utils";
import type { FileSystemNodeData } from "@/types";

export type FileSystemStoreState = FileSystemStateContextType;

export const FILE_MANAGER_STORE_PERSISTENCE_KEY = "file-manager-store";

const createInitialTree = () => {
  const root = FileSystemFolderNode.generate("root");

  return new Tree<FileSystemNodeData>(root, compareFileSystemNodes);
};

export const fileSystemInitialState: FileSystemStoreState = {
  tree: createInitialTree(),
};

export const persistFileSystemState = debounce(
  (state: FileSystemStoreState["tree"]) => {
    saveStateToStorage(state, FILE_MANAGER_STORE_PERSISTENCE_KEY, marshalTree);
  },
  300
);
