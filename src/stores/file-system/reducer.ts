import { FileSystemStoreActionType } from "./enum";
import type { FileSystemStoreAction } from "./types";
import { fileSystemInitialState, type FileSystemStoreState } from "./store";
import { FileSystemCommandFactory } from "./commands/factory";
import { toast } from "sonner";

export const fileSystemStoreReducer = (
  state: FileSystemStoreState = fileSystemInitialState,
  action: FileSystemStoreAction
) => {
  switch (action.type) {
    case FileSystemStoreActionType.SET_TREE: {
      return {
        ...state,
        tree: action.payload.tree,
      };
    }
    
    default: {
      const command = FileSystemCommandFactory.createCommand(action);
      
      if (!command) {
        return state;
      }

      const result = command.execute(state);
      
      if (result.success && result.message) {
        toast.success(result.message);
      } else if (!result.success && result.error) {
        toast.error(result.error);
      }

      return result.newState ?? state;
    }
  }
};
