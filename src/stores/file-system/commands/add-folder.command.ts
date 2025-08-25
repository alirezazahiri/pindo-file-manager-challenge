import { FileSystemFolderNode } from "@/models";
import { Errors } from "@/constants/errors";
import { Messages } from "@/constants/messages";
import { BaseFileSystemCommand } from "./abstract";
import { isNodeNameUnique } from "@/stores/file-system/validation";
import type { FileSystemStoreState } from "@/stores/file-system/store";
import type { AddFolderPayload } from "@/stores/file-system/types";
import { FileSystemStateContextType } from "@/providers";

export class AddFolderCommand extends BaseFileSystemCommand {
  constructor(private payload: AddFolderPayload) {
    super();
  }

  execute(state: FileSystemStateContextType) {
    const { parentId, name } = this.payload;

    if (!this.isNameValid(state, parentId, name)) {
      return this.createErrorResult(Errors.FOLDER_NAME_NOT_UNIQUE(name));
    }

    const newTree = state.tree.clone();
    const addedNode = newTree.addNode(
      parentId,
      FileSystemFolderNode.generate(name, parentId)
    );

    if (!addedNode) {
      return this.createErrorResult(Errors.FAILED_TO_ADD_FOLDER);
    }

    return this.createSuccessResult(
      { ...state, tree: newTree },
      Messages.FOLDER_ADDED_SUCCESSFULLY
    );
  }

  private isNameValid(
    state: FileSystemStoreState,
    parentId: string,
    name: string
  ): boolean {
    return isNodeNameUnique(state.tree, {
      parentId,
      name,
    });
  }
}
