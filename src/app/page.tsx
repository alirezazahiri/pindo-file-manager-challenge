"use client";

import { FileManagerFeature } from "@/features/file-manager";
import { useFileSystem } from "@/providers";

const FileManagerPage = () => {
  const { tree } = useFileSystem();

  console.log(tree);

  return <FileManagerFeature />;
};

export default FileManagerPage;
