import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type IconButtonProps = {
  icon: React.ElementType;
  onClick: () => void;
  color: "blue" | "green" | "yellow" | "red";
  title: string;
  disabled?: boolean;
};

export const IconButton = ({
  onClick,
  color,
  title,
  disabled,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-6 p-0", {
        "hover:bg-blue-100 hover:text-blue-700": color === "blue",
        "hover:bg-green-100 hover:text-green-700": color === "green",
        "hover:bg-yellow-100 hover:text-yellow-700": color === "yellow",
        "hover:bg-red-100 hover:text-red-700": color === "red",
      })}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      <props.icon className="size-4" />
    </Button>
  );
};
