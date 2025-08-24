import { FileSystemNodeType } from "@/enums";
import type { FileSystemNodeData } from "@/types";

export type FileSystemFolderNodeData = FileSystemNodeData<FileSystemNodeType.FOLDER>;

export class FileSystemFolderNode {
  static generate(name: string, parentId?: string): FileSystemFolderNodeData {
    return {
      name,
      parentId: parentId ?? null,
      id: `folder-${Date.now()}-${name.toLowerCase().replace(/\s+/g, "-")}`,
      type: FileSystemNodeType.FOLDER,
      isExpanded: true,
    };
  }
}
