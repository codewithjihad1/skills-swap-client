# Skill Swap - Frontend

A modern, responsive web application for skill sharing and learning, built with Next.js 15 and React 19.

## 🚀 Tech Stack

-   **Framework**: Next.js 15 with App Router
-   **UI Library**: React 19
-   **Styling**: Tailwind CSS 4
-   **Language**: TypeScript
-   **Linting**: ESLint with Next.js config

## 📦 Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file (optional):

```bash
cp .env.example .env.local
```

## 🛠 Development

### Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Development Server

The development server runs on [http://localhost:3000](http://localhost:3000) by default.

## 🏗 Project Structure

```
frontend/
├── src/
│   ├── app/                    # App Router pages and layouts
│   │   ├── globals.css        # Global styles with CSS variables
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx          # Home page
│   │   └── favicon.ico       # Site favicon
│   └── components/            # Reusable React components
│       ├── layouts/           # Layout components
│       │   ├── Header.tsx    # Site header component
│       │   └── Footer.tsx    # Site footer component
│       └── ui/               # UI components
├── public/                    # Static assets
│   ├── *.svg                 # SVG icons and images
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Styling

### Tailwind CSS Configuration

The project uses Tailwind CSS 4 with custom theme configuration:

-   **Color Scheme**: Custom CSS variables for primary, secondary, and accent colors
-   **Dark Mode**: Automatic dark mode support based on system preferences
-   **Typography**: Geist Sans and Geist Mono fonts
-   **Responsive Design**: Mobile-first approach

### CSS Variables

Global CSS variables are defined in `src/app/globals.css`:

```css
:root {
    /* Base colors */
    --background: #ffffff;
    --foreground: #171717;

    /* Primary palette */
    --color-primary: #2563eb;
    --color-secondary: #059669;
    --color-accent: #7c3aed;

    /* Additional color schemes available */
}
```

## 🧩 Components

### Layout Components

#### Header (`src/components/layouts/Header.tsx`)

-   Navigation header (to be implemented)
-   Responsive design
-   Dark mode support

#### Footer (`src/components/layouts/Footer.tsx`)

-   **Features**:

    -   Fully responsive design (mobile-first)
    -   Dark mode support
    -   Three-column layout on desktop, single column on mobile
    -   Social media links with icons
    -   Dynamic copyright year
    -   Hover effects and smooth transitions

-   **Sections**:

    -   **Brand Section**: Company name and description
    -   **Quick Links**: Navigation to key pages (Browse Skills, Teach, Community, About)
    -   **Support**: Help center, contact, privacy policy, terms of service
    -   **Bottom Bar**: Copyright notice and social media icons

-   **Styling**:

    -   Uses Tailwind CSS utility classes
    -   Integrates with global CSS variables
    -   Accessible design with proper ARIA labels
    -   Semantic HTML structure

-   **Usage**:

```tsx
import Footer from "@/components/layouts/Footer";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
```

### UI Components

The `src/components/ui/` directory is reserved for reusable UI components such as:

-   Buttons
-   Cards
-   Modals
-   Forms
-   Navigation elements

## 🌙 Dark Mode

Dark mode is automatically handled through:

-   CSS `prefers-color-scheme` media query
-   Tailwind's `dark:` variant classes
-   CSS custom properties that adapt to the theme

## 📱 Responsive Design

The application follows a mobile-first approach:

-   **Mobile**: Single column layouts, stacked navigation
-   **Tablet**: Optimized spacing and typography
-   **Desktop**: Multi-column layouts, expanded navigation

### Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

## ♿ Accessibility

-   Semantic HTML structure
-   ARIA labels for interactive elements
-   Keyboard navigation support
-   Color contrast compliance
-   Screen reader friendly

## 🔧 Configuration Files

### Next.js (`next.config.ts`)

-   Turbopack enabled for faster builds
-   TypeScript configuration
-   Image optimization settings

### TypeScript (`tsconfig.json`)

-   Strict type checking enabled
-   Path aliases configured
-   Next.js optimizations

### ESLint (`eslint.config.mjs`)

-   Next.js recommended rules
-   Custom styling rules
-   TypeScript support

## 🚀 Deployment

### Build Process

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For production, set appropriate values for your deployment environment.

## 🔍 Best Practices

### Component Development

-   Use TypeScript for all components
-   Implement proper prop interfaces
-   Follow React hooks best practices
-   Use functional components

### Styling

-   Prefer Tailwind utility classes
-   Use CSS variables for theming
-   Maintain consistent spacing and typography
-   Ensure responsive design

### Performance

-   Optimize images with Next.js Image component
-   Use dynamic imports for code splitting
-   Implement proper loading states
-   Minimize bundle size

## 🤝 Contributing

1. Follow the coding standards defined in the main project
2. Ensure TypeScript strict mode compliance
3. Test responsive design on multiple devices
4. Run linting before committing
5. Update documentation for new components

## 📚 Resources

-   [Next.js 15 Documentation](https://nextjs.org/docs)
-   [React 19 Documentation](https://react.dev/)
-   [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🐛 Troubleshooting

### Common Issues

**Build Errors**:

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**TypeScript Errors**:

```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**Styling Issues**:

```bash
# Rebuild Tailwind CSS
npm run dev
```

---

For backend integration and full project setup, see the main [project documentation](../doc/contribute.md).
