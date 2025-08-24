import { addFileFields, addFileSchema } from "./add-file";
import { FormField } from "@/types/form";
import { z } from "zod";

export const renameFileSchema = addFileSchema;
export type RenameFileInput = z.infer<typeof renameFileSchema>;
export const renameFileFields: FormField<RenameFileInput>[] = addFileFields;
