---
name: security-review
description: 'Security review checklist cho React Native / TypeScript. Use when: xử lý authentication, API keys, user input, sensitive data, trước khi commit code liên quan đến bảo mật.'
---

# Security Review — React Native

## When to Use

- Xử lý authentication / token
- Lưu trữ hoặc truyền dữ liệu nhạy cảm
- Xử lý user input
- Tích hợp API bên ngoài
- Trước khi commit code liên quan đến bảo mật

## Checklist

### 1. Secrets Management

```typescript
// SAI — Hardcode secret
const API_KEY = 'sk-xxxxx';
const BASE_URL = 'https://api.company.com';

// ĐÚNG — Dùng environment variables
import Config from 'react-native-config';
const API_KEY = Config.API_KEY;
const BASE_URL = Config.BASE_URL;
```

- [ ] Không hardcode API keys, tokens, passwords
- [ ] Secrets nằm trong `.env` (đã thêm vào `.gitignore`)
- [ ] Không commit secrets vào git history

### 2. Token Storage

```typescript
// SAI — AsyncStorage không mã hóa
await AsyncStorage.setItem('token', accessToken);

// ĐÚNG — Dùng encrypted storage
import EncryptedStorage from 'react-native-encrypted-storage';
await EncryptedStorage.setItem('token', accessToken);
```

- [ ] Access token lưu trong encrypted storage
- [ ] Refresh token mechanism hoạt động đúng
- [ ] Token được xóa khi logout

### 3. Input Validation

```typescript
// Luôn validate user input trước khi gửi API
const validate = (): boolean => {
  if (!email.trim()) {
    setError('Email là bắt buộc');
    return false;
  }
  if (!email.includes('@')) {
    setError('Email không hợp lệ');
    return false;
  }
  if (phone.length < 10) {
    setError('SĐT không hợp lệ');
    return false;
  }
  return true;
};
```

- [ ] Mọi user input được validate trước khi xử lý
- [ ] Whitelist validation (không blacklist)
- [ ] Error messages không leak thông tin nhạy cảm

### 4. API Security

- [ ] Mọi API call dùng HTTPS
- [ ] Bearer token được gửi qua Authorization header
- [ ] Token auto-refresh khi expired (interceptor)
- [ ] Không log request/response chứa sensitive data

### 5. Sensitive Data

```typescript
// SAI — Log sensitive data
console.log('Login:', { email, password });
console.log('Token:', accessToken);

// ĐÚNG — Chỉ log non-sensitive
console.log('Login attempt for userId:', userId);
```

- [ ] Không log passwords, tokens, hoặc PII
- [ ] Error messages generic cho user, chi tiết chỉ trong dev logs
- [ ] Không hiển thị sensitive data trên UI (mask password, truncate token)

### 6. Dependencies

- [ ] Chạy `npm audit` trước khi release
- [ ] Không dùng packages deprecated hoặc có known vulnerabilities
- [ ] Lock file (`package-lock.json`) đã commit

## Pre-Commit Checklist

Trước khi commit code liên quan đến bảo mật:

- [ ] Không có hardcoded secrets
- [ ] Input đã validated
- [ ] Token được lưu an toàn
- [ ] Không console.log sensitive data
- [ ] Error messages không leak internal details
