# MatMax Wellness Studio Layout System

This layout system provides a structured, modular approach to building consistent UIs across the MatMax Wellness Studio application. It follows the guidelines defined in `layoutguidelines.mdc` to ensure standardization across all application modules.

## Directory Structure

```
src/
└── core/
    └── ui/
        ├── layouts/
        │   ├── components/       # Layout components (Header, Sidebar, etc.)
        │   │   ├── Header/       # Header components
        │   │   ├── Sidebar/      # Sidebar components
        │   │   ├── Footer/       # Footer components
        │   │   └── Content/      # Content containers
        │   ├── providers/        # LayoutProvider for central state management
        │   └── templates/        # Layout templates (AuthLayout, DashboardLayout)
        └── utils/                # Utility functions
```

## Core Components

### 1. Layout Provider

The `LayoutProvider` is the central state management component for all layout-related state and functionality. It handles:

- Responsive state (mobile, tablet, desktop detection)
- Sidebar state (open/closed)
- Theme management (light/dark/system)
- Layout type (dashboard, auth, etc.)

Always use the `useLayout` hook to access this context:

```tsx
const { isMobile, theme, toggleSidebar } = useLayout();
```

### 2. Layout Templates

#### DashboardLayout

Used for all authenticated/protected pages, providing:
- Sidebar navigation
- Header with module navigation
- Main content area
- Optional footer

```tsx
// Example usage
import { DashboardLayout } from '@/src/core/ui/layouts/templates/DashboardLayout';

export default function MyPage() {
  return (
    <DashboardLayout>
      <h1>My Page Content</h1>
    </DashboardLayout>
  );
}
```

#### AuthLayout

Used for all authentication pages (sign-in, sign-up), providing:
- Brand showcase on the left
- Authentication form on the right
- Responsive behavior for mobile

### 3. Layout Components

#### Header System

The header includes:
- Module navigation with the `HeaderNav` component
- User menu with authentication controls
- Blockchain wallet connection (when applicable)
- Language selector
- Responsive handling for different screen sizes

The `HeaderNav` component provides the module switching system with:
- Color-coded modules for visual distinction
- Dropdown menus for sub-module navigation
- Proper ARIA attributes for accessibility
- Integration with the sidebar through `useLayout`

#### Sidebar System

The sidebar provides:
- Main navigation within the current module
- Logo display
- Theme toggle in the footer
- Responsive behavior (auto-collapse on mobile)
- Keyboard navigation support

#### Content Components

- `PageContainer`: Manages consistent spacing and max-width
- `PageHeader`: Standardized page titles and action buttons

## Module Navigation System

The module navigation system in the header allows for switching between major application features. Each module:

1. Has a unique color theme
2. Opens its corresponding section in the sidebar
3. Can have child items in a dropdown
4. Uses consistent icons and styling

This system is designed for future expansion, as new modules can be added by extending the `navItems` array in `HeaderNav.tsx`.

## Implementation Guidelines

1. **Always use the layout templates** for pages:
   ```tsx
   import { DashboardLayout } from '@/src/core/ui/layouts/templates/DashboardLayout';
   ```

2. **Use the `useLayout` hook** for responsive adjustments:
   ```tsx
   const { isMobile, isTablet, isDesktop } = useLayout();
   ```

3. **For class composition, use the `cn()` utility**:
   ```tsx
   import { cn } from '@/src/core/utils/styling';
   
   className={cn(
     "base-classes", 
     conditional && "conditional-classes",
     className // Allow external overrides
   )}
   ```

4. **When extending components**:
   - Place new layout components in the appropriate directory
   - Always accept and forward the `className` prop for customization
   - Use the `useLayout` hook for responsive behavior

5. **Maintain brand consistency**:
   - Use MatMax Wellness Studio logo appropriately
   - Follow the color system for modules
   - Maintain consistent spacing and typography

## Anti-patterns to Avoid

- ❌ **DO NOT** add header/footer directly in app/layout.tsx
- ❌ **DO NOT** create layout elements outside the layout system
- ❌ **DO NOT** bypass the layout templates for pages
- ❌ **DO NOT** implement custom responsive logic outside useLayout
- ❌ **DO NOT** modify the module system without considering the entire application 