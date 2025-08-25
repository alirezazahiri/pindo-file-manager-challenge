import { Errors } from "@/constants/errors";
import { Messages } from "@/constants/messages";
import { BaseFileSystemCommand } from "./abstract";
import { isNodeNameUnique } from "@/stores/file-system/validation";
import type { FileSystemStoreState } from "@/stores/file-system/store";
import type { RenameFilePayload } from "@/stores/file-system/types";
import type { FileSystemNodeData } from "@/types/file-system-node";
import { TreeNode } from "@/core";
import { FileSystemStateContextType } from "@/providers";

export class RenameFileCommand extends BaseFileSystemCommand {
  constructor(private payload: RenameFilePayload) {
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
      const errorMessage = Errors.FAILED_TO_RENAME_FILE;
      return this.createErrorResult(errorMessage);
    }

    const successMessage = Messages.FILE_RENAMED_SUCCESSFULLY;
    return this.createSuccessResult(
      { ...state, tree: newTree },
      successMessage
    );
  }

  private validateNewName(
    state: FileSystemStoreState,
    nodeData: TreeNode<FileSystemNodeData>,
    newName: string
  ) {
    const parentId = nodeData.parent?.id ?? "";
    const extension = this.payload.newExtension;

    const isUnique = isNodeNameUnique(state.tree, {
      parentId,
      name: newName,
      extension,
      excludeId: this.payload.id,
    });

    if (!isUnique) {
      return {
        isValid: false,
        error: Errors.FILE_NAME_NOT_UNIQUE(newName, extension),
      };
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
      extension: this.payload.newExtension,
    };
  }
}
