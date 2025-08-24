"use client";

import { ConfirmationModal } from "@/components/shared";
import { TreeNode } from "@/core";
import { FileSystemNodeType } from "@/enums";
import { UseConfirmationReturn } from "@/hooks";
import { FileSystemNodeData } from "@/types";

type DeleteConfirmationData = {
  node: TreeNode<FileSystemNodeData> | null;
};

type DeleteConfirmDialogProps = Omit<
  UseConfirmationReturn<DeleteConfirmationData>,
  "open"
>;

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  close,
  confirm,
  data,
  isOpen,
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={close}
      onConfirm={confirm}
      variant="destructive"
      title={`Delete ${
        data?.node?.data.type === FileSystemNodeType.FOLDER ? "Folder" : "File"
      }`}
      description={`Are you sure you want to delete ${data?.node?.data.name}?`}
      confirmText="Delete"
      cancelText="Cancel"
      confirmationLoadingText="Deleting..."
    />
  );
};
