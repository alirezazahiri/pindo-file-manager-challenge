import { BaseCommand, type CommandResult, type ICommand } from "@/types/command";
import type { FileSystemStoreState } from "@/stores/file-system/store";
import { FileSystemStateContextType } from "@/providers";

export type IFileSystemCommand = ICommand<FileSystemStoreState>;

export abstract class BaseFileSystemCommand
  extends BaseCommand<FileSystemStoreState>
  implements IFileSystemCommand
{
  abstract execute(state: FileSystemStateContextType): CommandResult<FileSystemStoreState>;
}
