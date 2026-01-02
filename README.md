# ClassCash - Student Financial Management System

Sistem manajemen keuangan mahasiswa dengan role-based access control menggunakan Next.js, MongoDB, dan JWT.

## 📋 Fitur Utama

### Roles & Permissions
- **Super Admin**: Membuat dan mengelola akun Admin Bendahara
- **Admin Bendahara**: Membuat dan mengelola akun User (Mahasiswa)
- **User**: Mengakses fitur dasar sistem keuangan

### Security Features
- Password hashing menggunakan bcryptjs
- JWT token authentication
- Role-based access control (RBAC)
- Protected routes dengan middleware
- HTTP-only cookies

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcryptjs

## 📦 Setup Instructions

### Prerequisites
- Node.js 18+
- npm
- MongoDB Atlas account

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Buat file `.env.local` di root project:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/cash_management?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### 4. Seed Database (Create Test Users)
Buka di browser atau gunakan curl:
```bash
curl -X POST http://localhost:3000/api/auth/seed
```

### 5. Login dengan Test Credentials
Setelah seed, gunakan salah satu akun berikut:

| Role | Username | Password |
|------|----------|----------|
| Super Admin | superadmin | password123 |
| Admin Bendahara | admin | password123 |
| Student | student | password123 |

## 🔄 Authentication Flow

1. User login dengan username & password
2. Backend validasi dan generate JWT token
3. Token disimpan di HTTP-only cookie & localStorage
4. User diredirect ke dashboard sesuai role
5. Middleware melindungi protected routes

## 🛡️ Protected Routes

- `/dashboard/super-admin/*` → Hanya Super Admin
- `/dashboard/admin/*` → Hanya Admin Bendahara
- `/dashboard/user/*` → Student users

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts       # Login API
│   │       ├── logout/route.ts      # Logout API
│   │       └── seed/route.ts        # Database seeding
│   ├── dashboard/
│   │   ├── super-admin/page.tsx     # Super Admin dashboard
│   │   ├── admin/page.tsx           # Admin Bendahara dashboard
│   │   └── user/page.tsx            # Student dashboard
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Login page
│   └── globals.css                   # Global styles
├── context/
│   └── AuthContext.tsx              # Auth state & hooks
├── lib/
│   ├── jwt.ts                       # JWT utilities
│   └── mongodb.ts                   # MongoDB connection
├── middleware.ts                     # Route protection
└── models/
    └── User.ts                      # User schema & roles
```

## 🔐 User Model

```typescript
User {
  username: string (unique, lowercase)
  password: string (hashed with bcryptjs)
  email?: string
  role: enum["super_admin", "admin_bendahara", "user"]
  createdAt: Date
  updatedAt: Date
}
```

## 📝 API Endpoints

### POST /api/auth/login
Login dengan username & password

**Request:**
```json
{
  "username": "superadmin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "username": "superadmin",
    "role": "super_admin"
  },
  "token": "eyJhbGc..."
}
```

### POST /api/auth/logout
Logout dan clear session

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### POST /api/auth/seed
Seed database dengan test users

**Response:**
```json
{
  "message": "Database seeded successfully",
  "testCredentials": {
    "superAdmin": { "username": "superadmin", "password": "password123" },
    "admin": { "username": "admin", "password": "password123" },
    "student": { "username": "student", "password": "password123" }
  }
}
```

## 🎨 UI Components

### Login Page
- Modern gradient background (purple theme)
- Username & password input fields
- Remember me checkbox
- Social login buttons (UI mockup)
- Error message display
- Loading state indicator
- Fully responsive design

### Dashboard Pages
- Navigation bar dengan user info
- Logout button
- Role-specific action cards
- Responsive grid layout

## 🔧 Setup MongoDB Atlas

1. Kunjungi [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create akun & login
3. Create organization → Create project
4. Build database (pilih Free M0)
5. Configure database access (username & password)
6. Setup network access (whitelist IP)
7. Click "Connect" → "Connect your application"
8. Copy connection string
9. Paste ke `.env.local`

**Contoh connection string:**
```
mongodb+srv://myusername:mypassword@cluster0.abc.mongodb.net/cash_management?retryWrites=true&w=majority
```

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run ESLint
npm run lint
```

## 🔒 Security Best Practices

1. **JWT_SECRET** - Ganti dengan random string yang kuat di production
2. **HTTPS** - Aktifkan HTTPS di production
3. **Password Hashing** - bcryptjs dengan 10 salt rounds
4. **Token Expiration** - 7 hari
5. **HTTP-only Cookies** - Untuk token storage
6. **CORS** - Configure sesuai kebutuhan

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verifikasi `.env.local` MONGODB_URI
- Pastikan IP whitelisted di MongoDB Atlas Network Access
- Check database sudah dibuat

### Login Tidak Berfungsi
- Seed database terlebih dahulu (`/api/auth/seed`)
- Check browser console untuk error
- Verifikasi credentials yang benar

### Token Issues
- Clear browser cookies & localStorage
- Logout dan login kembali
- Verifikasi JWT_SECRET tidak berubah

## 📚 Next Steps (Future Features)

1. **Admin Account Creation** - Super Admin bisa create Admin Bendahara
2. **User Account Creation** - Admin bisa create Student accounts
3. **Financial Management** - Balance, transactions, reports
4. **Password Reset** - Email verification
5. **Two-Factor Authentication** - SMS or authenticator
6. **User Profiles** - Edit profile & preferences
7. **Activity Logging** - Track user activities
8. **Rate Limiting** - API rate limiting

## 📞 Support & Documentation

- Check terminal console untuk server errors
- Check browser console (F12) untuk client errors
- Check MongoDB Atlas dashboard untuk database issues
- Read API documentation di API_DOCS.md

## 📄 Project Info

- **Created**: January 2026
- **Version**: 1.0.0
- **Tech**: Next.js 15, MongoDB, JWT
- **License**: Proprietary

---

**ClassCash - Student Financial Management System**

Made with ❤️ for excellent financial management
