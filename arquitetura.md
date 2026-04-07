# 📐 Arquitetura do Projeto React - English System (Frontend)

## 🎯 Visão Geral

Plataforma de gestão de escola de inglês com **3 perfis de acesso**: `admin`, `teacher` e `student`.

Utiliza **Vite + React + TypeScript** com arquitetura **modular baseada em features**, onde cada módulo tem sua própria estrutura de pastas.

---

## 🏗️ Estrutura de Pastas

### 📍 Raiz do Projeto
```
├── index.html              # HTML de entrada
├── vite.config.ts          # Configurações Vite
├── tailwind.config.ts      # Configurações Tailwind
├── tsconfig.json           # Configurações TypeScript
├── package.json            # Dependências e scripts
└── src/                    # Código-fonte principal
```

---

## 📁 Estrutura `/src`

### **1. `/src/components`** 📦
Componentes reutilizáveis e específicos de features.

```
components/
├── layout/
│   ├── AppSidebar.tsx             # Sidebar com navegação por role
│   └── DashboardLayout.tsx        # Layout base das páginas autenticadas
├── shared/
│   └── StatCard.tsx               # Card de estatística reutilizável
└── ui/                            # Componentes shadcn/ui (não editar manualmente)
    └── (button, card, dialog, ...)
```

> Ao criar features, adicione subpastas como:
> `components/student/`, `components/teacher/`, `components/admin/`

---

### **2. `/src/pages`** 🖥️
Páginas principais por role. Cada arquivo representa uma rota.

```
pages/
├── Index.tsx                      # Redirect baseado em role
├── LandingPage.tsx                # Página pública inicial
├── LoginPage.tsx                  # Autenticação
├── NotFound.tsx
├── admin/
│   ├── AdminDashboard.tsx
│   ├── AdminStudents.tsx
│   ├── AdminWaitingList.tsx
│   └── AdminFinance.tsx
├── teacher/
│   ├── TeacherDashboard.tsx
│   ├── TeacherSchedule.tsx
│   ├── TeacherStudents.tsx
│   ├── TeacherLessonDetail.tsx
│   └── TeacherPostClass.tsx
├── student/
│   ├── StudentDashboard.tsx
│   ├── StudentClasses.tsx
│   ├── StudentMaterials.tsx
│   ├── StudentNotices.tsx
│   ├── StudentPayments.tsx
│   └── StudentProfile.tsx
└── shared/
    └── MaterialsManager.tsx       # Compartilhado entre teacher e admin
```

---

### **3. `/src/services`** 🔗
Camada de comunicação com backend (HTTP). Um arquivo por domínio.

```
services/
├── api.ts                 # Cliente HTTP base (fetch wrapper com auth token)
├── authService.ts         # Login, logout, refresh token, me
├── studentService.ts      # Classes, materials, packages, notices, profile
├── teacherService.ts      # Schedule, students, lesson notes, materials
├── adminService.ts        # Students, waiting list, finance, materials
└── index.ts               # Exportações centralizadas
```

**Variável de ambiente necessária:**
```env
VITE_API_BASE_URL=http://localhost:3000
```

---

### **4. `/src/types`** 📋
Definições de TypeScript globais e compartilhadas.

```
types/
└── index.ts               # Todos os types/interfaces do projeto
```

**Principais types:**
- `User`, `UserRole`
- `StudentProfile`, `StudentClass`, `StudentMaterial`, `StudentPackage`, `StudentNotice`
- `Teacher`, `Lesson`, `PostClassNote`
- `AdminStudent`, `WaitingListEntry`, `FinanceSummary`, `Payment`
- `Material`, `PaginatedResponse<T>`

---

### **5. `/src/contexts`** 🔄
Context API para estado global.

```
contexts/
└── AuthContext.tsx         # Estado de autenticação + useAuth hook
```

---

### **6. `/src/hooks`** 🪝
Custom hooks reutilizáveis.

```
hooks/
├── use-mobile.tsx          # Detect mobile viewport
└── use-toast.ts            # Sistema de toast notifications
```

---

### **7. `/src/data`** 🗄️
Dados mock para desenvolvimento (substituir por services quando o backend estiver pronto).

```
data/
└── studentPortal.ts        # Mock data: classes, materials, packages, notices
```

---

### **8. `/src/lib`** 🛠️

```
lib/
└── utils.ts                # Utilitários gerais (ex: cn() para classnames)
```
- Redirecionamentos

---

### **9. `/src/utils`** 🛠️
Funções utilitárias pequenas e reutilizáveis.

```
utils/
├── idGenerator.ts          # Geração de IDs
├── notifications.ts        # Helpers de notificações
├── systemNotifications.ts  # Sistema de notificações do sistema
└── index.ts                # Exportações centralizadas
```

**Responsabilidade:** 
- Funções puras e isoladas
- Formatadores, validadores, parsers
- Helpers sem estado

---

### **10. Pastas de Features Específicas** 🎯

#### Exemplo: `/src/components/comercial`
```
comercial/
├── Dashboard.tsx           # Componente principal
├── ProposalForm.tsx
├── ProposalsTable.tsx
├── ProposalViewer.tsx
├── ProposalDetailsModal/   # Componente com subcomponentes
│   ├── index.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── types.ts                # Types específicos do comercial
└── ProposalDetailsModal/   # Componentes internos complexos
```

#### Exemplo: `/src/components/almoxarifado`
```
almoxarifado/
├── StockInventoryView.tsx  # View principal
├── components/             # Componentes internos
│   ├── StockCard.tsx
│   ├── StockFilter.tsx
│   └── ...
├── forms/                  # Formulários da feature
│   ├── AddStockForm.tsx
│   ├── EditStockForm.tsx
│   └── ...
├── hooks/                  # Custom hooks específicos
│   ├── useStockFilter.ts
│   └── useStockMovement.ts
├── tables/                 # Tabelas da feature
│   ├── StockTable.tsx
│   └── MovementTable.tsx
├── views/                  # Diferentes visualizações
│   ├── ListView.tsx
│   └── GridView.tsx
└── types/                  # Types específicos
    └── stock.types.ts
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│                     App.tsx (Root)                       │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│            AuthContext + AppDataContext                  │
│            (Provedores de Estado Global)                 │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│                 MainNavigation.tsx                       │
│                (React Router Setup)                      │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│              Screens (ComercialScreen.tsx)               │
│            (Componentes de Página Inteira)               │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│          Feature Components (comercial/*.tsx)            │
│          (Componentes de Negócio + UI)                   │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│              Services (comercialService.ts)              │
│            (Chamadas para Backend BFF)                   │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│              Backend / API (BFF)                         │
└─────────────────────────────────────────────────────────┘
```

---

## 💡 Padrões de Código

### 1. **Importações Centralizadas** (`index.ts`)
Cada pasta com múltiplos exports usa um `index.ts`:
```typescript
// services/index.ts
export * as authService from './authService';
export { api } from './api';
export { storageService } from './storageService';
```

**Benefício:** Simplifica imports nos componentes
```typescript
// ❌ Sem index.ts
import { api } from '@/services/api';
import { authService } from '@/services/authService';

// ✅ Com index.ts
import { api, authService } from '@/services';
```

---

### 2. **Estrutura de Componentes**
```typescript
// src/components/comercial/ProposalForm.tsx
import { useState } from 'react';
import { useAuth } from '@/context';
import { comercialService } from '@/services';
import { ProposalFormData } from './types';

interface ProposalFormProps {
  onSuccess?: () => void;
  initialData?: Proposal;
}

export const ProposalForm: React.FC<ProposalFormProps> = ({ 
  onSuccess, 
  initialData 
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ProposalFormData>(...);

  const handleSubmit = async (data: ProposalFormData) => {
    try {
      await comercialService.createProposal(data);
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao criar proposta:', error);
    }
  };

  return (
    // JSX aqui
  );
};
```

---

### 3. **Estrutura de Services**
```typescript
// src/services/comercialService.ts
import { api } from './api';
import { Proposal, ProposalData } from '@/types';

export const comercialService = {
  async createProposal(data: ProposalData): Promise<Proposal> {
    return api.post<Proposal>('/proposals', data);
  },

  async getProposals(): Promise<Proposal[]> {
    return api.get<Proposal[]>('/proposals');
  },

  async updateProposal(id: string, data: Partial<ProposalData>): Promise<Proposal> {
    return api.patch<Proposal>(`/proposals/${id}`, data);
  },

  async deleteProposal(id: string): Promise<void> {
    return api.delete(`/proposals/${id}`);
  },
};
```

---

### 4. **Estrutura de Types**
```typescript
// src/types/index.ts (global)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// src/components/comercial/types.ts (local)
export interface Proposal {
  id: string;
  clientName: string;
  items: ProposalItem[];
  totalValue: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
}

export interface ProposalItem {
  equipmentId: string;
  quantity: number;
  unitPrice: number;
}
```

---

## 🚀 Tecnologias Principais

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **React** | 18+ | Framework UI |
| **TypeScript** | 5+ | Type Safety |
| **Vite** | 5+ | Build Tool |
| **Radix UI** | 1.2+ | Componentes base sem estilos |
| **Tailwind CSS** | (se usado) | Estilização utilitária |
| **React Router** | 6+ | Roteamento |
| **React Context API** | - | State Management |

---

## 📝 Convenções de Nomeação

| Item | Convenção | Exemplo |
|------|-----------|---------|
| **Componentes** | PascalCase | `ProposalForm.tsx`, `StockCard.tsx` |
| **Arquivos de hook** | camelCase + use | `useAuth.ts`, `usePagination.ts` |
| **Arquivos service** | camelCase + Service | `comercialService.ts` |
| **Arquivos context** | PascalCase + Context | `AuthContext.tsx` |
| **Interfaces/Types** | PascalCase | `Proposal`, `User`, `ApiError` |
| **Constantes** | UPPER_SNAKE_CASE | `API_BASE_URL`, `AUTH_TOKEN_KEY` |
| **Variáveis** | camelCase | `formData`, `isLoading` |
| **Funções** | camelCase | `handleSubmit()`, `formatDate()` |

---

## 🔐 Autenticação e Segurança

1. **Token armazenado em localStorage** via `storageService`
2. **Context de Autenticação** centralizado em `AuthContext.tsx`
3. **Headers de autenticação** adicionados automaticamente pelo cliente HTTP (`api.ts`)
4. **Redirecionamento para login** feito na navegação

---

## 📦 Scripts do Package.json

```json
{
  "scripts": {
    "dev": "vite",                    // Inicia dev server
    "build": "vite build",            // Build para produção
    "preview": "vite preview",        // Preview do build
    "test": "echo \"Error: no test\""  // (a implementar)
  }
}
```

---

## ✅ Checklist para Novo Projeto

Ao criar um novo projeto seguindo este padrão:

- [ ] Setup Vite + React + TypeScript
- [ ] Instalar Radix UI e outras libs
- [ ] Criar estrutura de pastas (src/components, services, etc)
- [ ] Criar `AuthContext.tsx` e `AppDataContext.tsx`
- [ ] Implementar cliente HTTP (`api.ts`)
- [ ] Implementar `storageService.ts`
- [ ] Configurar React Router em `MainNavigation.tsx`
- [ ] Criar `screens/` para cada módulo principal
- [ ] Criar `components/` organizados por feature
- [ ] Criar `services/` com um arquivo por módulo
- [ ] Definir `types/` globais
- [ ] Criar custom hooks em `hooks/`
- [ ] Adicionar utilitários em `utils/`
- [ ] Configurar estilos globais em `styles/globals.css`

---

## 🎓 Resumo

| Pasta | O quê | Por quê |
|-------|-------|--------|
| `/components` | UI e Componentes | Organizar apresentação |
| `/screens` | Páginas inteiras | Uma por rota principal |
| `/services` | Comunicação Backend | Centralizar APIs |
| `/context` | Estado Global | Compartilhar dados |
| `/hooks` | Lógica Reutilizável | DRY (Don't Repeat Yourself) |
| `/types` | Definições TypeScript | Type Safety |
| `/styles` | CSS Global | Temas e Resets |
| `/navigation` | Rotas | Setup de Roteamento |
| `/utils` | Funções Helper | Lógica pequena |

---

**Criado em:** April 2026  
**Projeto:** Frontend HIS  
**Versão Arquitetura:** 1.0
