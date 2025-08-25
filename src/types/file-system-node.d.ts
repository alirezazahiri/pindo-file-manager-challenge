import { FileSystemNodeType } from "@/enums";

export type FileSystemNodeData<T extends FileSystemNodeType = FileSystemNodeType> = {
  id: string;
  name: string;
  type: T;
} & (
  | {
      parentId: string; // files always have a parent
      type: FileSystemNodeType.FILE;
      extension: string;
    }
  | {
      parentId: string | null; // root node has no parent
      type: FileSystemNodeType.FOLDER;
      isExpanded: boolean; // default to true
    }
);
