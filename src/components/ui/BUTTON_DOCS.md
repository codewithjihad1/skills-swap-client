# Button Component Documentation

## Overview

A professional, reusable button component with multiple variants, sizes, and full dark/light mode support. Features gradient effects and professional styling matching the project theme.

## Import

```tsx
import { Button } from "@/components/ui/button";
// or
import { Button } from "@/components/ui";
```

## Basic Usage

```tsx
<Button>Default Button</Button>
<Button variant="gradient">Gradient Button</Button>
<Button variant="outline" size="lg">Large Outline Button</Button>
```

## Variants

-   `default` - Primary blue button
-   `gradient` - Beautiful gradient effect (blue to purple)
-   `outline` - Outlined button
-   `secondary` - Secondary styled button
-   `ghost` - Transparent background with hover effects
-   `link` - Link styled button
-   `destructive` - Red destructive actions
-   `success` - Green success actions
-   `warning` - Yellow/orange warning actions

## Sizes

-   `sm` - Small button
-   `default` - Default size
-   `lg` - Large button
-   `xl` - Extra large button
-   `icon` - Square icon button
-   `icon-sm` - Small square icon button
-   `icon-lg` - Large square icon button

## Props

All standard button props are supported, plus:

-   `variant` - Button style variant
-   `size` - Button size
-   `asChild` - Render as child component (for links, etc.)

## Examples

### Basic Buttons

```tsx
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
```

### With Icons

```tsx
import { Download, ArrowRight } from "lucide-react";

<Button>
  <Download className="mr-2 h-4 w-4" />
  Download
</Button>

<Button variant="gradient" size="lg">
  Get Started
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>
```

### Icon Only Buttons

```tsx
<Button variant="outline" size="icon">
    <Settings className="h-4 w-4" />
</Button>
```

### As Link

```tsx
import Link from "next/link";

<Button asChild>
    <Link href="/dashboard">Go to Dashboard</Link>
</Button>;
```

### Loading State

```tsx
import { Loader2 } from "lucide-react";

<Button disabled>
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Loading...
</Button>;
```

### Gradient Button (Featured)

The gradient variant creates a beautiful blue-to-purple gradient effect that works perfectly in both light and dark modes:

```tsx
<Button variant="gradient" size="lg">
    Explore Academic Courses
</Button>
```

## Dark Mode Support

All button variants automatically adapt to dark mode with appropriate colors and contrast ratios.

## Professional Theme

The buttons use the professional blue theme (#2563eb) established throughout the application, ensuring consistent branding and user experience.
