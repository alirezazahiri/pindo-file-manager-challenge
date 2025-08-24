import { FileManagerNodeType } from "@/enums";

export type FileNodeData = {
  id: string;
  name: string;
  extension: string;
  type: FileManagerNodeType.FILE;
  parentId: string;
  createdAt: Date;
};
