import React from "react";
import { UseFormReturn, FieldValues, FormProvider } from "react-hook-form";
import { getFieldComponent } from "./registry";
import { FormField } from "@/types/form";

export interface FormGeneratorProps<T extends FieldValues> {
  fields: FormField<T>[];
  onSubmit: (data: T) => void | Promise<void>;
  form: UseFormReturn<T>;
  children?: React.ReactNode;
  className?: string;
}

export function FormGenerator<T extends FieldValues>({
  fields,
  onSubmit,
  form,
  className,
  children,
}: FormGeneratorProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {fields.map((field) => {
          const { shouldRender, shouldDisable, ...rest } = field;
          const FieldComponent = getFieldComponent(field.type);

          if (!FieldComponent) {
            console.warn(
              `No component registered for field type: ${field.type}`
            );
            return null;
          }

          if (field.shouldRender && !field.shouldRender(form.getValues())) {
            return null;
          }

          return (
            <FieldComponent
              key={field.name}
              control={form.control}
              defaultValue={field.defaultValue}
              helperText={field.helperText}
              disabled={field.shouldDisable?.(form.getValues())}
              {...rest}
            />
          );
        })}
        {children}
      </form>
    </FormProvider>
  );
}
