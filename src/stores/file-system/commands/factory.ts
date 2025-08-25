import { FileSystemStoreActionType } from "@/stores/file-system/enum";
import type { FileSystemStoreAction } from "@/stores/file-system/types";
import type { IFileSystemCommand } from "./abstract";
import { AddFolderCommand } from "./add-folder.command";
import { AddFileCommand } from "./add-file.command";
import { DeleteNodeCommand } from "./delete-node.command";
import { RenameFolderCommand } from "./rename-folder.command";
import { ToggleFolderExpansionCommand } from "./toggle-folder-expansion.command";
import { RenameFileCommand } from "./rename-file.command";

export class FileSystemCommandFactory {
  static createCommand(action: FileSystemStoreAction) {
    switch (action.type) {
      case FileSystemStoreActionType.ADD_FOLDER:
        return new AddFolderCommand(action.payload);

      case FileSystemStoreActionType.ADD_FILE:
        return new AddFileCommand(action.payload);

      case FileSystemStoreActionType.DELETE_NODE:
        return new DeleteNodeCommand(action.payload);

      case FileSystemStoreActionType.RENAME_FILE:
        return new RenameFileCommand(action.payload);

      case FileSystemStoreActionType.RENAME_FOLDER:
        return new RenameFolderCommand(action.payload);

      case FileSystemStoreActionType.TOGGLE_FOLDER_EXPANSION:
        return new ToggleFolderExpansionCommand(action.payload);

      default:
        return null;
    }
  }
}
