import { Errors } from "@/constants/errors";
import { FILE_EXTENSION_REGEX, FILE_NAME_REGEX } from "@/constants/regex";
import { FormField } from "@/types/form";
import { z } from "zod";

export const addFileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: Errors.FILE_NAME_REQUIRED })
    .regex(FILE_NAME_REGEX, {
      message: Errors.FILE_NAME_INVALID_CHARACTERS,
    }),
  extension: z
    .string()
    .trim()
    .min(1, { message: Errors.FILE_EXTENSION_REQUIRED })
    .regex(FILE_EXTENSION_REGEX, {
      message: Errors.FILE_EXTENSION_INVALID_CHARACTERS,
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
