import { FolderClosedIcon } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {/* TODO: not sure if this is the best icon, but... whatever */}
          <FolderClosedIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">
            File Manager
          </h1>
        </div>
      </div>
    </header>
  );
};
