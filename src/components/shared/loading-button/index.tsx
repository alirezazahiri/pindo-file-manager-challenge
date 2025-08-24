import { Button } from "@/components/ui";
import { Loader2Icon } from "lucide-react";

interface LoadingButtonProps {
  variant?: "default" | "destructive";
  isLoading: boolean;
  onClick?: () => void;
  loadingText?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  variant = "default",
  isLoading,
  onClick,
  loadingText = "Loading...",
  text = "Confirm",
  type = "button",
}) => {
  return (
    <Button
      variant={variant === "destructive" ? "destructive" : "default"}
      onClick={onClick}
      disabled={isLoading}
      className="w-full sm:w-auto"
      type={type}
    >
      {isLoading && <Loader2Icon className="size-4 animate-spin" />}
      {isLoading ? loadingText : text}
    </Button>
  );
};
