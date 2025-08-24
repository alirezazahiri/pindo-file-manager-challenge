import { FormDialog } from "@/components/shared";
import {
  addFolderFields,
  AddFolderInput,
  addFolderSchema,
} from "@/features/file-manager/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TreeNode } from "@/core";
import type { FileSystemNodeData } from "@/types";

type AddFolderDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (parentId: string, name: string) => void;
  parentNode: TreeNode<FileSystemNodeData> | null;
};

export const AddFolderDialog: React.FC<AddFolderDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  parentNode,
}) => {
  const form = useForm<AddFolderInput>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(addFolderSchema),
    mode: "onChange",
  });

  const handleSubmit = (data: AddFolderInput) => {
    onSubmit(parentNode?.id ?? "", data.name);
  };

  return (
    <FormDialog
      form={form}
      formFields={addFolderFields}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add Folder"
    />
  );
};
