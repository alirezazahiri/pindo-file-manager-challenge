import { FileSystemNodeType } from "@/enums";
import { Errors } from "@/constants/errors";
import { Messages } from "@/constants/messages";
import { BaseFileSystemCommand } from "./abstract";
import { isNodeNameUnique } from "@/stores/file-system/validation";
import type { FileSystemStoreState } from "@/stores/file-system/store";
import type { RenameFilePayload, RenameFolderPayload } from "@/stores/file-system/types";
import type { FileSystemNodeData } from "@/types/file-system-node";
import { TreeNode } from "@/core";
import { FileSystemStateContextType } from "@/providers";

// TODO: it might be a better practice to create a separate command for each node type
export class RenameNodeCommand extends BaseFileSystemCommand {
  constructor(private payload: RenameFilePayload | RenameFolderPayload) {
    super();
  }

  execute(state: FileSystemStateContextType) {
    const { id, newName } = this.payload;
    
    const nodeData = state.tree.getNode(id);
    if (!nodeData) {
      return this.createUnchangedResult();
    }

    const validationResult = this.validateNewName(state, nodeData, newName);
    if (!validationResult.isValid) {
      return this.createErrorResult(validationResult.error!);
    }

    const newTree = state.tree.clone();
    const updatedData = this.createUpdatedNodeData(nodeData.data, newName);
    const isUpdated = newTree.updateNodeData(id, updatedData);

    if (!isUpdated) {
      const errorMessage = this.getRenameErrorMessage(nodeData.data.type);
      return this.createErrorResult(errorMessage);
    }

    const successMessage = this.getRenameSuccessMessage(nodeData.data.type);
    return this.createSuccessResult(
      { ...state, tree: newTree },
      successMessage
    );
  }

  private validateNewName(
    state: FileSystemStoreState,
    nodeData: TreeNode<FileSystemNodeData>,
    newName: string
  ): { isValid: boolean; error?: string } {
    const parentId = nodeData.parent?.id ?? "";
    const isFile = nodeData.data.type === FileSystemNodeType.FILE;
    
    const extension = isFile 
      ? (this.payload as RenameFilePayload).newExtension 
      : undefined;

    const isUnique = isNodeNameUnique(state.tree, {
      parentId,
      name: newName,
      extension,
      excludeId: this.payload.id,
    });

    if (!isUnique) {
      const error = isFile
        ? Errors.FILE_NAME_NOT_UNIQUE(newName, (this.payload as RenameFilePayload).newExtension)
        : Errors.FOLDER_NAME_NOT_UNIQUE(newName);
      
      return { isValid: false, error };
    }

    return { isValid: true };
  }

  private createUpdatedNodeData(originalData: FileSystemNodeData, newName: string): FileSystemNodeData {
    if (originalData.type === FileSystemNodeType.FILE) {
      return {
        ...originalData,
        name: newName,
        extension: (this.payload as RenameFilePayload).newExtension,
      };
    } else {
      return {
        ...originalData,
        name: newName,
      };
    }
  }

  private getRenameErrorMessage(nodeType: FileSystemNodeType): string {
    return nodeType === FileSystemNodeType.FOLDER
      ? Errors.FAILED_TO_RENAME_FOLDER
      : Errors.FAILED_TO_RENAME_FILE;
  }

  private getRenameSuccessMessage(nodeType: FileSystemNodeType): string {
    return nodeType === FileSystemNodeType.FOLDER
      ? Messages.FOLDER_RENAMED_SUCCESSFULLY
      : Messages.FILE_RENAMED_SUCCESSFULLY;
  }
}
