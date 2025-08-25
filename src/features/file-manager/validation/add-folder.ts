import { Errors } from "@/constants/errors";
import { FOLDER_NAME_REGEX } from "@/constants/regex";
import { FormField } from "@/types/form";
import { z } from "zod";

export const addFolderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: Errors.FOLDER_NAME_REQUIRED })
    .regex(FOLDER_NAME_REGEX, {
      message: Errors.FOLDER_NAME_INVALID_CHARACTERS,
    }),
});

export type AddFolderInput = z.infer<typeof addFolderSchema>;

export const addFolderFields: FormField<AddFolderInput>[] = [
  {
    type: "text",
    name: "name",
    label: "Folder Name (required)",
    placeholder: "Enter folder name",
  },
];
