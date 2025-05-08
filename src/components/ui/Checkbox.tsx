
import * as React from "react";
import { cn } from "../../lib/utils";


export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition-colors",
            className
          )}
          {...props}
        />
        {label && <label className="text-sm text-gray-700">{label}</label>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

