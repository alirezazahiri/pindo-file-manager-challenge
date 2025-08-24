import { FileManagerNodeType } from "@/enums";

export type FolderNodeData = {
  id: string;
  name: string;
  type: FileManagerNodeType.FOLDER;
  parentId: string | null;
  children: string[];
  createdAt: Date;
};
