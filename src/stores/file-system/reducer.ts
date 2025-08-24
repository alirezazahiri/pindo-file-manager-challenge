import { FileSystemFileNode, FileSystemFolderNode } from "@/models";
import { FileSystemStoreActionType } from "./enum";
import type { FileSystemStoreAction } from "./types";
import { FileSystemNodeType } from "@/enums";
import { fileSystemInitialState, FileSystemStoreState } from "./store";

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
      const isAdded = newState.tree.addNode(
        action.payload.parentId,
        FileSystemFolderNode.generate(
          action.payload.name,
          action.payload.parentId
        )
      );

      return isAdded ? newState : state;
    }
    case FileSystemStoreActionType.ADD_FILE: {
      const newState = { ...state };
      const isAdded = newState.tree.addNode(
        action.payload.parentId,
        FileSystemFileNode.generate(
          action.payload.name,
          action.payload.extension,
          action.payload.parentId
        )
      );

      return isAdded ? newState : state;
    }
    case FileSystemStoreActionType.DELETE_NODE: {
      const newState = { ...state };
      const isDeleted = newState.tree.removeNode(action.payload.id);

      return isDeleted ? newState : state;
    }
    case FileSystemStoreActionType.RENAME_FILE: {
      const nodeData = state.tree.getNode(action.payload.id);

      if (nodeData?.data.type === FileSystemNodeType.FILE) {
        const newState = { ...state };
        newState.tree.updateNodeData(action.payload.id, {
          ...nodeData.data,
          name: action.payload.newName,
        });

        return newState;
      }

      return state;
    }
    case FileSystemStoreActionType.RENAME_FOLDER: {
      const nodeData = state.tree.getNode(action.payload.id);

      if (nodeData?.data.type === FileSystemNodeType.FOLDER) {
        const newState = { ...state };
        newState.tree.updateNodeData(action.payload.id, {
          ...nodeData.data,
          name: action.payload.newName,
        });

        return newState;
      }

      return state;
    }
    case FileSystemStoreActionType.TOGGLE_FOLDER_EXPANSION: {
      console.log("toggle folder expansion", action.payload.id);
      const nodeData = state.tree.getNode(action.payload.id);

      if (nodeData?.data.type === FileSystemNodeType.FOLDER) {
        const newState = { ...state };
        newState.tree.updateNodeData(action.payload.id, {
          ...nodeData.data,
          isExpanded: !nodeData.data.isExpanded,
        });

        return newState;
      }

      return state;
    }
    default:
      return state;
  }
};
