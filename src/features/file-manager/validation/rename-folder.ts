import { addFolderFields, addFolderSchema } from "./add-folder";
import { FormField } from "@/types/form";
import { z } from "zod";

export const renameFolderSchema = addFolderSchema;
export type RenameFolderInput = z.infer<typeof renameFolderSchema>;
export const renameFolderFields: FormField<RenameFolderInput>[] = addFolderFields;