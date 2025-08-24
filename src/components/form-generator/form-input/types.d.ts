import type { InputProps } from "@/components/ui/input";
import type { CommonFormFieldProps } from "@/types/form";
import type { FieldValues, UseFormReturn, Path } from "react-hook-form";

export interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, "error">,
    CommonFormFieldProps {
  name: Path<T>;
  control: UseFormReturn<T>["control"];
  label?: string;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  helperText?: string;
}
