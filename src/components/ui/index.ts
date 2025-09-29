// Re-export Button component for easier imports
export { Button, buttonVariants } from "./button";

// Re-export Tabs component for easier imports
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

// Additional button utility types
export type ButtonVariant =
    | "default"
    | "gradient"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success"
    | "warning";

export type ButtonSize =
    | "sm"
    | "default"
    | "lg"
    | "xl"
    | "icon"
    | "icon-sm"
    | "icon-lg";
