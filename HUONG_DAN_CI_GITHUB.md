# Hướng dẫn chạy CI trên GitHub Actions

Tài liệu này hướng dẫn đưa dự án lên GitHub, cấu hình thông tin đăng nhập cho test và theo dõi workflow CI.

## 1. Chuẩn bị repository

Bạn cần có tài khoản GitHub, Git và Node.js/npm nếu muốn chạy kiểm tra trên máy trước khi đẩy code.

Trong thư mục dự án, kiểm tra trạng thái Git:

```powershell
git status
git branch --show-current
git remote -v
```

Workflow nằm tại `.github/workflows/ci.yml`. GitHub chỉ tự chạy workflow sau khi file này được commit và đẩy lên repository.

## 2. Tạo repository trên GitHub

1. Trên GitHub, chọn **New repository**.
2. Đặt tên repository, chọn quyền truy cập phù hợp.
3. Nếu dự án đã có ở máy, nên tạo repository trống trên GitHub (không thêm README, `.gitignore` hoặc license) để tránh xung đột lịch sử ban đầu.
4. Sao chép URL HTTPS hoặc SSH của repository.

Nếu thư mục dự án chưa được khởi tạo Git, chạy `git init` trước. Nếu đã có Git, không cần chạy lại.

Đảm bảo nhánh chính có tên `main`:

```powershell
git branch -M main
```

Thêm remote `origin` bằng URL repository vừa tạo. Nếu chưa có remote:

```powershell
git remote add origin <URL_REPOSITORY>
```

Nếu `origin` đã tồn tại, kiểm tra URL bằng `git remote -v`; đổi URL nếu cần:

```powershell
git remote set-url origin <URL_REPOSITORY>
```

## 3. Commit và đẩy code lên GitHub

Trước khi đẩy, kiểm tra `.gitignore` để chắc chắn các thư mục như `node_modules`, file môi trường `.env` và thông tin bí mật không được đưa lên GitHub. Sau đó:

```powershell
git add .
git commit -m "Add GitHub Actions CI"
git push -u origin main
```

Lệnh push lên `main` sẽ kích hoạt workflow `OrangeHRM PR CI`. Nếu chưa có thay đổi mới để commit, Git sẽ báo không có gì để commit; khi đó chỉ cần đẩy commit hiện có bằng `git push -u origin main`.

## 4. Thêm thông tin đăng nhập vào GitHub Secrets

CI chạy các bài test E2E với tài khoản demo OrangeHRM. Không ghi thông tin đăng nhập trực tiếp vào file workflow hoặc mã nguồn.

1. Mở trang repository trên GitHub.
2. Chọn **Settings → Secrets and variables → Actions**.
3. Trong mục **Repository secrets**, chọn **New repository secret**.
4. Tạo hai secret với tên chính xác:
   - `E2E_USERNAME`
   - `E2E_PASSWORD`
5. Nhập giá trị tài khoản tương ứng và lưu.

Tên secret phân biệt chữ hoa/chữ thường. Nếu thiếu hoặc sai thông tin đăng nhập, bước test có thể thất bại dù bước kiểm tra TypeScript đã thành công.

## 5. Chạy CI

Workflow tự chạy trong các trường hợp sau:

- Có commit được push lên nhánh `main`.
- Tạo hoặc cập nhật pull request có nhánh đích là `main`.
- Chạy thủ công qua **Actions → OrangeHRM PR CI → Run workflow** (chọn nhánh `main`).

Khi tạo PR từ một nhánh khác, CI chạy theo sự kiện `pull_request` vì nhánh đích là `main`. Nếu dự án thuộc repository cá nhân và PR đến từ fork, GitHub thường không cung cấp repository secrets cho workflow của fork; các test cần đăng nhập có thể không chạy thành công. Hãy cân nhắc chạy sau khi thay đổi được đưa vào repository chính.

## 6. Theo dõi kết quả

1. Mở tab **Actions** của repository.
2. Chọn lần chạy mới nhất có tên workflow **OrangeHRM PR CI**.
3. Xem hai job:
   - **TypeScript Check** chạy `npm run typecheck`.
   - **Playwright Tests** chỉ bắt đầu nếu TypeScript Check thành công; job này cài Chromium rồi chạy `npm test` để chạy toàn bộ test.
4. Mở từng job và xem log của bước bị lỗi.

Workflow hiện chạy trên Ubuntu, dùng Node.js 20, chạy Playwright ở chế độ headless với một worker và đặt giới hạn 20 phút cho job test.

## 7. Tải báo cáo và xử lý lỗi

Trong trang chi tiết lần chạy, phần **Artifacts** có thể chứa:

- `playwright-report`: HTML report, được tải lên sau khi test kết thúc và giữ 14 ngày. Tải xuống rồi giải nén để xem report.
- `test-results`: bằng chứng test, chỉ được tải lên khi job thất bại; artifact này có thể bao gồm ảnh chụp hoặc trace tùy cấu hình Playwright.

Nếu workflow thất bại, hãy mở log để xác định job và bước lỗi. Lỗi ở **TypeScript Check** cần được xử lý trong mã TypeScript. Lỗi đăng nhập cần kiểm tra hai repository secrets. Lỗi cài Chromium hoặc chạy browser cần xem log của các bước cài đặt và Playwright. Nếu toàn bộ suite vượt quá 20 phút, tăng `timeout-minutes` trong `.github/workflows/ci.yml` rồi commit và push thay đổi.

Sau khi sửa lỗi, push commit mới lên `main` hoặc cập nhật pull request; GitHub sẽ tự tạo lần chạy CI mới.
