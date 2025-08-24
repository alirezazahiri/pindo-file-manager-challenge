"use client";

import { FormDialog } from "@/components/shared";
import {
  addFileFields,
  AddFileInput,
  addFileSchema,
} from "@/features/file-manager/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TreeNode } from "@/core";
import type { FileSystemNodeData } from "@/types";

type AddFileDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (parentId: string, name: string, extension: string) => void;
  parentNode: TreeNode<FileSystemNodeData> | null;
};

export const AddFileDialog: React.FC<AddFileDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  parentNode,
}) => {
  const form = useForm<AddFileInput>({
    defaultValues: {
      extension: "",
      name: "",
    },
    resolver: zodResolver(addFileSchema),
    mode: "onChange",
  });

  const handleSubmit = (data: AddFileInput) => {
    onSubmit(parentNode?.id ?? "", data.name, data.extension);
  };

  return (
    <FormDialog<AddFileInput>
      form={form}
      formFields={addFileFields}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add File"
    />
  );
};
