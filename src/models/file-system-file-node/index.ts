import { FileSystemNodeType } from "@/enums";
import type { FileSystemNodeData } from "@/types";

export type FileSystemFileNodeData = FileSystemNodeData<FileSystemNodeType.FILE>;

export class FileSystemFileNode {
  static generate(
    name: string,
    extension: string,
    parentId: string
  ): FileSystemFileNodeData {
    return {
      name,
      parentId,
      extension,
      id: `file-${Date.now()}-${name.toLowerCase().replace(/\s+/g, "-")}`,
      type: FileSystemNodeType.FILE,
    };
  }
}
