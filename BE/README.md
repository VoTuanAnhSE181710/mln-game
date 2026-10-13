# MLN Game - Backend

API lưu trữ dữ liệu do người dùng nhập (câu hỏi, người chơi) để FE hiển thị cho game show.

## Chạy
```
cp .env.example .env
npm install
npm run dev
```

## Cấu trúc
`routes -> controllers -> services -> models` (Express + MongoDB/Mongoose, ES Modules)

## API (prefix `/api`)
| Resource | Endpoint |
|---|---|
| Câu hỏi | `GET/POST /questions`, `GET/PUT/DELETE /questions/:id` |
| Người chơi | `GET/POST /players`, `GET/PUT/DELETE /players/:id` |

Thêm resource mới: tạo model, rồi service/controller/route bằng `createCrud*` và đăng ký trong `routes/index.js`.