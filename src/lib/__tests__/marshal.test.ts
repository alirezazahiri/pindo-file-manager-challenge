import { marshalTree, unmarshalTree } from "../marshal";
import { Tree } from "@/core";
import {
  FileSystemFileNode,
  FileSystemFolderNode,
} from "@/models";
import { compareFileSystemNodes } from "@/lib/file-system";
import { FileSystemNodeData } from "@/types";

describe("marshal", () => {
  it("should marshal a tree into a string and unmarshal it back into the same tree", () => {
    const tree = new Tree<FileSystemNodeData>(
      FileSystemFolderNode.generate("root"),
      compareFileSystemNodes
    );

    const file1 = FileSystemFileNode.generate("file1", "txt", tree.root.id);
    const file2 = FileSystemFileNode.generate("file2", "txt", tree.root.id);
    const file3 = FileSystemFileNode.generate("file3", "txt", tree.root.id);
    const folder1 = FileSystemFolderNode.generate("folder1", tree.root.id);
    const folder2 = FileSystemFolderNode.generate("folder2", tree.root.id);
    const file1_folder1 = FileSystemFileNode.generate("file1_folder1", "txt", folder1.id);
    const file2_folder1 = FileSystemFileNode.generate("file2_folder1", "txt", folder1.id);
    const file1_folder2 = FileSystemFileNode.generate("file1_folder2", "txt", folder2.id);
    const file2_folder2 = FileSystemFileNode.generate("file2_folder2", "txt", folder2.id);

    tree.addNode(tree.root.id, file1);
    tree.addNode(tree.root.id, file2);
    tree.addNode(tree.root.id, file3);
    tree.addNode(tree.root.id, folder1);
    tree.addNode(tree.root.id, folder2);
    tree.addNode(folder1.id, file1_folder1);
    tree.addNode(folder1.id, file2_folder1);
    tree.addNode(folder2.id, file1_folder2);
    tree.addNode(folder2.id, file2_folder2);

    const marshalled = marshalTree(tree);
    const unmarshalled = unmarshalTree(marshalled, compareFileSystemNodes);

    expect(unmarshalled).toEqual(tree);
  });
});
