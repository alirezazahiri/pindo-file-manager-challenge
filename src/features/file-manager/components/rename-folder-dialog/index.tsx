import { FormDialog } from "@/components/shared";
import type { TreeNode } from "@/core";
import type { FileSystemNodeData } from "@/types";

type RenameFolderDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  node: TreeNode<FileSystemNodeData> | null;
};

export const RenameFolderDialog: React.FC<RenameFolderDialogProps> = ({
  isOpen,
  onClose,
  node,
}) => {
  if (!node) return null;

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {
        // TODO: implement me
      }}
      title="Rename Folder"
    />
  );
};
