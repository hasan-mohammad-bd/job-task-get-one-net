
import * as React from "react";
import { cn } from "../../lib/utils";


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "destructive" | "link";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          
         
          variant === "default" && "bg-purple-600 text-white hover:bg-purple-700",
          variant === "outline" && "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
          variant === "secondary" && "bg-gray-100 text-gray-900 hover:bg-gray-200",
          variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
          variant === "link" && "text-purple-600 underline-offset-4 hover:underline bg-transparent",
          
          
          size === "default" && "h-10 py-2 px-4 text-sm",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-12 px-8 text-base",
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };