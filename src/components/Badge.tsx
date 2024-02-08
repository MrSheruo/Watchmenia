import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-secondary-dark text-secondary shadow hover:bg-secondary/80 hover:text-secondary-dark-hover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = VariantProps<typeof badgeVariants> & ComponentProps<"div">;

export default function Badge({ variant, className, ...props }: BadgeProps) {
  return (
    <div
      className={twMerge(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
