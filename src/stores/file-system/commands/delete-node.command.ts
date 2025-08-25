import { FileSystemNodeType } from "@/enums";
import { Errors } from "@/constants/errors";
import { Messages } from "@/constants/messages";
import { BaseFileSystemCommand } from "./abstract";
import type { DeleteNodePayload } from "@/stores/file-system/types";
import { FileSystemStateContextType } from "@/providers";

export class DeleteNodeCommand extends BaseFileSystemCommand {
  constructor(private payload: DeleteNodePayload) {
    super();
  }

  execute(state: FileSystemStateContextType) {
    const { id } = this.payload;
    
    const nodeData = state.tree.getNode(id)?.data;
    
    const newTree = state.tree.clone();
    const isDeleted = newTree.removeNode(id);

    if (!isDeleted) {
      const errorMessage = this.getDeleteErrorMessage(nodeData?.type);
      return this.createErrorResult(errorMessage);
    }

    const successMessage = nodeData
      ? Messages.NODE_DELETED_SUCCESSFULLY(nodeData.type, nodeData.name)
      : "Node deleted successfully";

    return this.createSuccessResult(
      { ...state, tree: newTree },
      successMessage
    );
  }

  private getDeleteErrorMessage(nodeType?: FileSystemNodeType): string {
    return nodeType === FileSystemNodeType.FOLDER
      ? Errors.FAILED_TO_DELETE_FOLDER
      : Errors.FAILED_TO_DELETE_FILE;
  }
}
