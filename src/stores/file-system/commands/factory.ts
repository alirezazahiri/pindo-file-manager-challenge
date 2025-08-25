import { FileSystemStoreActionType } from "@/stores/file-system/enum";
import type { FileSystemStoreAction } from "@/stores/file-system/types";
import type { IFileSystemCommand } from "./abstract";
import { AddFolderCommand } from "./add-folder.command";
import { AddFileCommand } from "./add-file.command";
import { DeleteNodeCommand } from "./delete-node.command";
import { RenameNodeCommand } from "./rename-node.command";
import { ToggleFolderExpansionCommand } from "./toggle-folder-expansion.command";

export class FileSystemCommandFactory {
  static createCommand(action: FileSystemStoreAction): IFileSystemCommand | null {
    switch (action.type) {
      case FileSystemStoreActionType.ADD_FOLDER:
        return new AddFolderCommand(action.payload);

      case FileSystemStoreActionType.ADD_FILE:
        return new AddFileCommand(action.payload);

      case FileSystemStoreActionType.DELETE_NODE:
        return new DeleteNodeCommand(action.payload);

      case FileSystemStoreActionType.RENAME_FILE:
      case FileSystemStoreActionType.RENAME_FOLDER:
        return new RenameNodeCommand(action.payload);

      case FileSystemStoreActionType.TOGGLE_FOLDER_EXPANSION:
        return new ToggleFolderExpansionCommand(action.payload);

      default:
        return null;
    }
  }
}
