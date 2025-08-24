import type { Tree } from "@/core";
import type { FileSystemNodeData } from "./file-system-node";
import type { FILE_MANAGER_STORE_PERSISTENCE_KEY } from "@/stores";

export type PersistedState = {
  [FILE_MANAGER_STORE_PERSISTENCE_KEY]: Tree<FileSystemNodeData>;
};
