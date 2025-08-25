import { FileSystemFileNode, FileSystemFolderNode } from "@/models";
import { FileSystemStoreActionType } from "./enum";
import type { FileSystemStoreAction, RenameFilePayload } from "./types";
import { FileSystemNodeType } from "@/enums";
import { fileSystemInitialState, type FileSystemStoreState } from "./store";
import { toast } from "sonner";
import { Errors } from "@/constants/errors";
import { Messages } from "@/constants/messages";

type CheckIsNodeNameUniqueParams = {
  tree: FileSystemStoreState["tree"];
  params: {
    parentId: string;
    name: string;
    extension?: string;
    excludeId?: string;
  };
};

const checkIsNodeNameUnique = ({
  tree,
  params,
}: CheckIsNodeNameUniqueParams) => {
  const children = tree.getChildren(params.parentId);

  return !children.some((child) => {
    if (params.excludeId && params.excludeId === child.id) return false;

    const data = child.data;

    if (data.type === FileSystemNodeType.FOLDER) {
      return !params.extension && data.name === params.name;
    } else {
      return params.extension
        ? data.name === params.name && data.extension === params.extension
        : false;
    }
  });
};

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
      const isNameUnique = checkIsNodeNameUnique({
        tree: state.tree,
        params: {
          parentId: action.payload.parentId,
          name: action.payload.name,
        },
      });

      if (!isNameUnique) {
        toast.error(Errors.FOLDER_NAME_NOT_UNIQUE(action.payload.name));
        return state;
      }

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
      const isNameUnique = checkIsNodeNameUnique({
        tree: state.tree,
        params: {
          parentId: action.payload.parentId,
          name: action.payload.name,
          extension: action.payload.extension,
        },
      });

      if (!isNameUnique) {
        toast.error(
          Errors.FILE_NAME_NOT_UNIQUE(
            action.payload.name,
            action.payload.extension
          )
        );
        return state;
      }

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

      const isNameUnique = checkIsNodeNameUnique({
        tree: state.tree,
        params: {
          parentId: nodeData.parent?.id ?? "",
          name: action.payload.newName,
          extension:
            nodeData?.data.type === FileSystemNodeType.FILE
              ? (action.payload as RenameFilePayload).newExtension
              : undefined,
          excludeId: action.payload.id,
        },
      });

      if (!isNameUnique) {
        toast.error(
          nodeData?.data.type === FileSystemNodeType.FILE
            ? Errors.FILE_NAME_NOT_UNIQUE(
                action.payload.newName,
                nodeData.data.extension
              )
            : Errors.FOLDER_NAME_NOT_UNIQUE(action.payload.newName)
        );
        return state;
      }

      const newTree = state.tree.clone();
      const isUpdated = newTree.updateNodeData(
        action.payload.id,
        nodeData.data.type === FileSystemNodeType.FILE
          ? {
              ...nodeData.data,
              name: action.payload.newName,
              extension: (action.payload as RenameFilePayload).newExtension,
            }
          : {
              ...nodeData.data,
              name: action.payload.newName,
            }
      );

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
