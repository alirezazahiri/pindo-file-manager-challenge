import type { InputProps } from "@/components/ui/input";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type CommonFormFieldProps<T extends FieldValues> = {
  label: string;
  placeholder: string;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  helperText?: string | ((value: any) => string);
  name: Path<T>;
};

type Fields =
  | Omit<InputProps, "control"> & {
      type: FormFieldType;
    };

export type FormField<T extends FieldValues> = CommonFormFieldProps<T> &
  Fields & {
    shouldRender?: (formValues: T) => boolean;
    shouldDisable?: (formValues: T) => boolean;
  };

export type FormFieldType = "text"; // TODO: any new field type must be added here (e.g. "select" | "password")
