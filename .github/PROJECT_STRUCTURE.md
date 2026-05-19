# 📁 HaiAu CRM — Project Structure

**Purpose:** Complete project structure reference for AI agents to understand and replicate for new projects.

**Last Updated:** April 2026  
**Technology Stack:** React Native 0.84 + TypeScript + Redux Toolkit + React Navigation

---

## 🌳 Complete Directory Tree

```
haiau/
├── .bundle/                    # Bundler cache
├── .github/                    # GitHub configuration & AI instructions
│   ├── agents/                 # Custom agents for specific tasks
│   ├── copilot-instructions.md # Main Copilot guidelines
│   ├── instructions/           # File-scoped instructions
│   │   ├── component.instructions.md
│   │   ├── redux.instructions.md
│   │   ├── services.instructions.md
│   │   ├── styles.instructions.md
│   │   └── typescript.instructions.md
│   ├── prompts/                # Workflow templates (invoke with /)
│   │   ├── plan.prompt.md
│   │   ├── code-review.prompt.md
│   │   ├── tdd.prompt.md
│   │   ├── build-fix.prompt.md
│   │   └── refactor.prompt.md
│   └── skills/                 # Specialized guidelines (auto-load)
│       ├── clean-rn-cache/
│       ├── error-handling/
│       ├── karpathy-guidelines/
│       ├── navigation-patterns/
│       ├── rn-frontend-patterns/
│       ├── security-review/
│       ├── store-patterns/
│       ├── ui-consistency/
│       ├── tdd-workflow/
│       └── vercel-react-native-skills/
├── .vscode/                    # VS Code workspace settings
├── android/                    # Android native code
│   ├── app/
│   │   ├── src/
│   │   │   └── main/          # Main android app
│   │   └── build.gradle
│   └── build.gradle
├── ios/                        # iOS native code
│   ├── HaiAu/
│   │   ├── AppDelegate.swift  # Entry point
│   │   ├── Info.plist
│   │   ├── LaunchScreen.storyboard
│   │   └── Images.xcassets/
│   ├── HaiAu.xcodeproj/
│   └── Podfile                # iOS dependencies
├── src/                        # 🎯 Main source code (production)
│   ├── App.tsx                # Root component
│   ├── stylesRoot.tsx         # Global root styles
│   ├── assets/                # Static assets (images, icons)
│   │   └── icons/
│   ├── component/             # Reusable UI components (dumb)
│   │   ├── AppCalender/
│   │   ├── AttachmentList/
│   │   ├── DetailHeaderCard/
│   │   ├── Header/
│   │   ├── HeaderChild/
│   │   ├── HeaderTab/
│   │   ├── HeaderTitle/
│   │   ├── InfoRow/
│   │   ├── ModalAreaSearch/
│   │   ├── ModalCustomerSearch/
│   │   ├── ModalFilterCustom/
│   │   ├── ModalMultiSelect/
│   │   ├── ModalRepresentative/
│   │   ├── NetworkProvider/   # Network connectivity wrapper
│   │   ├── RemoveModal/
│   │   ├── SelectModal/
│   │   └── Svg/               # SVG icon components
│   ├── config/                # Configuration
│   │   ├── index.ts           # App configuration
│   │   └── useNetworkStatus.ts
│   ├── constant/              # Constants
│   │   ├── index.tsx          # Strings, enums, literals
│   │   └── scale.ts           # Responsive design scale
│   ├── container/             # Screen/Page components (smart, connected to Redux)
│   │   ├── Auth/              # Auth screens (login, register, etc.)
│   │   ├── Customers/         # Customer management screens
│   │   ├── Home/              # Dashboard/home screen
│   │   ├── Report/            # Report screens
│   │   ├── Settings/          # Settings screens
│   │   ├── Splash/            # Splash screen
│   │   └── Stock/             # Stock management screens
│   ├── helpers/               # Utility functions & types
│   │   ├── ambient.d.ts       # TypeScript ambient declarations
│   │   ├── index.tsx          # Helper functions
│   │   └── storagehelper.ts   # AsyncStorage helpers
│   ├── hooks/                 # Custom React hooks
│   │   ├── useActivityList.ts
│   │   ├── useEquipmentList.ts
│   │   ├── useServiceList.ts
│   │   ├── useSolutionList.ts
│   │   └── useValidate.ts
│   ├── navigators/            # React Navigation setup
│   │   ├── index.tsx          # Root navigator
│   │   ├── authstack.tsx      # Auth stack (login, register)
│   │   ├── mainstack.tsx      # Main app stack
│   │   ├── mytabs.tsx         # Bottom tab navigator
│   │   ├── rootnavigation.ts  # Navigation ref & methods
│   │   └── screennames.ts     # Screen name constants
│   ├── services/              # API layer (Axios calls)
│   │   ├── index.ts           # API client setup
│   │   ├── activities.ts      # Activities API
│   │   ├── auth.ts            # Auth API
│   │   ├── customer.ts        # Customer API
│   │   ├── equipment.ts       # Equipment API
│   │   ├── home.ts            # Home/Dashboard API
│   │   ├── manage.ts          # Management API
│   │   ├── opportunity.ts     # Opportunity API
│   │   ├── saleOrder.ts       # Sale Order API
│   │   ├── service.ts         # Service API
│   │   ├── stock.ts           # Stock API
│   │   └── helpers/           # API helpers (interceptors, etc.)
│   ├── store/                 # Redux state management
│   │   ├── index.tsx          # Store configuration (createStore)
│   │   ├── auth/              # Auth slice & thunks
│   │   ├── customer/          # Customer slice & thunks
│   │   ├── equipment/         # Equipment slice & thunks
│   │   ├── home/              # Home slice & thunks
│   │   ├── manager/           # Manager slice & thunks
│   │   ├── opportunity/       # Opportunity slice & thunks
│   │   ├── service/           # Service slice & thunks
│   │   └── stock/             # Stock slice & thunks
│   ├── theme/                 # Design system (colors, typography, spacing)
│   │   └── index.ts           # Theme object (colors, fonts, sizes)
│   ├── transactions/          # Transaction/payment related
│   │   ├── index.tsx
│   │   └── Resources/
│   ├── types/                 # TypeScript types (shared across app)
│   │   ├── index.tsx          # Main types export
│   │   ├── activity.ts
│   │   ├── auth.ts
│   │   ├── customer.ts
│   │   ├── equipment.ts
│   │   ├── home.ts
│   │   ├── manage.ts
│   │   ├── saleOrder.ts
│   │   ├── service.ts
│   │   └── stock.ts
│   └── utils/                 # Utility functions
│       ├── api.tsx            # API utilities (error handling, etc.)
│       ├── apiBearer.tsx      # Axios instance with Bearer token
│       └── [other utils]
├── __tests__/                 # Test files
│   └── App.test.tsx
├── tasks/                     # Task tracking
│   ├── lessons.md
│   └── todo.md
├── .env                       # Environment variables (NOT in git)
├── .eslintrc.js               # ESLint configuration
├── .gitignore                 # Git ignore rules
├── .prettierrc.js             # Prettier format config
├── .watchmanconfig            # Watchman config (file watcher)
├── app.json                   # React Native app config
├── babel.config.js            # Babel configuration (transpiler)
├── BASE_PROJECT_PROMPT.md     # Base project context
├── Gemfile                    # Ruby dependencies (iOS build tools)
├── Gemfile.lock               # Ruby lock file
├── index.js                   # Entry point (RN bootstrapper)
├── jest.config.js             # Jest testing config
├── metro.config.js            # Metro bundler config
├── package.json               # npm dependencies & scripts
├── package-lock.json          # Dependency lock file
├── README.md                  # Project readme
├── ReactotronConfig.js        # Debugging tool (Redux DevTools)
├── tsconfig.json              # TypeScript configuration
└── yarn.lock                  # Yarn lock file
```

---

## 📋 Folder Purposes & Naming Conventions

### **🎯 Core Folders**

#### **`src/`** — Main Source Code
- **Rule:** All production code lives here
- **Organization:** By feature domain (customers, orders, auth, etc.)
- **Size:** Keep files < 800 lines, functions < 50 lines

#### **`src/component/`** — Reusable UI Components
- **Purpose:** Presentational, stateless components
- **Naming:** `PascalCase` folder + `PascalCase.tsx` file
  - ✅ `DetailHeaderCard/DetailHeaderCard.tsx`
  - ✅ `ModalCustomerSearch/ModalCustomerSearch.tsx`
- **Pattern:** Each component gets its own folder
- **Contents:**
  ```
  Component/
  ├── Component.tsx      # Main component
  ├── styles.ts          # StyleSheet.create (ALWAYS use this)
  ├── Component.test.tsx # Unit tests
  └── types.ts           # Component-specific types (if needed)
  ```

#### **`src/container/`** — Smart/Connected Components (Screens)
- **Purpose:** Screen-level components connected to Redux
- **Naming:** `PascalCase` folder + domain-based
  - ✅ `Customers/CustomerList.tsx`
  - ✅ `Home/Dashboard.tsx`
- **Pattern:** Each screen is a domain folder
- **Contents:**
  ```
  Customers/
  ├── CustomerList.tsx       # List screen
  ├── CustomerDetail.tsx     # Detail screen
  ├── CustomerEdit.tsx       # Edit screen
  ├── styles.ts              # Shared styles for domain
  └── types.ts               # Domain types
  ```

#### **`src/store/`** — Redux State Management
- **Purpose:** Redux slices (reducers + thunks)
- **Structure:** One folder per domain
  ```
  store/
  ├── index.tsx              # Store configuration
  ├── customer/
  │   ├── slice.ts           # Reducer (createSlice)
  │   ├── thunks.ts          # Async actions (createAsyncThunk)
  │   └── selectors.ts       # Redux selectors
  ├── auth/
  ├── equipment/
  └── [other domains]
  ```
- **Pattern:** Each domain has its own slice with thunks

#### **`src/services/`** — API Layer
- **Purpose:** Axios API calls (no business logic)
- **Naming:** `camelCase.ts` matching domain
  - ✅ `customer.ts` → `getCustomers()`, `createCustomer()`
  - ✅ `equipment.ts` → `getEquipment()`, `updateEquipment()`
- **Structure:**
  ```
  services/
  ├── index.ts               # API instance setup
  ├── customer.ts            # Customer endpoints
  ├── equipment.ts           # Equipment endpoints
  └── helpers/               # Interceptors, error handlers
  ```

#### **`src/types/`** — TypeScript Interfaces
- **Purpose:** Centralized type definitions
- **Naming:** `camelCase.ts` matching domain
  - ✅ `customer.ts` → `Customer`, `CustomerList`, `CreateCustomerPayload`
  - ✅ `equipment.ts` → `Equipment`, `EquipmentFilter`
- **Pattern:** Re-export all from `index.tsx`
  ```typescript
  // types/index.tsx
  export * from './customer';
  export * from './equipment';
  export * from './auth';
  ```

#### **`src/hooks/`** — Custom React Hooks
- **Naming:** `useCamelCase.ts`
  - ✅ `useActivityList.ts`
  - ✅ `useEquipmentList.ts`
  - ✅ `useValidate.ts`
- **Purpose:** Reusable hook logic (fetch, validation, state)
- **Pattern:** Logic extracted from components, reusable across screens

#### **`src/navigators/`** — React Navigation Setup
- **Files:**
  - `index.tsx` → Root navigator
  - `authstack.tsx` → Auth flow
  - `mainstack.tsx` → Main app flow
  - `mytabs.tsx` → Bottom tab navigator
  - `screennames.ts` → Screen name constants
  - `rootnavigation.ts` → Navigation ref (navigate from outside component)

#### **`src/config/`** — Application Configuration
- `index.ts` → App-wide constants (API_URL, timeouts, etc.)
- `useNetworkStatus.ts` → Network connectivity hook

#### **`src/constant/`** — Constants & Enums
- `index.tsx` → String constants, enums, literals
- `scale.ts` → Responsive design scaling

#### **`src/theme/`** — Design System
- `index.ts` → Colors, typography, spacing
- **Contents:**
  ```typescript
  export const theme = {
    colors: {
      primary: '#007AFF',
      background: '#FFFFFF',
      error: '#FF3B30',
    },
    typography: {
      large: { fontSize: 18, fontWeight: 'bold' },
      body: { fontSize: 14 },
    },
    spacing: { xs: 4, sm: 8, md: 16, lg: 24 },
  };
  ```

#### **`src/utils/`** — Utility Functions
- `api.tsx` → Error handling, API utilities
- `apiBearer.tsx` → Axios instance with Bearer token interceptor
- Other utility files as needed

#### **`src/helpers/`** — Helper Functions & Types
- `index.tsx` → General helper functions
- `storagehelper.ts` → AsyncStorage wrappers
- `ambient.d.ts` → TypeScript ambient declarations

---

### **🔧 Configuration Folders**

#### **`.github/`** — GitHub Configuration
- `copilot-instructions.md` → Main AI guidelines
- `instructions/` → File-scoped instructions (auto-apply)
- `prompts/` → Workflow templates (invoke with `/`)
- `skills/` → Specialized guidelines (auto-load)
- `agents/` → Custom agents

#### **`android/`** — Android Native Code
- App-specific: `android/app/src/main/`
- Build config: `build.gradle`

#### **`ios/`** — iOS Native Code
- App code: `ios/HaiAu/`
- Project config: `ios/HaiAu.xcodeproj/`
- Pod config: `Podfile`

#### **`__tests__/`** — Test Files
- Mirror `src/` structure
- Naming: `*.test.tsx` or `*.spec.tsx`

---

## 📊 Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts (npm start, test, etc.) |
| `tsconfig.json` | TypeScript compiler options, path aliases |
| `app.json` | React Native app metadata |
| `babel.config.js` | Babel transpiler config |
| `metro.config.js` | Metro bundler config (RN specific) |
| `jest.config.js` | Jest testing framework config |
| `index.js` | RN entry point (bootstrapper) |
| `.env` | Environment variables (API_URL, tokens) |
| `.eslintrc.js` | ESLint rules |
| `.prettierrc.js` | Code formatter rules |
| `Gemfile` | iOS Ruby dependencies |

---

## 🏗️ Naming Conventions

### **Folders**
- **Components:** `PascalCase` (`CustomerList/`, `ModalSearch/`)
- **Utils/Services/Hooks:** `camelCase` (`useActivityList.ts`, `customer.ts`)
- **Types/Constants:** `camelCase` (`customer.ts`, `scale.ts`)

### **Files**
- **React Components:** `PascalCase.tsx` (`CustomerList.tsx`)
- **TypeScript:** `camelCase.ts` (`customer.ts`, `useActivityList.ts`)
- **Tests:** `PascalCase.test.tsx` (`CustomerList.test.tsx`)
- **Styles:** `styles.ts` (ALWAYS use this, no inline styles)

### **Exports**
- **Component:**
  ```tsx
  export function CustomerList() { ... }
  export default CustomerList;
  ```
- **Service:**
  ```typescript
  export const getCustomers = () => api.get('/customers');
  ```
- **Hook:**
  ```typescript
  export const useActivityList = () => { ... };
  ```

---

## 📦 Dependencies Overview

| Dependency | Purpose |
|---|---|
| `react-native` | UI framework |
| `@react-navigation/*` | Navigation/routing |
| `@reduxjs/toolkit` | State management |
| `axios` | HTTP client |
| `react-i18next` | Internationalization |
| `react-native-calendars` | Calendar component |
| `react-native-reanimated` | Smooth animations |
| `react-native-gesture-handler` | Gesture detection |
| `react-native-maps` | Map component |
| `typescript` | Type safety |

---

## 🔗 Import Paths

```typescript
// Root barrel exports (avoid ./src/ prefix)
import { useActivityList } from '@hooks/useActivityList';
import { getCustomers } from '@services/customer';
import { authSlice } from '@store/auth';
import type { Customer } from '@types';

// Same-level imports
import styles from './styles';
```

---

## 📝 File Structure Template

### **Component**
```
src/component/
├── CustomerCard/
│   ├── CustomerCard.tsx
│   ├── styles.ts
│   ├── types.ts (if needed)
│   └── CustomerCard.test.tsx
```

### **Container (Screen)**
```
src/container/
├── Customers/
│   ├── CustomerList.tsx
│   ├── CustomerDetail.tsx
│   ├── styles.ts
│   ├── types.ts
│   └── hooks/ (screen-specific hooks)
```

### **Redux Slice**
```
src/store/
├── customer/
│   ├── slice.ts (createSlice)
│   ├── thunks.ts (createAsyncThunk)
│   ├── selectors.ts (Redux selectors)
│   └── types.ts (state interface)
```

### **Service Layer**
```
src/services/
├── customer.ts
│   ├── getCustomers()
│   ├── getCustomerById()
│   ├── createCustomer()
│   ├── updateCustomer()
│   └── deleteCustomer()
```

---

## 🎯 Architecture Principles

1. **Feature-Based Organization** — Group by domain (customers, orders), not by type (components, hooks)
2. **Separation of Concerns:**
   - **Components:** UI only (no Redux, no API calls)
   - **Containers:** Redux connection (smart components)
   - **Services:** API calls only
   - **Hooks:** Reusable logic
3. **Type Safety** — All exported functions have explicit return types
4. **Immutability** — Never mutate, always spread/map/filter
5. **Styling** — Always use `StyleSheet.create`, no inline styles (except dynamic values)
6. **Error Handling** — Follow `error-handling` skill pattern (status + error response)
7. **Performance** — Use memoization, useCallback, FlatList with keys

---

## 📚 Related Documentation

- [copilot-instructions.md](./copilot-instructions.md) — AI guidelines
- [redux.instructions.md](./instructions/redux.instructions.md) — Redux patterns
- [component.instructions.md](./instructions/component.instructions.md) — Component patterns
- [services.instructions.md](./instructions/services.instructions.md) — Service layer patterns
