import { FileSystemFileNode } from "@/models";
import { Errors } from "@/constants/errors";
import { Messages } from "@/constants/messages";
import { BaseFileSystemCommand } from "./abstract";
import { isNodeNameUnique } from "@/stores/file-system/validation";
import type { FileSystemStoreState } from "@/stores/file-system/store";
import type { AddFilePayload } from "@/stores/file-system/types";
import { FileSystemStateContextType } from "@/providers";

export class AddFileCommand extends BaseFileSystemCommand {
  constructor(private payload: AddFilePayload) {
    super();
  }

  execute(state: FileSystemStateContextType) {
    const { parentId, name, extension } = this.payload;

    if (!this.isNameValid(state, parentId, name, extension)) {
      return this.createErrorResult(
        Errors.FILE_NAME_NOT_UNIQUE(name, extension)
      );
    }

    const newTree = state.tree.clone();
    const addedNode = newTree.addNode(
      parentId,
      FileSystemFileNode.generate(name, extension, parentId)
    );

    if (!addedNode) {
      return this.createErrorResult(Errors.FAILED_TO_ADD_FILE);
    }

    return this.createSuccessResult(
      { ...state, tree: newTree },
      Messages.FILE_ADDED_SUCCESSFULLY
    );
  }

  private isNameValid(
    state: FileSystemStoreState,
    parentId: string,
    name: string,
    extension: string
  ) {
    return isNodeNameUnique(state.tree, {
      parentId,
      name,
      extension,
    });
  }
}
