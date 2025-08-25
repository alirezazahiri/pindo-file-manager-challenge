import { Errors } from "@/constants/errors";
import { Messages } from "@/constants/messages";
import { BaseFileSystemCommand } from "./abstract";
import { isNodeNameUnique } from "@/stores/file-system/validation";
import type { FileSystemStoreState } from "@/stores/file-system/store";
import type { RenameFolderPayload } from "@/stores/file-system/types";
import type { FileSystemNodeData } from "@/types/file-system-node";
import { TreeNode } from "@/core";
import { FileSystemStateContextType } from "@/providers";

export class RenameFolderCommand extends BaseFileSystemCommand {
  constructor(private payload: RenameFolderPayload) {
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
      const errorMessage = Errors.FAILED_TO_RENAME_FOLDER;
      return this.createErrorResult(errorMessage);
    }

    const successMessage = Messages.FOLDER_RENAMED_SUCCESSFULLY;
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

    const isUnique = isNodeNameUnique(state.tree, {
      parentId,
      name: newName,
      excludeId: this.payload.id,
    });

    if (!isUnique) {
      return { isValid: false, error: Errors.FOLDER_NAME_NOT_UNIQUE(newName) };
    }

    return { isValid: true };
  }

  private createUpdatedNodeData(
    originalData: FileSystemNodeData,
    newName: string
  ) {
    return {
      ...originalData,
      name: newName,
    };
  }
}
