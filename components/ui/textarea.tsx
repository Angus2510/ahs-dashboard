import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-20 w-full rounded-md border border-[#e2e5dc] bg-white px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-[#8b9384] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#6b775c] disabled:cursor-not-allowed disabled:opacity-50 text-[#1e231d]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
