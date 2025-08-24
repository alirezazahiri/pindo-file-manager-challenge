import { FileManagerNodeType } from "@/enums";

export type FileSystemNodeData = {
  id: string;
  name: string;
  createdAt: Date;
} & (
  | {
      parentId: string; // files always have a parent
      type: FileManagerNodeType.FILE;
      extension: string;
    }
  | {
      parentId: string | null; // root node has no parent
      type: FileManagerNodeType.FOLDER;
      children: string[];
    }
);
