import React from "react";
import { FormField } from "@/components/ui/form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { FormInputProps } from "./types";

export const FormInput = <T extends FieldValues>({
  label,
  name,
  control,
  rules,
  ...props
}: FormInputProps<T>) => {
  const { helperText, ...rest } = props;
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className={cn(
                "w-full",
                props.className
              )}
              {...field}
              {...rest}
            />
          </FormControl>
          <FormMessage>{helperText}</FormMessage>
        </FormItem>
      )}
    />
  );
};
