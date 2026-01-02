# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

### POST /auth/login
Login dengan username dan password untuk mendapatkan JWT token.

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "superadmin",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "superadmin",
    "role": "super_admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

**Response Header:**
```
Set-Cookie: token=eyJhbGc...; HttpOnly; Secure; SameSite=Lax; Max-Age=604800
```

---

### POST /auth/logout
Logout dan clear session.

**Request:**
```http
POST /api/auth/logout
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Response Header:**
```
Set-Cookie: token=; HttpOnly; Secure; SameSite=Lax; Max-Age=0
```

---

### POST /auth/seed
Seed database dengan test users (development only).

**Request:**
```http
POST /api/auth/seed
```

**Success Response (201):**
```json
{
  "message": "Database seeded successfully",
  "testCredentials": {
    "superAdmin": {
      "username": "superadmin",
      "password": "password123"
    },
    "admin": {
      "username": "admin",
      "password": "password123"
    },
    "student": {
      "username": "student",
      "password": "password123"
    }
  }
}
```

**Already Seeded Response (200):**
```json
{
  "message": "Database already seeded"
}
```

---

## User Roles & Permissions

### Roles
```
- super_admin      # Super Administrator
- admin_bendahara  # Treasurer/Finance Admin
- user             # Regular User (Student)
```

### Role Permissions

#### Super Admin
- View all users
- Create admin accounts
- Manage system settings
- Access: `/dashboard/super-admin`

#### Admin Bendahara
- View students
- Create student accounts
- View financial reports
- Access: `/dashboard/admin`

#### User (Student)
- View personal balance
- View transactions
- Manage profile
- Access: `/dashboard/user`

---

## Protected Routes

### Middleware Protection
```
/dashboard/super-admin/* → requires role: super_admin
/dashboard/admin/*       → requires role: admin_bendahara
/dashboard/user/*        → requires role: user (any authenticated)
/api/auth/*              → public endpoints
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Username and password are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied. Insufficient permissions."
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Request Headers

### Authorization (if needed)
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Standard Headers
```
Content-Type: application/json
Accept: application/json
```

---

## Response Headers

### Token Cookie
```
Set-Cookie: token=YOUR_JWT_TOKEN; 
            HttpOnly; 
            Secure; 
            SameSite=Lax; 
            Max-Age=604800
```

---

## Data Models

### User
```typescript
{
  _id: ObjectId
  username: string (unique, lowercase)
  password: string (hashed)
  email?: string
  role: enum["super_admin", "admin_bendahara", "user"]
  createdAt: Date
  updatedAt: Date
}
```

### JWT Payload
```typescript
{
  userId: string
  username: string
  role: string
  iat: number (issued at)
  exp: number (expiration)
}
```

---

## Examples

### Login dengan cURL
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "superadmin",
    "password": "password123"
  }'
```

### Login dengan JavaScript/Fetch
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'superadmin',
    password: 'password123',
  }),
});

const data = await response.json();
console.log(data.token); // Save this token
```

### Login dengan Axios
```javascript
import axios from 'axios';

const { data } = await axios.post('/api/auth/login', {
  username: 'superadmin',
  password: 'password123',
});

console.log(data.token);
```

---

## Rate Limiting

Currently not implemented. Recommended for production:
```
POST /api/auth/login → 5 requests per 15 minutes per IP
```

---

## Security Notes

1. **HTTPS Only**: Always use HTTPS in production
2. **Token Expiration**: Tokens expire in 7 days
3. **Secure Cookies**: HttpOnly + Secure flags enabled
4. **Password Hashing**: bcryptjs with 10 salt rounds
5. **SQL Injection**: Protected by MongoDB ODM
6. **CORS**: Configure based on your domain

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid credentials |
| 403 | Forbidden - Insufficient permissions |
| 500 | Server Error - Internal error |

---

## Version Info

- API Version: 1.0.0
- Last Updated: January 2026
- Base Framework: Next.js 15

---

For more details, see [README.md](./README.md) and [QUICK_START.md](./QUICK_START.md)
