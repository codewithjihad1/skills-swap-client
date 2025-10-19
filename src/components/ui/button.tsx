import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-white hover:bg-secondary shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
                gradient:
                    "bg-[#21BF73] text-white",
                destructive:
                    "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
                outline:
                    "border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
                secondary:
                    "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-100 dark:hover:bg-slate-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
                ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-gray-100",
                link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
                success:
                    "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
                warning:
                    "bg-yellow-600 text-white hover:bg-yellow-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
            },
            size: {
                sm: "h-8 px-3 text-xs rounded-md gap-1.5",
                default: "h-10 px-4 py-2 rounded-md",
                lg: "h-12 px-6 text-base rounded-lg",
                xl: "h-14 px-8 text-lg rounded-lg",
                icon: "h-10 w-10 rounded-md",
                "icon-sm": "h-8 w-8 rounded-md",
                "icon-lg": "h-12 w-12 rounded-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
