import { FormDialog } from "@/components/shared";
import type { TreeNode } from "@/core";
import type { FileSystemNodeData } from "@/types";
import { RenameFolderInput, renameFolderSchema } from "../../validation";
import { renameFolderFields } from "../../validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type RenameFolderDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  node: TreeNode<FileSystemNodeData> | null;
  onSubmit: (id: string, newName: string) => void;
};

export const RenameFolderDialog: React.FC<RenameFolderDialogProps> = ({
  isOpen,
  onClose,
  node,
  onSubmit,
}) => {
  const form = useForm<RenameFolderInput>({
    values: {
      name: node?.data?.name ?? "",
    },
    resolver: zodResolver(renameFolderSchema),
    mode: "onChange",
  });

  const handleSubmit = async (data: RenameFolderInput) => {
    if (node) {
      onSubmit(node.id, data.name);
    }
  };

  if (!node) return null;

  return (
    <FormDialog
      form={form}
      formFields={renameFolderFields}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Rename Folder"
    />
  );
};
