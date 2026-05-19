# 🚀 New Project Template — Based on HaiAu Structure

Checklist to create a new React Native project using HaiAu's proven structure and patterns.

---

## 📋 Step 1: Project Setup

### Create React Native Project
```bash
# Initialize RN project
npx react-native@latest init MyAppName --template typescript

# Navigate to project
cd MyAppName

# Install key dependencies
npm install @react-navigation/native @react-navigation/native-stack
npm install @reduxjs/toolkit react-redux
npm install axios
npm install typescript @types/react-native
```

### Create `.github/` Structure
```bash
mkdir -p .github/{instructions,prompts,skills,agents}
```

---

## 📁 Step 2: Folder Structure

Copy HaiAu's folder structure:

```bash
# Create src/ structure
mkdir -p src/{component,container,config,constant,helpers,hooks,navigators,services,store,theme,transactions,types,utils,assets/icons}

# Create Redux slices (one per domain)
mkdir -p src/store/{auth,customer,equipment,home,order,service,stock}

# Create navigation stacks
mkdir -p src/navigators

# Create screens (by domain)
mkdir -p src/container/{Auth,Customers,Home,Settings,Stock}

# Create reusable components
mkdir -p src/component/{Header,Modal{Search,Filter,MultiSelect},Card,Button}

# Create tests
mkdir -p __tests__/{component,hooks,store,services}
```

---

## 📄 Step 3: Core Configuration Files

### `tsconfig.json`
```json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "*": ["src/*"],
      "@components/*": ["src/component/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/store/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"]
    },
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["**/node_modules", "**/Pods"]
}
```

### `babel.config.js`
```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['@react-native-firebase/perf'],
};
```

### `metro.config.js`
```javascript
const { getDefaultConfig } = require('metro-config');

module.exports = getDefaultConfig(__dirname);
```

### `jest.config.js`
```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  moduleNameMapper: {
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
  },
};
```

### `.eslintrc.js`
```javascript
module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
  },
};
```

### `.prettierrc.js`
```javascript
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  tabWidth: 2,
};
```

---

## 📝 Step 4: GitHub Instructions & Skills

### Copy from HaiAu:
```
.github/
├── copilot-instructions.md        (Core guidelines)
├── PROJECT_STRUCTURE.md           (Folder reference)
├── ARCHITECTURE.md                (Data flow diagrams)
├── instructions/
│   ├── component.instructions.md
│   ├── redux.instructions.md
│   ├── services.instructions.md
│   ├── styles.instructions.md
│   └── typescript.instructions.md
├── prompts/
│   ├── plan.prompt.md
│   ├── code-review.prompt.md
│   ├── tdd.prompt.md
│   ├── build-fix.prompt.md
│   └── refactor.prompt.md
└── skills/
    ├── karpathy-guidelines/
    ├── vercel-react-native-skills/
    ├── error-handling/
    ├── rn-frontend-patterns/
    ├── store-patterns/
    ├── navigation-patterns/
    ├── security-review/
    ├── ui-consistency/
    ├── tdd-workflow/
    └── clean-rn-cache/
```

---

## 🎯 Step 5: Core Files

### `src/theme/index.ts`
```typescript
export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5AC8FA',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#666666',
    border: '#CCCCCC',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
  typography: {
    heading1: { fontSize: 28, fontWeight: '700' },
    heading2: { fontSize: 22, fontWeight: '600' },
    heading3: { fontSize: 18, fontWeight: '600' },
    body: { fontSize: 14, fontWeight: '400' },
    caption: { fontSize: 12, fontWeight: '400' },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export type Theme = typeof theme;
```

### `src/constant/index.tsx`
```typescript
export const SCREEN_NAMES = {
  LOGIN: 'Login',
  HOME: 'Home',
  CUSTOMERS: 'Customers',
  CUSTOMER_DETAIL: 'CustomerDetail',
  SETTINGS: 'Settings',
} as const;

export const API_TIMEOUT = 30000;
export const TOAST_DURATION = 3000;
```

### `src/utils/apiBearer.tsx`
```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
});

// Bearer token interceptor
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### `src/App.tsx`
```typescript
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@store';
import { RootNavigator } from '@navigators';

export function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
```

---

## 🔄 Step 6: Redux Setup

### `src/store/index.tsx`
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { customerReducer } from './customer/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    // ... other slices
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### `src/store/auth/slice.ts`
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './thunks';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      });
  },
});

export const authReducer = authSlice.reducer;
```

### `src/store/auth/thunks.ts`
```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '@services/auth';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(email, password);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
```

---

## 🧩 Step 7: Navigation Setup

### `src/navigators/index.tsx`
```typescript
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStack } from './authstack';
import { MainStack } from './mainstack';

export function RootNavigator() {
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore token on app launch
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        // Restore token to Redux if exists
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) return null;

  return user ? <MainStack /> : <AuthStack />;
}
```

### `src/navigators/mainstack.tsx`
```typescript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './mytabs';
import { SCREEN_NAMES } from '@constant';

const Stack = createNativeStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        name={SCREEN_NAMES.HOME}
        component={BottomTabNavigator}
      />
      {/* Add modal screens here */}
    </Stack.Navigator>
  );
}
```

---

## 📦 Step 8: Component Template

### `src/component/ButtonPrimary/ButtonPrimary.tsx`
```typescript
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '@theme';

interface ButtonPrimaryProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const ButtonPrimary = React.memo(
  ({ title, onPress, loading, disabled }: ButtonPrimaryProps) => {
    return (
      <Pressable
        style={[
          styles.button,
          (disabled || loading) && styles.disabled,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
```

---

## 🧪 Step 9: Testing Setup

### `__tests__/component/Button.test.tsx`
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ButtonPrimary } from '@components/ButtonPrimary/ButtonPrimary';

describe('ButtonPrimary', () => {
  it('renders with title', () => {
    const { getByText } = render(
      <ButtonPrimary title="Click me" onPress={() => {}} />
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ButtonPrimary title="Click me" onPress={onPress} />
    );
    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

---

## 📋 Step 10: Package.json Scripts

```json
{
  "scripts": {
    "start": "react-native start",
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write src/",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit"
  }
}
```

---

## ✅ Final Checklist

- [ ] `src/` folder structure created
- [ ] `.github/` instructions & skills copied
- [ ] `tsconfig.json` with path aliases configured
- [ ] Redux store setup (store/index.tsx)
- [ ] Navigation setup (navigators/)
- [ ] Theme & constants defined
- [ ] API client setup (utils/apiBearer.tsx)
- [ ] Copilot instructions updated for new project
- [ ] First component created (with styles.ts)
- [ ] First hook created (useXYZ.ts)
- [ ] First screen created (container/)
- [ ] Redux slice created (store/)
- [ ] Service layer created (services/)
- [ ] Tests setup (jest.config.js)
- [ ] ESLint & Prettier configured
- [ ] .gitignore configured
- [ ] README.md created
- [ ] First commit pushed

---

## 🔗 Related Documentation

- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) — Detailed folder reference
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Data flow diagrams
- [copilot-instructions.md](./copilot-instructions.md) — AI guidelines
