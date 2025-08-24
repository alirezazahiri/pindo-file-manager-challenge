import { FILE_EXTENSION_REGEX, FILE_NAME_REGEX } from "@/constants/regex";
import { FormField } from "@/types/form";
import { z } from "zod";

export const addFileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "File name is required" })
    .regex(FILE_NAME_REGEX, {
      message: "File name contains invalid characters",
    }),
  extension: z
    .string()
    .min(1, { message: "File extension is required" })
    .regex(FILE_EXTENSION_REGEX, {
      message: "File extension contains invalid characters",
    }),
});

export type AddFileInput = z.infer<typeof addFileSchema>;

export const addFileFields: FormField<AddFileInput>[] = [
  {
    type: "text",
    name: "name",
    label: "File Name",
    placeholder: "Enter file name",
  },
  {
    type: "text",
    name: "extension",
    label: "File Extension",
    placeholder: "txt, md, etc.",
  },
];
