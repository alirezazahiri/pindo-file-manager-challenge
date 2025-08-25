export const Errors = {
  ROOT_NODE_NOT_FOUND: "Root node not found",
  FAILED_TO_DELETE_FILE: "Failed to delete file",
  FAILED_TO_DELETE_FOLDER: "Failed to delete folder",
  FAILED_TO_ADD_FOLDER: "Failed to add folder",
  FAILED_TO_ADD_FILE: "Failed to add file",
  FAILED_TO_RENAME_FILE: "Failed to rename file",
  FAILED_TO_RENAME_FOLDER: "Failed to rename folder",
  FAILED_TO_TOGGLE_FOLDER_EXPANSION: "Failed to toggle folder expansion",
  EXPECTED_FILE_NOT_FOLDER: "Expected file not folder",
  EXPECTED_FOLDER_NOT_FILE: "Expected folder not file",
  FILE_NAME_NOT_UNIQUE: (name: string, extension: string) =>
    `File with name "${name}.${extension}" already exists`,
  FOLDER_NAME_NOT_UNIQUE: (name: string) =>
    `Folder with name "${name}" already exists`,
  FILE_NAME_INVALID_CHARACTERS: "File name contains invalid characters",
  FILE_EXTENSION_INVALID_CHARACTERS: "File extension contains invalid characters",
  FILE_NAME_REQUIRED: "File name is required",
  FILE_EXTENSION_REQUIRED: "File extension is required",
  FOLDER_NAME_REQUIRED: "Folder name is required",
  FOLDER_NAME_INVALID_CHARACTERS: "Folder name contains invalid characters",
};
