import { FILE_NAME_REGEX } from "@/constants/regex";
import { FormField } from "@/types/form";
import { z } from "zod";

export const addFolderSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Folder name is required" })
    .regex(FILE_NAME_REGEX, {
      message: "Folder name contains invalid characters",
    }),
});

export type AddFolderInput = z.infer<typeof addFolderSchema>;

export const addFolderFields: FormField<AddFolderInput>[] = [
  {
    type: "text",
    name: "name",
    label: "Folder Name",
    placeholder: "Enter folder name",
  },
];
