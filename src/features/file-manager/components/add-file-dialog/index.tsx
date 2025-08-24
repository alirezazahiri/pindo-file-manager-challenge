import { FormDialog } from "@/components/shared";

type AddFileDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddFileDialog: React.FC<AddFileDialogProps> = ({
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
      title="Add File"
    />
  );
};
