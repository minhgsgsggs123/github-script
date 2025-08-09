# Discord Bot (discord.js v14)

## Yêu cầu
- Node.js 18+ (đã OK trong môi trường này)
- Một ứng dụng Discord và bot token

## Cấu trúc nhanh
```
src/
  index.js            # chạy bot
  deploy-commands.js  # đăng ký slash commands cho 1 guild
  commands/
    ping.js           # lệnh mẫu
.env                  # biến môi trường (tự tạo từ .env.example)
```

## Bắt đầu
1) Cài phụ thuộc (đã làm sẵn)
```
npm install
```

2) Tạo file môi trường
```
cp .env.example .env
```
Mở `.env` và điền các giá trị:
- `DISCORD_TOKEN`: Bot Token (tab Bot trong ứng dụng)
- `APPLICATION_ID`: Client ID của ứng dụng
- `GUILD_ID`: ID máy chủ thử nghiệm (bật Developer Mode trên Discord, chuột phải vào server > Copy ID)

3) Đăng ký slash commands cho guild thử nghiệm
```
npm run deploy-commands
```

4) Mời bot vào server của bạn
- Vào Developer Portal > OAuth2 > URL Generator
  - Scopes: `bot`, `applications.commands`
  - Bot Permissions: ít nhất `Send Messages`
- Hoặc dùng mẫu URL (thay CLIENT_ID):
  `[Mời bot qua OAuth2]`(`https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&scope=bot+applications.commands&permissions=2048`)

5) Chạy bot
```
npm start
```
Bạn sẽ thấy log dạng: `Logged in as YourBot#1234`.

## Ghi chú
- `deploy-commands.js` dùng đăng ký theo guild để lệnh hiển thị ngay. Khi bot ổn định, có thể chuyển sang đăng ký global bằng `Routes.applicationCommands` (mất vài phút để đồng bộ).
- Bot hiện chỉ cần `GatewayIntentBits.Guilds` để xử lý slash commands.