import { FileSystemFileNode, FileSystemFolderNode } from "@/models";
import { FileSystemStoreActionType } from "./enum";
import type { FileSystemStoreAction } from "./types";
import { FileSystemNodeType } from "@/enums";
import { fileSystemInitialState, FileSystemStoreState } from "./store";
import { toast } from "sonner";
import { Errors } from "@/enums/errors.enum";
import { Messages } from "@/enums/messages.enum";

export const fileSystemStoreReducer = (
  state: FileSystemStoreState = fileSystemInitialState,
  action: FileSystemStoreAction
) => {
  switch (action.type) {
    case FileSystemStoreActionType.SET_TREE: {
      return {
        ...state,
        tree: action.payload.tree,
      };
    }
    case FileSystemStoreActionType.ADD_FOLDER: {
      const newTree = state.tree.clone();
      const addedNode = newTree.addNode(
        action.payload.parentId,
        FileSystemFolderNode.generate(
          action.payload.name,
          action.payload.parentId
        )
      );

      const isAdded = !!addedNode;

      if (isAdded) {
        toast.success(Messages.FOLDER_ADDED_SUCCESSFULLY);
      } else {
        toast.error(Errors.FAILED_TO_ADD_FOLDER);
      }

      return isAdded ? { ...state, tree: newTree } : state;
    }
    case FileSystemStoreActionType.ADD_FILE: {
      const newTree = state.tree.clone();
      const addedNode = newTree.addNode(
        action.payload.parentId,
        FileSystemFileNode.generate(
          action.payload.name,
          action.payload.extension,
          action.payload.parentId
        )
      );

      const isAdded = !!addedNode;

      if (isAdded) {
        toast.success(Messages.FILE_ADDED_SUCCESSFULLY);
      } else {
        toast.error(Errors.FAILED_TO_ADD_FILE);
      }

      return isAdded ? { ...state, tree: newTree } : state;
    }
    case FileSystemStoreActionType.DELETE_NODE: {
      const nodeData = state.tree.getNode(action.payload.id)?.data;
      const newTree = state.tree.clone();
      const isDeleted = newTree.removeNode(action.payload.id);

      if (isDeleted) {
        if (nodeData) {
          toast.success(
            Messages.NODE_DELETED_SUCCESSFULLY(nodeData.type, nodeData.name)
          );
        }
      } else {
        toast.error(
          nodeData?.type === FileSystemNodeType.FOLDER
            ? Errors.FAILED_TO_DELETE_FOLDER
            : Errors.FAILED_TO_DELETE_FILE
        );
      }

      return isDeleted ? { ...state, tree: newTree } : state;
    }
    case FileSystemStoreActionType.RENAME_FILE:
    case FileSystemStoreActionType.RENAME_FOLDER: {
      console.log(
        "fileSystemStoreReducer::RENAME_FILE, RENAME_FOLDER",
        action.payload
      );
      const nodeData = state.tree.getNode(action.payload.id);

      if (!nodeData) {
        return state;
      }

      const newTree = state.tree.clone();
      const isUpdated = newTree.updateNodeData(action.payload.id, {
        ...nodeData.data,
        name: action.payload.newName,
      });

      if (isUpdated) {
        toast.success(
          nodeData?.data.type === FileSystemNodeType.FOLDER
            ? Messages.FOLDER_RENAMED_SUCCESSFULLY
            : Messages.FILE_RENAMED_SUCCESSFULLY
        );
      } else {
        toast.error(
          nodeData?.data.type === FileSystemNodeType.FOLDER
            ? Errors.FAILED_TO_RENAME_FOLDER
            : Errors.FAILED_TO_RENAME_FILE
        );
      }

      return isUpdated ? { ...state, tree: newTree } : state;
    }
    case FileSystemStoreActionType.TOGGLE_FOLDER_EXPANSION: {
      const nodeData = state.tree.getNode(action.payload.id);

      if (nodeData?.data.type === FileSystemNodeType.FOLDER) {
        const newTree = state.tree.clone();
        const isUpdated = newTree.updateNodeData(action.payload.id, {
          ...nodeData.data,
          isExpanded: !nodeData.data.isExpanded,
        });

        return isUpdated ? { ...state, tree: newTree } : state;
      }

      return state;
    }
    default:
      return state;
  }
};
