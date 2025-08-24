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
      const newState = { ...state };
      const addedNode = newState.tree.addNode(
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

      return isAdded ? newState : state;
    }
    case FileSystemStoreActionType.ADD_FILE: {
      console.log("add file", action.payload);
      const newState = { ...state };
      const addedNode = newState.tree.addNode(
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

      console.log("newState", newState);

      return isAdded ? newState : state;
    }
    case FileSystemStoreActionType.DELETE_NODE: {
      const newState = { ...state };
      const nodeData = newState.tree.getNode(action.payload.id)?.data;
      const isDeleted = newState.tree.removeNode(action.payload.id);

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

      return isDeleted ? newState : state;
    }
    case FileSystemStoreActionType.RENAME_FILE: {
      const nodeData = state.tree.getNode(action.payload.id);

      if (nodeData?.data.type === FileSystemNodeType.FILE) {
        const newState = { ...state };
        const isUpdated = newState.tree.updateNodeData(action.payload.id, {
          ...nodeData.data,
          name: action.payload.newName,
        });

        if (isUpdated) {
          toast.success(Messages.FILE_RENAMED_SUCCESSFULLY);
        } else {
          toast.error(Errors.FAILED_TO_RENAME_FILE);
        }

        return isUpdated ? newState : state;
      }

      toast.error(Errors.EXPECTED_FILE_NOT_FOLDER);

      return state;
    }
    case FileSystemStoreActionType.RENAME_FOLDER: {
      const nodeData = state.tree.getNode(action.payload.id);

      if (nodeData?.data.type === FileSystemNodeType.FOLDER) {
        const newState = { ...state };
        const isUpdated = newState.tree.updateNodeData(action.payload.id, {
          ...nodeData.data,
          name: action.payload.newName,
        });

        if (isUpdated) {
          toast.success(Messages.FOLDER_RENAMED_SUCCESSFULLY);
        } else {
          toast.error(Errors.FAILED_TO_RENAME_FOLDER);
        }

        return isUpdated ? newState : state;
      }

      toast.error(Errors.EXPECTED_FOLDER_NOT_FILE);

      return state;
    }
    case FileSystemStoreActionType.TOGGLE_FOLDER_EXPANSION: {
      console.log("toggle folder expansion", action.payload.id);
      const nodeData = state.tree.getNode(action.payload.id);

      if (nodeData?.data.type === FileSystemNodeType.FOLDER) {
        const newState = { ...state };
        const isUpdated = newState.tree.updateNodeData(action.payload.id, {
          ...nodeData.data,
          isExpanded: !nodeData.data.isExpanded,
        });

        console.log("isUpdated", isUpdated);
        const newNode = newState.tree.getNode(action.payload.id);
        console.log("newNode", newNode);

        return isUpdated ? newState : state;
      }

      return state;
    }
    default:
      return state;
  }
};
