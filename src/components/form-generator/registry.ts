import type { ComponentType } from "react";
import type { FormFieldType } from "@/types/form";
import type { FieldValues } from "react-hook-form";
import { FormInput } from "./form-input";

export type FormFieldComponent<T extends FieldValues = any> =
  ComponentType<T> & {
    disabled?: boolean;
  };

const fieldRegistry = new Map<string, FormFieldComponent>();

export const registerField = (
  type: FormFieldType,
  component: FormFieldComponent
) => {
  fieldRegistry.set(type, component);
};

export const getFieldComponent = (
  type: string
): FormFieldComponent | undefined => {
  return fieldRegistry.get(type);
};

registerField("text", FormInput);
