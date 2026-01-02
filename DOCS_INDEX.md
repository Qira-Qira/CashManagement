# 📚 ClassCash Documentation Index

## 🚀 Getting Started

### [QUICK_START.md](./QUICK_START.md)
Panduan cepat untuk setup dan menjalankan aplikasi dalam 5 menit.
- Prerequisites
- Environment setup
- Install & run
- Test credentials
- Troubleshooting

### [MONGODB_SETUP.md](./MONGODB_SETUP.md)
Panduan lengkap setup MongoDB Atlas untuk database.
- Create account
- Create cluster
- Create user
- Network access
- Connection string
- Troubleshooting

## 📖 Detailed Documentation

### [README.md](./README.md)
Dokumentasi lengkap aplikasi ClassCash.
- Fitur utama
- Tech stack
- Project structure
- Authentication flow
- Protected routes
- Security notes
- Next steps

### [API_DOCS.md](./API_DOCS.md)
API reference lengkap.
- Base URL
- Authentication endpoints
- User roles & permissions
- Error responses
- Data models
- Examples (cURL, JavaScript, Axios)
- Rate limiting
- Status codes

## 🔐 Security

### Key Security Features
✅ Password hashing dengan bcryptjs
✅ JWT token authentication
✅ Role-based access control (RBAC)
✅ Protected routes dengan middleware
✅ HTTP-only cookies
✅ Secure MongoDB connection

### Production Checklist
- [ ] Change JWT_SECRET
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Add rate limiting
- [ ] Use strong database credentials
- [ ] Whitelist IP addresses
- [ ] Enable 2FA
- [ ] Setup monitoring

## 📁 Project Structure

```
cash_management/
├── src/
│   ├── app/
│   │   ├── api/auth/              # Authentication APIs
│   │   │   ├── login/route.ts      # Login endpoint
│   │   │   ├── logout/route.ts     # Logout endpoint
│   │   │   └── seed/route.ts       # Database seeding
│   │   ├── dashboard/              # Role-based dashboards
│   │   │   ├── super-admin/page.tsx
│   │   │   ├── admin/page.tsx
│   │   │   └── user/page.tsx
│   │   ├── layout.tsx              # Root layout with AuthProvider
│   │   ├── page.tsx                # Login page (public)
│   │   └── globals.css
│   ├── context/
│   │   └── AuthContext.tsx         # Auth state & hooks
│   ├── lib/
│   │   ├── jwt.ts                  # JWT utilities
│   │   └── mongodb.ts              # MongoDB connection
│   ├── middleware.ts               # Route protection
│   └── models/
│       └── User.ts                 # User schema
├── .env.local                       # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── README.md
├── QUICK_START.md
├── MONGODB_SETUP.md
├── API_DOCS.md
└── DOCS_INDEX.md                    # This file
```

## 🔑 Test Credentials

After seeding database, use these:

| Role | Username | Password |
|------|----------|----------|
| Super Admin | superadmin | password123 |
| Admin Bendahara | admin | password123 |
| Student | student | password123 |

## 📊 Role Hierarchy

```
┌─ Super Admin
│  └─ Can create Admin accounts
│
├─ Admin Bendahara
│  └─ Can create Student accounts
│
└─ User (Student)
   └─ Regular user access
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Next.js 16 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT + bcryptjs |
| **ORM** | Mongoose |

## 📝 File Guide

### To understand authentication:
1. Read: [API_DOCS.md](./API_DOCS.md) - Endpoints
2. Check: `src/app/api/auth/` - API implementation
3. Check: `src/context/AuthContext.tsx` - Frontend auth
4. Check: `src/lib/jwt.ts` - JWT utilities

### To understand roles:
1. Check: `src/models/User.ts` - User model
2. Check: `src/app/dashboard/` - Role dashboards
3. Check: `src/middleware.ts` - Route protection

### To understand styling:
1. Check: `src/app/page.tsx` - Login UI (Tailwind)
2. Check: `src/app/globals.css` - Global styles
3. Check: `tailwind.config.ts` - Tailwind config

## 🚀 Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Check lint errors
npm run lint

# Seed database
curl -X POST http://localhost:3000/api/auth/seed
```

## 🔗 Useful URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:3000/` | Login page |
| `http://localhost:3000/api/auth/login` | Login API |
| `http://localhost:3000/api/auth/logout` | Logout API |
| `http://localhost:3000/api/auth/seed` | Seed database |
| `http://localhost:3000/dashboard/super-admin` | Super admin dashboard |
| `http://localhost:3000/dashboard/admin` | Admin dashboard |
| `http://localhost:3000/dashboard/user` | User dashboard |

## ❓ FAQ

### Q: How to change password?
A: Currently not implemented. Features for v2.

### Q: How to reset password?
A: Delete user from database and recreate. Or implement password reset API.

### Q: Can users create their own accounts?
A: No. Only Super Admin and Admin can create accounts.

### Q: How long is token valid?
A: 7 days. Change in `src/lib/jwt.ts` if needed.

### Q: How to clear database?
A: Use MongoDB Compass or `db.users.deleteMany({})`

### Q: Can I use this in production?
A: Yes, after security audit and proper configuration.

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| "MongoDB connection failed" | Check `.env.local` and IP whitelist |
| "Login not working" | Seed database first |
| "Token not working" | Clear cookies and login again |
| "Build fails" | Delete `node_modules` and `.next`, then reinstall |

## 📞 Support

- **Documentation**: Check this index
- **API Help**: See [API_DOCS.md](./API_DOCS.md)
- **MongoDB Help**: See [MONGODB_SETUP.md](./MONGODB_SETUP.md)
- **Quick Start**: See [QUICK_START.md](./QUICK_START.md)
- **Console**: Check browser console (F12) for errors

## 🎯 Next Steps

1. ✅ Setup database
2. ✅ Configure environment
3. ✅ Run dev server
4. ✅ Seed database
5. ✅ Test login
6. ❌ Implement create admin feature
7. ❌ Implement create user feature
8. ❌ Add financial features
9. ❌ Deploy to production

## 📅 Version Info

- **Version**: 1.0.0
- **Created**: January 2026
- **Framework**: Next.js 16.1.1
- **Node**: 18+
- **License**: Proprietary

---

**Happy Learning! 🚀**

Start with [QUICK_START.md](./QUICK_START.md) if new to this project.
