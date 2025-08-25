"use client";

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
import { FormGenerator } from "@/components/form-generator";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormField } from "@/types/form";

type FormDialogProps<T extends FieldValues> = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => Promise<void> | void;
  title: string;
  formFields: FormField<T>[];
  form: UseFormReturn<T>;
};

export const FormDialog = <T extends FieldValues>({
  isOpen,
  onClose,
  onSubmit,
  title,
  formFields,
  form,
}: FormDialogProps<T>) => {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    // TODO: this is because the form resets just a moment before the dialog closes and
    // it causes UI to be jumpy and not smooth
    // so defering the form reset makes the UI smoother
    setTimeout(() => {
      form.reset();
    }, 100);
    onClose();
  };

  const handleSubmit = async (data: T) => {
    setLoading(true);
    await onSubmit(data);
    setLoading(false);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-md"
        aria-describedby="form-dialog-description"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <FormGenerator<T>
          onSubmit={handleSubmit}
          fields={formFields}
          form={form}
          className="flex flex-col gap-5"
        >
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="w-full sm:w-auto bg-transparent"
              type="reset"
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="default"
              isLoading={loading}
              loadingText="Submitting..."
              text="Submit"
            />
          </DialogFooter>
        </FormGenerator>
      </DialogContent>
    </Dialog>
  );
};
