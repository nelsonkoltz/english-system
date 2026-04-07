# Frontend Architecture Pattern

## Quick Overview
This project uses **Vite + React + TypeScript** with a **feature-based modular architecture**.

## Directory Structure

### `/src/components` 📦
- **Purpose:** All UI components organized by feature/module
- **Structure:** Features can have subfolders (components, hooks, types, forms, tables, views)
- **Example:** `components/comercial/`, `components/engenharia/`, `components/almoxarifado/`

### `/src/screens` 🖥️
- **Purpose:** Full-page/screen components - one per main module
- **Files:** `ComercialScreen.tsx`, `EngineeringScreen.tsx`, `AlmoxarifadoScreen.tsx`, etc.
- **Role:** Orchestrate feature components

### `/src/services` 🔗
- **Purpose:** HTTP requests and backend communication
- **Structure:** One file per module/domain (comercialService.ts, engineeringService.ts, etc.)
- **Key:** api.ts (base HTTP client), authService.ts, storageService.ts

### `/src/context` 🔄
- **Purpose:** Global state management (Context API)
- **Files:** AuthContext.tsx, AppDataContext.tsx
- **Use:** Authentication, user data, app-wide configuration

### `/src/hooks` 🪝
- **Purpose:** Custom reusable hooks
- **Examples:** useAuth, usePagination, useNotifications, useQuadroTasks
- **Benefit:** Separate logic from presentation

### `/src/types` 📋
- **Purpose:** Global TypeScript types and interfaces
- **Note:** Features can also have their own `types.ts` file

### `/src/styles` 🎨
- **Purpose:** Global CSS, variables, resets
- **File:** globals.css

### `/src/navigation` 🧭
- **Purpose:** React Router setup and routes configuration
- **File:** MainNavigation.tsx

### `/src/utils` 🛠️
- **Purpose:** Small reusable utility functions
- **Examples:** idGenerator.ts, formatters, validators, helpers

---

## Key Patterns

### Index Files (Centralized Exports)
Each folder with multiple exports uses an `index.ts` file for cleaner imports.

```typescript
// services/index.ts
export * as authService from './authService';
export { api } from './api';
export { storageService } from './storageService';
```

### Component Structure
```typescript
interface ComponentProps {
  onSuccess?: () => void;
  data?: T;
}

export const ComponentName: React.FC<ComponentProps> = ({ onSuccess, data }) => {
  const { user } = useAuth();
  const [state, setState] = useState(...);
  
  return (/* JSX */);
};
```

### Service Structure
```typescript
export const featureService = {
  async getItems(): Promise<Item[]> {
    return api.get<Item[]>('/items');
  },
  
  async createItem(data: ItemData): Promise<Item> {
    return api.post<Item>('/items', data);
  },
  
  async updateItem(id: string, data: Partial<ItemData>): Promise<Item> {
    return api.patch<Item>(`/items/${id}`, data);
  },
  
  async deleteItem(id: string): Promise<void> {
    return api.delete(`/items/${id}`);
  },
};
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ProposalForm.tsx`, `StockCard.tsx` |
| Hooks | camelCase + use | `useAuth.ts`, `usePagination.ts` |
| Services | camelCase + Service | `comercialService.ts` |
| Types/Interfaces | PascalCase | `Proposal`, `User` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `AUTH_TOKEN` |
| Variables/Functions | camelCase | `formData`, `handleSubmit()` |

---

## Feature Development Workflow

When adding a new feature:

1. Create feature folder in `/components/[featureName]/`
2. Add main component and subcomponents
3. Create `types.ts` for feature-specific types
4. Optionally add `hooks/`, `forms/`, `tables/`, `views/` subfolders
5. Create corresponding `[featureName]Service.ts` in `/services`
6. Create `[FeatureName]Screen.tsx` in `/screens` if it's a main module
7. Add route in `navigation/MainNavigation.tsx`

---

## Data Flow

User Interaction → Component → Custom Hook/Service → HTTP Client → Backend (BFF) → Response → State Update → Re-render

---

## Tech Stack

- **React 18+** - UI Framework
- **TypeScript 5+** - Type Safety
- **Vite 5+** - Build Tool & Dev Server
- **Radix UI 1.2+** - Headless Components
- **React Router 6+** - Routing
- **React Context API** - State Management

---

## Install & Run

```bash
npm install
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
```

---

**Follow this structure for consistency across the project.**
