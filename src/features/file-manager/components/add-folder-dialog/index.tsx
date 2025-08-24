import { FormDialog } from "@/components/shared";

type AddFolderDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddFolderDialog: React.FC<AddFolderDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {
        // TODO: implement me
      }}
      title="Add Folder"
    />
  );
};
