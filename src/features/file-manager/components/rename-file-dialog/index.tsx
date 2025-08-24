"use client";

import { FormDialog } from "@/components/shared";
import type { TreeNode } from "@/core";
import type { FileSystemNodeData } from "@/types";
import {
  renameFileFields,
  RenameFileInput,
  renameFileSchema,
} from "@/features/file-manager/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileSystemNodeType } from "@/enums";

type RenameFileDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  node: TreeNode<FileSystemNodeData> | null;
  onSubmit: (id: string, newName: string, newExtension: string) => void;
};

export const RenameFileDialog: React.FC<RenameFileDialogProps> = ({
  isOpen,
  onClose,
  node,
  onSubmit,
}) => {
  const form = useForm<RenameFileInput>({
    values: {
      extension:
        (node?.data as FileSystemNodeData<FileSystemNodeType.FILE>)
          ?.extension ?? "",
      name: node?.data?.name ?? "",
    },
    resolver: zodResolver(renameFileSchema),
    mode: "onChange",
  });

  const handleSubmit = (data: RenameFileInput) => {
    if (node) {
      onSubmit(node.id, data.name, data.extension);
    }
  };

  if (!node) return null;

  return (
    <FormDialog
      form={form}
      formFields={renameFileFields}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Rename File"
    />
  );
};
