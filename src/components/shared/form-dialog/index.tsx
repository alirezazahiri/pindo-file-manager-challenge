import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { useState } from "react";
import { LoadingButton } from "@/components/shared/loading-button";

type FormDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
  title: string;
  // TODO: add a formFields prop which is coupled with react-hook-form and zod
};

export const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: implement me
  };

  return (
    <Dialog open={isOpen} onOpenChange={!isLoading ? onClose : undefined}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:w-auto bg-transparent"
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="default"
              isLoading={isLoading}
              loadingText="Submitting..."
              text="Submit"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
