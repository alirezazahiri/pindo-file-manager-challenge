import type { StoreAction } from "@/types";
import type { Tree } from "@/core";
import type { FileSystemNodeData } from "@/types";
import { FileSystemStoreActionType } from "./enum";

type SetTreePayload = {
  tree: Tree<FileSystemNodeData>;
};

type AddFolderPayload = {
  parentId: string;
  name: string;
};

type AddFilePayload = {
  parentId: string;
  name: string;
  extension: string;
};

type DeleteNodePayload = {
  id: string;
};

type RenameFilePayload = {
  id: string;
  newName: string;
  newExtension: string;
};

type RenameFolderPayload = {
  id: string;
  newName: string;
};

type ToggleFolderExpansionPayload = {
  id: string;
};

export type FileSystemStoreAction =
  | StoreAction<FileSystemStoreActionType.SET_TREE, SetTreePayload>
  | StoreAction<FileSystemStoreActionType.ADD_FOLDER, AddFolderPayload>
  | StoreAction<FileSystemStoreActionType.ADD_FILE, AddFilePayload>
  | StoreAction<FileSystemStoreActionType.DELETE_NODE, DeleteNodePayload>
  | StoreAction<FileSystemStoreActionType.RENAME_FILE, RenameFilePayload>
  | StoreAction<FileSystemStoreActionType.RENAME_FOLDER, RenameFolderPayload>
  | StoreAction<
      FileSystemStoreActionType.TOGGLE_FOLDER_EXPANSION,
      ToggleFolderExpansionPayload
    >;
