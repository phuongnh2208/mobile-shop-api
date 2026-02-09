# Mobile Shop Api

API Backend đầy đủ tính năng được xây dựng bằng Node.js, Express, MongoDB, và Redis. Dự án hỗ trợ authentication đa nền tảng, quản lý sản phẩm, đơn hàng và nhiều tính năng khác cho ứng dụng thương mại điện tử.

## Giới thiệu

Đây là một RESTful API backend hoàn chỉnh với authentication (JWT + OAuth), email notifications, file upload, caching với Redis và nhiều tính năng quản lý cho hệ thống thương mại điện tử Mobile Shop.

## Công nghệ sử dụng

### Core Stack
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB (Mongoose 6.13.8)** - NoSQL database
- **Redis 5.9.0** - Caching và session storage

### Authentication & Security
- **bcrypt 6.0.0** - Password hashing
- **jsonwebtoken 9.0.2** - JWT token generation
- **jwt-decode 4.0.0** - JWT token parsing
- **Passport 0.7.0** - Authentication middleware
- **passport-google-oauth20** - Google OAuth integration
- **passport-facebook 3.0.0** - Facebook OAuth integration
- **express-session 1.18.2** - Session management

### Validation & Parsing
- **express-validator 7.2.1** - Request validation
- **body-parser 2.2.0** - Request body parsing
- **cookie-parser 1.4.7** - Cookie parsing

### File Upload
- **multer 1.4.5** - File upload middleware
- **express-fileupload 1.5.2** - Alternative file upload
- **formidable 3.5.0** - Form data parsing

### Email & Communication
- **nodemailer 7.0.9** - Email sending
- **EJS 3.1.10** - Email template engine

### Other Utilities
- **axios 1.13.2** - HTTP client
- **cors 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.1** - Environment variables
- **config 4.1.1** - Configuration management
- **connect-flash 0.1.1** - Flash messages

## Yêu cầu hệ thống

- **Node.js** >= 14.x (khuyến nghị >= 18.x)
- **MongoDB** >= 4.4
- **Redis** >= 6.0
- **npm** hoặc **yarn**

## Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/phuongnh2208/mobile-shop-api.git
cd node-api-259
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình environment variables

Sao chép file `.env.example` thành `.env`:

```bash
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin của bạn:

```env
# Server Configuration
SERVER_PORT=3000
PREFIX_API_VERSION=/api/v3

# JWT Keys
JWT_ACCESS_KEY=your_strong_access_key
JWT_REFRESH_KEY=your_strong_refresh_key
JWT_RESET_KEY=your_strong_reset_key

# Session Secret
SESSION_SECRET=your_strong_session_secret

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth Configuration
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/vietpro_mobile_shop

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 4. Setup MongoDB

Khởi động MongoDB service:

```bash
# Windows
net start MongoDB

# macOS (với Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 5. Setup Redis

Khởi động Redis service:

```bash
# Windows
redis-server

# macOS (với Homebrew)
brew services start redis

# Linux
sudo systemctl start redis
```

## Chạy ứng dụng

### Development Mode

```bash
npm start
```

Server sẽ chạy với hot-reload tại `http://localhost:3000`

API base URL: `http://localhost:3000/api/v3`

### Production Mode

```bash
NODE_ENV=production npm start
```

## Tính năng chính

### Authentication & Authorization
- [x] JWT-based authentication (Access & Refresh tokens)
- [x] OAuth 2.0 với Google
- [x] OAuth 2.0 với Facebook
- [x] Password reset với email
- [x] Session management
- [x] Role-based access control

### User Management
- [x] Đăng ký tài khoản
- [x] Đăng nhập (Local + OAuth)
- [x] Quản lý profile
- [x] Upload avatar
- [x] Đổi mật khẩu
- [x] Quên mật khẩu

### Product Management
- [x] CRUD operations cho products
- [x] Upload product images
- [x] Product categories
- [x] Product search và filter
- [x] Product variants

### Order Management
- [x] Tạo đơn hàng
- [x] Quản lý trạng thái đơn hàng
- [x] Lịch sử đơn hàng
- [x] Order tracking

### Category Management
- [x] CRUD operations cho categories
- [x] Nested categories
- [x] Category images

### Banner & Slider
- [x] Quản lý banners
- [x] Quản lý sliders
- [x] Upload banner/slider images

### Comment System
- [x] Product comments
- [x] Reply to comments
- [x] Comment moderation

### File Upload
- [x] Single file upload
- [x] Multiple files upload
- [x] Image optimization
- [x] File validation

### Email Notifications
- [x] Welcome email
- [x] Password reset email
- [x] Order confirmation email
- [x] EJS email templates

### Caching
- [x] Redis caching
- [x] Cache invalidation
- [x] Session storage trong Redis

## API Endpoints

### Authentication
```
POST   /api/v3/auth/register              - Đăng ký tài khoản
POST   /api/v3/auth/login                 - Đăng nhập
POST   /api/v3/auth/refresh-token         - Refresh access token
POST   /api/v3/auth/logout                - Đăng xuất
POST   /api/v3/auth/forgot-password       - Quên mật khẩu
POST   /api/v3/auth/reset-password        - Reset mật khẩu
GET    /api/v3/auth/google                - Google OAuth login
GET    /api/v3/auth/google/callback       - Google OAuth callback
GET    /api/v3/auth/facebook              - Facebook OAuth login
GET    /api/v3/auth/facebook/callback     - Facebook OAuth callback
```

### Users
```
GET    /api/v3/users/profile              - Lấy thông tin user
PUT    /api/v3/users/profile              - Cập nhật profile
POST   /api/v3/users/avatar               - Upload avatar
PUT    /api/v3/users/change-password      - Đổi mật khẩu
```

### Products
```
GET    /api/v3/products                   - Lấy danh sách products
GET    /api/v3/products/:id               - Lấy chi tiết product
POST   /api/v3/products                   - Tạo product mới
PUT    /api/v3/products/:id               - Cập nhật product
DELETE /api/v3/products/:id               - Xóa product
POST   /api/v3/products/:id/images        - Upload product images
```

### Categories
```
GET    /api/v3/categories                 - Lấy danh sách categories
GET    /api/v3/categories/:id             - Lấy chi tiết category
POST   /api/v3/categories                 - Tạo category mới
PUT    /api/v3/categories/:id             - Cập nhật category
DELETE /api/v3/categories/:id             - Xóa category
```

### Orders
```
GET    /api/v3/orders                     - Lấy danh sách orders
GET    /api/v3/orders/:id                 - Lấy chi tiết order
POST   /api/v3/orders                     - Tạo order mới
PUT    /api/v3/orders/:id                 - Cập nhật order status
DELETE /api/v3/orders/:id                 - Hủy order
```

### Comments
```
GET    /api/v3/comments/product/:id       - Lấy comments của product
POST   /api/v3/comments                   - Tạo comment mới
PUT    /api/v3/comments/:id               - Cập nhật comment
DELETE /api/v3/comments/:id               - Xóa comment
```

## OAuth Setup

### Google OAuth
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Enable Google+ API
4. Tạo OAuth 2.0 credentials
5. Thêm Authorized redirect URIs: `http://localhost:3000/api/v3/auth/google/callback`
6. Copy Client ID và Client Secret vào `.env`


### Facebook OAuth
1. Truy cập [Facebook Developers](https://developers.facebook.com/)
2. Tạo app mới
3. Thêm Facebook Login product
4. Cấu hình Valid OAuth Redirect URIs: `http://localhost:3000/api/v3/auth/facebook/callback`
5. Copy App ID và App Secret vào `.env`


## Email Setup

### Sử dụng Gmail

1. Enable 2-Step Verification trong Google Account
2. Tạo App Password:
   - Truy cập: https://myaccount.google.com/apppasswords
   - Chọn "Mail" và device của bạn
   - Generate password
3. Sử dụng App Password trong file `.env`

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_app_password
```

## Testing

```bash
npm test
```

## Scripts

| Script | Mô tả |
|--------|-------|
| `npm start` | Chạy server với hot-reload (node --watch) |
| `npm test` | Chạy test suite |


## Security Best Practices

- Không commit file `.env` vào git
- Sử dụng strong secrets cho JWT keys
- Enable CORS chỉ cho trusted domains
- Validate tất cả input với express-validator
- Implement rate limiting
- Use HTTPS trong production
- Keep dependencies updated
- Hash passwords với bcrypt
- Sanitize user input

## Troubleshooting

### Lỗi kết nối MongoDB

```bash
# Kiểm tra MongoDB đang chạy
mongo --version
mongod --version

# Khởi động MongoDB
sudo systemctl start mongod
```

### Lỗi kết nối Redis

```bash
# Kiểm tra Redis đang chạy
redis-cli ping
# Kết quả: PONG

# Khởi động Redis
sudo systemctl start redis
```

### Lỗi bcrypt installation

```bash
# Windows
npm install --global windows-build-tools

# Sau đó
npm rebuild bcrypt --build-from-source
```

### Lỗi email sending

- Kiểm tra Email và App Password đúng
- Enable "Less secure app access" nếu không dùng App Password
- Kiểm tra firewall không block port 587

## Contributing

Đây là dự án cá nhân để thực hành. Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Liên hệ

- GitHub: [@pulapily2208](https://github.com/pulapily2208)
- Repository: [node-api-259](https://github.com/pulapily2208/node-api-259)

## Ghi chú

Dự án này được tạo ra cho mục đích học tập và thực hành Node.js backend development với đầy đủ tính năng của một ứng dụng thương mại điện tử thực tế.
