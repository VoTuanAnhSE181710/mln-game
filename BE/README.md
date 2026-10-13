# MLN Game - Backend

API lưu dữ liệu cho game **Giải ô chữ tìm từ khóa**: cả lớp cùng chơi (không chia đội).
- Mỗi hàng ngang có 1 câu hỏi; ai trả lời đúng nhận quà nhỏ.
- Mỗi hàng ngang có 1 chữ cái nằm ở cột dọc, ghép lại thành từ khóa. Ai giải ra từ khóa sớm nhất nhận quà to.

## Chạy
```
cp .env.example .env
npm install
npm run dev
```

## Cấu trúc
`routes -> controllers -> services -> models` (Express + MongoDB/Mongoose, ES Modules)

## Mô hình dữ liệu: Game
`title, keyword, keywordHint, keywordPrize, isKeywordSolved, status (draft|playing|finished)` và `rows[]`:
`order, question, answer, keywordIndex, prize, isRevealed`.

BE không lưu người chơi hay người thắng: người điều khiển hỏi cả lớp, ai trả lời đúng thì bấm mở hàng đó.

`keywordIndex` là vị trí (từ 1) của chữ cái thuộc cột từ khóa trong đáp án (đã bỏ dấu và khoảng trắng).
Khi lưu, BE kiểm tra số hàng = số chữ cái từ khóa và chữ cái ở mỗi hàng khớp từ khóa.

## API (prefix `/api/games`)
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/` | Danh sách game |
| POST | `/` | Tạo game (kèm `rows`) |
| GET/PUT/DELETE | `/:id` | Xem (đủ đáp án) / sửa / xóa |
| GET | `/:id/board` | Dữ liệu cho FE hiển thị, ẩn đáp án chưa mở |
| POST | `/:id/rows/:rowId/reveal` | Mở đáp án hàng ngang |
| POST | `/:id/solve-keyword` | Mở từ khóa hàng dọc, kết thúc game |
| POST | `/:id/reset` | Chơi lại |

Ví dụ tạo game:
```json
{
  "title": "Ô chữ môn ...",
  "keyword": "ĐA",
  "keywordPrize": "Quà to",
  "rows": [
    { "order": 1, "question": "...", "answer": "Đảng", "keywordIndex": 1, "prize": "Kẹo" },
    { "order": 2, "question": "...", "answer": "Bắc", "keywordIndex": 2, "prize": "Kẹo" }
  ]
}
```
