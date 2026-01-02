# 🚀 Quick Start Guide

## 1. Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)
- npm atau yarn

## 2. Environment Setup

### 2.1 Create `.env.local`
Di root folder, buat file `.env.local`:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/cash_management?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-min-32-characters-long
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2.2 Configure MongoDB Atlas (5 minutes)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up/Log in
3. Create organization → Create project
4. Create cluster (Free M0)
5. Create database user (remember username & password)
6. Add your IP to Network Access (or 0.0.0.0 for development)
7. Click "Connect" → "Connect your application"
8. Copy connection string dan edit:
   - Replace `<username>` dengan database username Anda
   - Replace `<password>` dengan database password Anda
   - Change `test` to `cash_management`
9. Paste ke `.env.local`

## 3. Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## 4. Seed Database

Buka browser dan akses:
```
http://localhost:3000/api/auth/seed
```

Atau gunakan curl:
```bash
curl -X POST http://localhost:3000/api/auth/seed
```

## 5. Login dengan Test Credentials

### Super Admin
- **Username**: superadmin
- **Password**: password123
- **Access**: Create & manage admin accounts

### Admin Bendahara
- **Username**: admin
- **Password**: password123
- **Access**: Create & manage student accounts

### Student
- **Username**: student
- **Password**: password123
- **Access**: View dashboard

## 6. Project Structure

```
src/
├── app/
│   ├── api/auth/          # Authentication APIs
│   ├── dashboard/         # Role-based dashboards
│   ├── page.tsx           # Login page
│   └── layout.tsx         # Root layout
├── context/               # Auth context & hooks
├── lib/                   # Utilities (JWT, MongoDB)
├── middleware.ts          # Route protection
└── models/                # Database schemas
```

## 7. Available Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run ESLint
```

## 8. Troubleshooting

### MongoDB Connection Failed
- Check connection string di `.env.local`
- Verify IP whitelist di MongoDB Atlas
- Ensure database user exists

### Login Not Working
- Seed database dulu: `/api/auth/seed`
- Check credentials di seed response
- Clear browser cookies & try again

### Build Errors
- Delete `node_modules` dan `.next`
- Run `npm install` lagi
- Run `npm run build`

## 9. Next Features to Implement

1. ✅ Authentication & Login
2. ✅ Role-Based Access
3. ❌ Create Admin (Super Admin only)
4. ❌ Create User (Admin only)
5. ❌ Financial Management
6. ❌ Password Reset
7. ❌ User Profiles

## 10. Important Security Notes

⚠️ **Production Deployment**:
1. Change `JWT_SECRET` to a strong random key
2. Enable HTTPS only
3. Use secure MongoDB credentials
4. Configure CORS properly
5. Add rate limiting
6. Enable 2FA if available

---

**Happy Coding!** 🎉

For detailed documentation, check `README.md`
