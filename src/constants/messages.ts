import { FileSystemNodeType } from "@/enums/file-system-node-type.enum";

export const Messages = {
  FILE_DELETED_SUCCESSFULLY: "File deleted successfully",
  FOLDER_DELETED_SUCCESSFULLY: "Folder deleted successfully",
  FILE_ADDED_SUCCESSFULLY: "File added successfully",
  FOLDER_ADDED_SUCCESSFULLY: "Folder added successfully",
  FILE_RENAMED_SUCCESSFULLY: "File renamed successfully",
  FOLDER_RENAMED_SUCCESSFULLY: "Folder renamed successfully",
  NODE_DELETED_SUCCESSFULLY: (nodeType: FileSystemNodeType, name: string) =>
    `${
      nodeType === FileSystemNodeType.FOLDER ? "Folder" : "File"
    } with name "${name}" deleted`,
};
