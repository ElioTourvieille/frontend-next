import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-sm rounded whitespace-nowrap transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:shadow-none disabled:border-blue-300",
  {
    variants: {
      variant: {
        base: "text-gray-100 bg-blue-600 hover:bg-blue-600 focus:bg-blue-700 disabled:bg-blue-300",
        secondary:
          "bg-gray-600 text-gray-100 shadow-sm shadow-black hover:bg-gray-800 hover:shadow-md hover:shadow-black focus:bg-blue-700 focus:shadow-sm focus:shadow-blue-200 disabled:bg-blue-300",
        outline:
          "border border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600 focus:border-blue-700 focus:text-blue-700 disabled:text-blue-300",
        elevated:
          "bg-blue-600 text-gray-100 shadow-sm shadow-black hover:bg-blue-800 hover:shadow-md hover:shadow-black focus:bg-blue-700 focus:shadow-sm focus:shadow-blue-200 disabled:bg-blue-300",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "base",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
