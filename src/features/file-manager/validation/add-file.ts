import { Errors } from "@/constants/errors";
import { FILE_EXTENSION_REGEX, FILE_NAME_REGEX } from "@/constants/regex";
import { FormField } from "@/types/form";
import { z } from "zod";

export const addFileSchema = z
  .object({
    name: z.string().trim().optional().or(z.literal("")),
    extension: z
      .string()
      .trim()
      .min(1, { message: Errors.FILE_EXTENSION_REQUIRED })
      .transform((val) => {
        let lowerCaseVal = val.toLowerCase();
        if (lowerCaseVal.startsWith(".")) {
          lowerCaseVal = lowerCaseVal.slice(1);
        }
        return lowerCaseVal;
      })
      .refine((val) => FILE_EXTENSION_REGEX.test(val), {
        message: Errors.FILE_EXTENSION_INVALID_CHARACTERS,
      }),
  })
  .refine(
    (data) => {
      const extension = data.extension?.trim();
      const name = data.name?.trim();
      if (!!extension) {
        if (!!name) {
          return FILE_NAME_REGEX.test(name);
        }
        return true;
      }
      return !!name && FILE_NAME_REGEX.test(name);
    },
    {
      message: Errors.FILE_NAME_REQUIRED,
      path: ["name"],
    }
  )
  .refine(
    (data) => {
      const name = data.name?.trim();
      if (!!name) {
        return FILE_NAME_REGEX.test(name);
      }
      return true;
    },
    {
      message: Errors.FILE_NAME_INVALID_CHARACTERS,
      path: ["name"],
    }
  );

export type AddFileInput = z.infer<typeof addFileSchema>;

export const addFileFields: FormField<AddFileInput>[] = [
  {
    type: "text",
    name: "name",
    label: "File Name (optional if extension is provided)",
    placeholder: "Enter file name",
  },
  {
    type: "text",
    name: "extension",
    label: "File Extension",
    placeholder: "txt, md, etc.",
  },
];
