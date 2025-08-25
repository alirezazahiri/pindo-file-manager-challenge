import { FileSystemNodeType } from "@/enums";
import type { FileSystemNodeData } from "@/types";

export const compareFileSystemNodes = (
  a: FileSystemNodeData,
  b: FileSystemNodeData
): number => {
  // folders on top
  if (a.type !== b.type) {
    return a.type === FileSystemNodeType.FOLDER ? -1 : 1;
  }

  // files and folders must be sorted alphabeticaly and case sensitive
  const nameA =
    a.type === FileSystemNodeType.FILE ? `${a.name}.${a.extension}` : a.name;
  const nameB =
    b.type === FileSystemNodeType.FILE ? `${b.name}.${b.extension}` : b.name;

  return nameA.localeCompare(nameB);
};
