---
name: clean-rn-cache
description: Dọn dẹp toàn bộ cache của React Native, Watchman, Metro bundler và cài đặt lại node_modules để sửa lỗi xung đột.
---

# Hướng dẫn dành cho Copilot CLI

Khi user yêu cầu dọn dẹp cache của React Native hoặc chạy skill này, hãy đề xuất thực thi tuần tự các lệnh shell sau:

1. Xóa cache của Watchman: 
   `watchman watch-del-all`
2. Xóa thư mục node_modules và file khóa: 
   `rm -rf node_modules package-lock.json yarn.lock`
3. Dọn dẹp cache của npm (hoặc yarn): 
   `npm cache clean --force`
4. Dọn dẹp cache của Metro Bundler: 
   `rm -rf /tmp/metro-*`
5. Cài đặt lại các gói phụ thuộc: 
   `npm install`
6. Xóa cache của CocoaPods (nếu user đang dùng Mac và chạy iOS): 
   `cd ios && pod cache clean --all && rm -rf Pods && pod install && cd ..`

Hãy hỏi người dùng xem họ có muốn bỏ qua bước số 6 (iOS) nếu họ đang làm việc trên Windows/Android không.