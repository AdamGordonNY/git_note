import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import * as React from "react";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-between gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        component:
          "border-transparent bg-purple-500/10 text-purple-500 shadow hover:bg-purple-500/20",
        workflow:
          "border-transparent bg-blue-500/10  text-blue-500 shadow hover:bg-blue-500/20",
        knowledge:
          "border-transparent bg-green-500/10  text-green-500 shadow hover:bg-green-500/20",
        regular:
          "bg-dark-800/10 text-white-200 hover:bg-dark-800/20 border-transparent shadow",
      },
    },
    defaultVariants: {
      variant: "workflow",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function CreateTypeBadge({
  className,
  variant,

  ...props
}: BadgeProps) {
  if (!variant) return <span className="text-3xl text-[red]">BROKEN TAG</span>;

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Image
        src={`/icons/${variant}.svg`}
        alt={variant ?? ""}
        width={16}
        height={16}
      />
      <div className="text-sm capitalize">{variant}</div>
    </div>
  );
}

export { CreateTypeBadge, badgeVariants };
