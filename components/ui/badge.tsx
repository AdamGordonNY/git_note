import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "paragraph-3-medium inline-flex items-center gap-1 rounded-[3px] border bg-black-700 px-0.5 py-2 transition-colors ",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground hover:bg-primary/80 border-transparent bg-black-700",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        knowledge: "text-green-500",
        component: "text-blue-500",
        workflow: "text-purple-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
