"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { FileSystemNodeType } from "@/enums";
import { isPersisted, loadPersistedValue } from "@/lib/persistence";
import {
  addFile,
  addFolder,
  deleteNode,
  renameFile,
  renameFolder,
  toggleFolderExpansion,
  fileSystemInitialState,
  fileSystemStoreReducer,
  persistFileSystemState,
  FILE_MANAGER_STORE_PERSISTENCE_KEY,
  setTree,
} from "@/stores/file-system";
import { FileSystemNodeData } from "@/types";
import type { Tree } from "@/core";
import { unmarshalTree } from "@/lib/marshal";
import { compareFileSystemNodes } from "@/lib/file-system";

export type FileSystemContextType = {
  tree: Tree<FileSystemNodeData>;
  addFolder: (parentId: string, name: string) => void;
  addFile: (parentId: string, name: string, extension: string) => void;
  deleteNode: (id: string) => void;
  renameFile: (id: string, newName: string, newExtension: string) => void;
  renameFolder: (id: string, newName: string) => void;
  toggleFolderExpansion: (id: string) => void;
  checkIsFolderExpanded: (id: string) => boolean;
};

export const FileSystemContext = createContext<FileSystemContextType | null>(
  null
);

export const FileSystemProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    fileSystemStoreReducer,
    fileSystemInitialState
  );

  const onAddFolder = (parentId: string, name: string) =>
    dispatch(addFolder(parentId, name));

  const onAddFile = (parentId: string, name: string, extension: string) =>
    dispatch(addFile(parentId, name, extension));

  const onDeleteNode = (id: string) => dispatch(deleteNode(id));

  const onRenameFile = (id: string, newName: string, newExtension: string) =>
    dispatch(renameFile(id, newName, newExtension));

  const onRenameFolder = (id: string, newName: string) =>
    dispatch(renameFolder(id, newName));

  const onToggleFolderExpansion = (id: string) =>
    dispatch(toggleFolderExpansion(id));

  const checkIsFolderExpanded = (id: string) => {
    const node = state?.tree?.getNode(id);
    return node?.data.type === FileSystemNodeType.FOLDER
      ? !!node.data.isExpanded
      : false;
  };

  useEffect(() => {
    if (isPersisted(FILE_MANAGER_STORE_PERSISTENCE_KEY)) {
      const persistedState = loadPersistedValue(
        fileSystemInitialState.tree,
        FILE_MANAGER_STORE_PERSISTENCE_KEY,
        (state) =>
          unmarshalTree<FileSystemNodeData>(state, compareFileSystemNodes)
      );
      dispatch(setTree(persistedState));
    }
  }, []);

  useEffect(() => {
    if (state?.tree) {
      persistFileSystemState(state.tree);
    }
  }, [state?.tree]);

  return (
    <FileSystemContext.Provider
      value={{
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        tree: state?.tree!, // we already know that the tree is not null or undefined, because we initialize it anyway
        addFolder: onAddFolder,
        addFile: onAddFile,
        deleteNode: onDeleteNode,
        renameFile: onRenameFile,
        renameFolder: onRenameFolder,
        toggleFolderExpansion: onToggleFolderExpansion,
        checkIsFolderExpanded,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error("useFileSystem must be used within a FileSystemProvider");
  }
  return context;
};
