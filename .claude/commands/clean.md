---
description: "Dọn dẹp cache React Native, Metro, Watchman. Dùng khi Metro crash, bundler lỗi lạ, sau update package."
allowed-tools: ["Bash"]
---

Dọn dẹp cache React Native và cài đặt lại dependencies.

**Mức độ:** $ARGUMENTS
(Options: `metro` — chỉ Metro cache | `full` — full clean + reinstall | để trống — hỏi)

---

## Nếu không có argument — hỏi user

"Bạn muốn clean ở mức nào?
1. **Metro only** — Reset Metro cache (nhanh, ~10s)
2. **Full clean** — Xóa node_modules + cache + reinstall (~5-10 phút)
3. **Full + iOS Pods** — Như trên + pod install (chỉ Mac, ~15 phút)"

---

## Metro Only (option 1)

```bash
# Windows: dừng Metro trước, rồi restart với --reset-cache
yarn start --reset-cache
```

---

## Full Clean (option 2)

Thực hiện **tuần tự**, mỗi bước xong mới chạy bước tiếp:

```bash
# 1. Dừng Metro nếu đang chạy (Ctrl+C)

# 2. Xóa Watchman cache
watchman watch-del-all

# 3. Xóa node_modules và lock files
rm -rf node_modules package-lock.json yarn.lock

# 4. Xóa Metro cache
rm -rf /tmp/metro-* $TMPDIR/react-native-packager-cache-* $TMPDIR/metro-bundler-cache-*

# 5. Xóa npm cache
npm cache clean --force

# 6. Cài lại dependencies
yarn install

# 7. Khởi động lại Metro
yarn start --reset-cache
```

---

## Full + iOS Pods (option 3 — chỉ trên Mac)

Thêm sau bước 6:

```bash
# iOS Pods
cd ios && pod cache clean --all && rm -rf Pods Podfile.lock && pod install && cd ..
```

---

## Android build cache (nếu có lỗi Android)

```bash
cd android && ./gradlew clean && cd ..
```

---

## Sau khi clean

- Chờ Metro khởi động đầy đủ trước khi mở app
- Nếu vẫn lỗi → kiểm tra `package.json` version conflicts
- Báo cáo `adb reverse tcp:9090 tcp:9090` nếu dùng Reactotron
