import { IconButton } from "@/components/shared/icon-button";
import { EditIcon, FolderPlusIcon, PlusIcon, Trash2Icon } from "lucide-react";

type TreeNodeActionsProps = {
  isFolder: boolean;
  isRoot: boolean;
  onAddFile: () => void;
  onAddFolder: () => void;
  onRenameFolder: () => void;
  onDeleteNode: () => void;
  onRenameFile: () => void;
};

export const TreeNodeActions = ({
  isFolder,
  isRoot,
  onAddFile,
  onAddFolder,
  onRenameFolder,
  onDeleteNode,
  onRenameFile,
}: TreeNodeActionsProps) => {
  return (
    <div className="flex items-center gap-1 lg:opacity-0 group-hover:opacity-100 transition-opacity">
      {isFolder ? (
        <>
          <IconButton
            icon={PlusIcon}
            onClick={onAddFile}
            color="blue"
            title="Add File"
          />

          <IconButton
            icon={FolderPlusIcon}
            onClick={onAddFolder}
            color="green"
            title="Add Folder"
          />

          {!isRoot && (
            <>
              <IconButton
                icon={EditIcon}
                onClick={onRenameFolder}
                color="yellow"
                title="Rename Folder"
              />

              <IconButton
                icon={Trash2Icon}
                onClick={onDeleteNode}
                color="red"
                title="Delete Folder"
              />
            </>
          )}
        </>
      ) : (
        <>
          <IconButton
            icon={EditIcon}
            onClick={onRenameFile}
            color="yellow"
            title="Rename File"
          />

          <IconButton
            icon={Trash2Icon}
            onClick={onDeleteNode}
            color="red"
            title="Delete File"
          />
        </>
      )}
    </div>
  );
};
