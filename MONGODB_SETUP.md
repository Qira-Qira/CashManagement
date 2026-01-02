# MongoDB Atlas Setup Guide

## Step-by-Step Setup

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Click "Sign Up" atau "Sign In"
3. Complete registration atau login dengan Google/GitHub
4. Verify email (check spam folder)

### Step 2: Create Organization & Project

1. After login, click "Create an organization"
2. Enter organization name (e.g., "ClassCash")
3. Click "Create organization"
4. Click "Create a project"
5. Enter project name (e.g., "cash_management")
6. Click "Create project"

### Step 3: Create Database Cluster

1. Click "Build a database" atau "Create"
2. Select "M0" (Free tier) - unlimited clusters
3. Choose cloud provider (AWS/Google/Azure)
4. Choose region closest to you
5. Cluster name: `cluster0` (default is fine)
6. Click "Create cluster"
7. Wait for cluster to deploy (2-3 minutes)

### Step 4: Create Database User

1. In cluster view, go to "Database Access" (left menu)
2. Click "Add New Database User"
3. **Username**: ex. `classcash_admin`
4. **Password**: ex. `MyS3cur3P@ssw0rd` (use strong password!)
5. **Authentication Method**: Password
6. Click "Add User"

**⚠️ Save username & password - you'll need it!**

### Step 5: Configure Network Access

1. Go to "Network Access" (left menu)
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. **For production**: Add specific IP addresses only
5. Click "Confirm"

### Step 6: Get Connection String

1. Go back to "Clusters" view
2. Click "Connect"
3. Select "Connect your application"
4. Choose driver: "Node.js"
5. Select version: "5.9 or later"
6. Copy the connection string

Example:
```
mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

### Step 7: Create Database

1. In connection string, add database name:
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/cash_management?retryWrites=true&w=majority
```

2. Database `cash_management` will be created automatically on first connection

### Step 8: Update `.env.local`

```env
MONGODB_URI=mongodb+srv://classcash_admin:MyS3cur3P@ssw0rd@cluster0.abc123.mongodb.net/cash_management?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Connection String Breakdown

```
mongodb+srv://
  username        : classcash_admin
  password        : MyS3cur3P@ssw0rd
  host            : cluster0.abc123.mongodb.net
  database        : cash_management
  options         : ?retryWrites=true&w=majority
```

## Common Issues & Solutions

### ❌ "Authentication Failed"
**Problem**: Username/password incorrect
**Solution**: 
- Double-check username & password
- If forgotten, go to Database Access and reset password

### ❌ "Connection Timeout"
**Problem**: IP not whitelisted
**Solution**:
- Go to Network Access
- Add your IP address
- Or use 0.0.0.0/0 for development

### ❌ "Command 'connect' not Found"
**Problem**: Server hasn't connected yet
**Solution**:
- Verify connection string is correct
- Check `.env.local` file
- Restart dev server: `npm run dev`

### ❌ "SyntaxError in Connection String"
**Problem**: Special characters in password not encoded
**Solution**:
- Use percent encoding for special chars
- Example: `@` becomes `%40`, `:` becomes `%3A`
- Or use password without special chars

## MongoDB Compass (Optional)

Download MongoDB Compass for visual database management:

1. Go to [mongodb.com/try/download/compass](https://mongodb.com/try/download/compass)
2. Download for your OS
3. Install and open
4. Click "New Connection"
5. Paste connection string
6. Click "Connect"
7. Browse data visually

## Database Cleanup

### Delete All Users
```javascript
// In MongoDB Compass, paste in database:
db.users.deleteMany({})
```

Or access from terminal:
```bash
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/cash_management"
> db.users.deleteMany({})
```

### Delete Specific User
```bash
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/cash_management"
> db.users.deleteOne({ username: "student" })
```

## Security Best Practices

### ✅ Development (Local)
- Use `0.0.0.0/0` for IP whitelist
- Use weak password is okay
- Regular password changes not critical

### ⚠️ Production
- Whitelist specific IP addresses only
- Use strong, unique passwords
- Enable 2FA
- Use separate database user for production
- Rotate credentials regularly
- Use VPN if accessing from multiple locations

## Monitoring & Metrics

In MongoDB Atlas:

1. **Metrics**: Real-time database performance
2. **Logs**: Query and connection logs
3. **Alerts**: Set performance alerts
4. **Backups**: Automatic daily backups (free)

## Free Tier Limits

- **Storage**: 512 MB total
- **Connections**: 100 concurrent
- **Database Users**: Up to 100
- **Backups**: Daily incremental
- **Clusters**: Unlimited

## Upgrade to Paid (Optional)

When free tier limits are reached:
1. Go to Cluster
2. Click "Pause" or "Terminate"
3. Create new M2+ cluster
4. Same connection process
5. Billed monthly

## Documentation Links

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/)
- [IP Whitelist Guide](https://docs.atlas.mongodb.com/security/ip-access-list/)
- [MongoDB Compass Download](https://www.mongodb.com/products/compass)

---

**All set!** Your MongoDB is ready. Now run:
```bash
npm run dev
```

And seed the database:
```bash
curl -X POST http://localhost:3000/api/auth/seed
```
