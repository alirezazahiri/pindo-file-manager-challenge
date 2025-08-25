import { FileSystemNodeType } from "@/enums";
import { BaseFileSystemCommand } from "./abstract";
import type { ToggleFolderExpansionPayload } from "@/stores/file-system/types";
import { FileSystemStateContextType } from "@/providers";

export class ToggleFolderExpansionCommand extends BaseFileSystemCommand {
  constructor(private payload: ToggleFolderExpansionPayload) {
    super();
  }

  execute(state: FileSystemStateContextType) {
    const { id } = this.payload;

    const nodeData = state.tree.getNode(id);

    if (nodeData?.data.type !== FileSystemNodeType.FOLDER) {
      return this.createUnchangedResult();
    }

    const newTree = state.tree.clone();
    const isUpdated = newTree.updateNodeData(id, {
      ...nodeData.data,
      isExpanded: !nodeData.data.isExpanded,
    });

    if (!isUpdated) {
      return this.createUnchangedResult();
    }

    return this.createSuccessResult({ ...state, tree: newTree });
  }
}
