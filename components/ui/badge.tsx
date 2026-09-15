import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#4a5441] text-white",
        secondary:
          "border-transparent bg-[#eef1ea] text-[#2d3427]",
        destructive:
          "border-transparent bg-red-100 text-red-800",
        outline: "text-[#2d3427] border border-[#dce1d5]",
        sage: "border-transparent bg-[#e3e8dc] text-[#3c4632] font-semibold",
        khaki: "border-transparent bg-[#f2f4ed] text-[#4d5641]",
        warm: "border-transparent bg-[#f7f5ed] text-[#635b44]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
