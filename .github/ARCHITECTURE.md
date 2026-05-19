# 🏗️ HaiAu CRM — Architecture & Data Flow

Visual reference for AI agents to understand project architecture, data flow, and patterns.

---

## 🔄 Application Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     USER INTERACTION (Screen)                       │
│               (Container Component - Customers/Home)                │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
        ┌───────────▼────────────┐   ┌───▼──────────────┐
        │   Redux Store          │   │   Local State    │
        │  (Global State)        │   │  (useState)      │
        │                        │   │                  │
        │ - auth                 │   │ - UI toggles     │
        │ - customer             │   │ - form input     │
        │ - equipment            │   │ - local filters  │
        │ - orders               │   └──────────────────┘
        └───────────┬────────────┘
                    │
        ┌───────────▼─────────────────┐
        │    Thunks (Async Actions)   │
        │  (createAsyncThunk)         │
        │                             │
        │ dispatch(getCustomers())    │
        │ → loading state             │
        │ → fetch from API            │
        │ → success/error payload     │
        └───────────┬─────────────────┘
                    │
        ┌───────────▼─────────────────┐
        │      Service Layer          │
        │   (Axios API Calls)         │
        │                             │
        │ GET /api/customers          │
        │ POST /api/customers         │
        │ PUT /api/customers/:id      │
        └───────────┬─────────────────┘
                    │
        ┌───────────▼─────────────────┐
        │      Backend API            │
        │    (SAP/REST Endpoints)     │
        │                             │
        │ Return JSON response        │
        └─────────────────────────────┘
```

---

## 📊 Component Hierarchy

```
App.tsx (Root)
│
├── NetworkProvider (Connection wrapper)
│
├── RootNavigator
│   │
│   ├── AuthStack (LOGIN FLOW)
│   │   ├── LoginScreen (container)
│   │   └── RegisterScreen (container)
│   │
│   └── MainStack (LOGGED IN)
│       │
│       ├── BottomTabNavigator (mytabs.tsx)
│       │   ├── HomeTab
│       │   ├── CustomersTab
│       │   ├── StockTab
│       │   ├── ReportTab
│       │   └── SettingsTab
│       │
│       └── Modals (Overlays)
│           ├── ModalCustomerSearch
│           ├── ModalFilterCustom
│           ├── ModalMultiSelect
│           └── [other modals]
```

---

## 🔀 Redux State Shape

```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    loading: boolean,
    error: string | null,
  },
  
  customer: {
    list: Customer[],
    selectedId: string | null,
    detail: Customer | null,
    loading: boolean,
    error: string | null,
    filters: { search: string, area: string },
  },
  
  equipment: {
    list: Equipment[],
    loading: boolean,
    error: string | null,
  },
  
  stock: {
    list: StockItem[],
    loading: boolean,
    error: string | null,
  },
  
  home: {
    dashboard: DashboardData,
    loading: boolean,
    error: string | null,
  },
  
  // ... other domains
}
```

---

## 📁 Feature Folder Structure (Example: Customers)

```
Customers Feature:
├── Type Definition (types/customer.ts)
│   ├── Customer
│   ├── CustomerFilter
│   └── CustomerPayload
│
├── Redux Slice (store/customer/)
│   ├── slice.ts (reducer + initial state)
│   ├── thunks.ts (getCustomers, createCustomer, etc.)
│   └── selectors.ts (useSelector helpers)
│
├── API Layer (services/customer.ts)
│   ├── getCustomers(filter)
│   ├── getCustomerById(id)
│   ├── createCustomer(data)
│   ├── updateCustomer(id, data)
│   └── deleteCustomer(id)
│
├── Hooks (hooks/useCustomerList.ts)
│   ├── Fetch + filter logic
│   ├── Auto-refresh on focus (useFocusEffect)
│   └── Exposed via custom hook
│
├── Reusable Components (component/)
│   ├── CustomerCard
│   ├── CustomerListItem
│   ├── CustomerForm
│   └── ModalCustomerSearch
│
└── Screens (container/Customers/)
    ├── CustomerList.tsx (main screen)
    ├── CustomerDetail.tsx (detail view)
    ├── CustomerEdit.tsx (edit form)
    └── styles.ts
```

---

## 🔌 Request/Response Pattern

### **✅ Correct Pattern (using Thunks)**

```typescript
// 1. Component dispatches thunk
const response = await dispatch(getCustomers(filter)).unwrap();

// 2. Thunk (store/customer/thunks.ts)
export const getCustomers = createAsyncThunk(
  'customer/getCustomers',
  async (filter, { rejectWithValue }) => {
    try {
      const data = await customerService.getCustomers(filter);
      return { status: true, data };
    } catch (error) {
      return rejectWithValue({ status: false, error });
    }
  }
);

// 3. Service (services/customer.ts)
export const getCustomers = (filter) => 
  api.get('/customers', { params: filter });

// 4. Reducer handles payload
builder.addCase(getCustomers.fulfilled, (state, action) => {
  state.list = action.payload.data;
  state.loading = false;
});
```

### **❌ Anti-patterns to Avoid**

```typescript
// ❌ DON'T: Try-catch in component
try {
  const data = await api.get('/customers');
} catch (e) {
  // Error handling scattered
}

// ❌ DON'T: API calls in component useEffect
useEffect(() => {
  api.get('/customers').then(setData); // Hard to test, mixes concerns
}, []);

// ❌ DON'T: Mutate Redux state
state.list.push(newCustomer); // ❌ Mutation

// ✅ DO: Return new array
return [...state.list, newCustomer]; // ✅ Immutable
```

---

## 🎯 Feature Development Checklist

When adding a new feature (e.g., "Equipment Management"):

```
1. CREATE TYPES (types/equipment.ts)
   □ Equipment interface
   □ EquipmentFilter interface
   □ API request/response types

2. CREATE SERVICE (services/equipment.ts)
   □ getEquipment()
   □ getEquipmentById()
   □ createEquipment()
   □ updateEquipment()
   □ deleteEquipment()

3. CREATE REDUX SLICE (store/equipment/)
   □ Initial state interface
   □ Slice reducers (setList, setError, etc.)
   □ Thunks (createAsyncThunk wrappers)
   □ Selectors (useSelector helpers)

4. CREATE COMPONENTS (component/)
   □ EquipmentCard (reusable item)
   □ EquipmentForm (form)
   □ EquipmentModal (if needed)
   □ styles.ts (StyleSheet.create)

5. CREATE HOOK (hooks/useEquipmentList.ts)
   □ Fetch logic
   □ Filter logic
   □ Auto-refresh (useFocusEffect)

6. CREATE SCREENS (container/Equipment/)
   □ EquipmentList.tsx
   □ EquipmentDetail.tsx
   □ EquipmentEdit.tsx
   □ Connect Redux via useSelector/useDispatch

7. CREATE TESTS
   □ Service tests (API calls)
   □ Slice tests (reducer + thunks)
   □ Component tests (render, props)
   □ Hook tests (logic)

8. ADD NAVIGATION
   □ Update rootnavigation.ts
   □ Add routes to MainStack

9. STYLE & POLISH
   □ ui-consistency: colors, spacing from theme/
   □ Responsive design (scale.ts)
   □ Error messages (use Toast)
   □ Loading states (ActivityIndicator)
```

---

## 📱 Common Patterns

### **Pattern 1: Fetch List with Filters**

```typescript
// Container/Customers/CustomerList.tsx
export function CustomerList() {
  const dispatch = useDispatch();
  const customers = useSelector(s => s.customer.list);
  const loading = useSelector(s => s.customer.loading);
  const [filter, setFilter] = useState({ search: '', area: '' });

  useFocusEffect(
    useCallback(() => {
      dispatch(getCustomers(filter));
    }, [filter, dispatch])
  );

  return (
    <View>
      <SearchBar value={filter.search} onChange={(search) => 
        setFilter({ ...filter, search })
      } />
      
      <FlatList
        data={customers}
        renderItem={({ item }) => <CustomerCard customer={item} />}
        keyExtractor={item => item.id}
      />
      
      {loading && <ActivityIndicator />}
    </View>
  );
}
```

### **Pattern 2: Form with Validation**

```typescript
// Container/Customers/CustomerEdit.tsx
export function CustomerEdit({ route }) {
  const { customerId } = route.params;
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    // Validate
    const newErrors = useValidate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save
    const response = await dispatch(updateCustomer({ customerId, ...form })).unwrap();
    if (response.status) {
      navigation.goBack();
    } else {
      Toast.show(response.error.message);
    }
  };

  return (
    <ScrollView>
      <TextInput 
        value={form.name}
        onChangeText={text => setForm({ ...form, name: text })}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <Button onPress={handleSave} title="Save" />
    </ScrollView>
  );
}
```

### **Pattern 3: Modal with Data**

```typescript
// Container/ModalCustomerSearch.tsx
export function ModalCustomerSearch({ visible, onSelect }) {
  const [search, setSearch] = useState('');
  const customers = useSelector(s => s.customer.list);
  
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView>
        <TextInput 
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
        
        <FlatList
          data={filtered}
          renderItem={({ item }) => (
            <Pressable onPress={() => onSelect(item)}>
              <Text>{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </Modal>
  );
}
```

---

## ⚡ Performance Optimization

| Issue | Solution | Pattern |
|-------|----------|---------|
| Long lists (100+) | Use FlashList | vercel-react-native-skills |
| Item re-renders | Memoize component | `React.memo(Item)` |
| Callback recreation | useCallback | `renderItem: useCallback(...)` |
| Style recreation | StyleSheet.create | `styles.ts` not inline |
| Redux re-renders | Minimize selectors | `useSelector(s => s.user.name)` not entire object |
| Image loading | Fix size + cache | Set width/height on Image |

---

## 🔐 Security Best Practices

- **Secrets:** Store in `.env` (never commit)
- **Token:** HTTP-only storage via AsyncStorage
- **API:** Use Bearer token (apiBearer.tsx)
- **Input:** Validate on client + server
- **Error messages:** Don't expose sensitive info

---

## 📚 See Also

- [copilot-instructions.md](./copilot-instructions.md) — Core guidelines
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) — File/folder reference
- [redux.instructions.md](./instructions/redux.instructions.md) — Redux patterns
- [error-handling skill](./skills/error-handling/SKILL.md) — Error patterns
- [store-patterns skill](./skills/store-patterns/SKILL.md) — State management
