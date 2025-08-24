"use client";

import { Button } from "@/components/ui";
import { TreeNode } from "@/core";
import { useConfirmation } from "@/hooks";
import { FileSystemNodeData } from "@/types";
import { toast } from "sonner";
import { DeleteConfirmDialog, TreeNodeComponent } from "./components";
import { useFileSystem } from "@/providers";

type DeleteConfirmationData = {
  node: TreeNode<FileSystemNodeData> | null;
};

export const FileManagerFeature = () => {
  const { tree } = useFileSystem();

  const { open: openDeleteConfirmation, ...deleteConfirmationProps } =
    useConfirmation<DeleteConfirmationData>({
      initialData: {
        node: null,
      },
      onConfirm: () => {
        toast.success("Hello World");
      },
    });

  const rootNode = tree.root;

  return (
    <>
      <section className="container mx-auto p-4">
        <TreeNodeComponent tree={tree} node={rootNode} level={0} />
      </section>
      <DeleteConfirmDialog {...deleteConfirmationProps} />
    </>
  );
};
