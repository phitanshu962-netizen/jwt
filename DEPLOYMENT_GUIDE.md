# 🚀 GraphQL JWT Auth App - Deployment Guide

## 📋 What to Show Your Sir

You need **2 hosted links**:
1. **GraphQL API Server** - Backend API (handles authentication)
2. **React Login App** - Frontend (login/register pages)

## 🏗️ Current Project Structure

```
/JWT AUTH
├── server/     # GraphQL API Backend (Node.js + TypeScript)
├── web/        # React Frontend (Login/Register pages)
```

## 🚀 Step-by-Step Deployment (Railway - FREE)

### Step 1: Deploy GraphQL API Server

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. **Create New Project**
4. **Connect GitHub Repo** (this project)
5. **Railway will auto-detect** the `server/` folder
6. **Set Environment Variables**:
   ```
   ACCESS_TOKEN_SECRET=your_random_secret_here
   REFRESH_TOKEN_SECRET=another_random_secret_here
   ```
7. **Deploy** - Railway gives you: `https://your-api.railway.app`

### Step 2: Deploy React Frontend

1. **Create New Project** in Railway
2. **Connect same GitHub repo**
3. **Set Root Directory**: `web/`
4. **Set Environment Variable**:
   ```
   REACT_APP_API_URL=https://your-api.railway.app
   ```
5. **Deploy** - Railway gives you: `https://your-web.railway.app`

## 📊 What Each Link Does

### GraphQL API Server (`https://your-api.railway.app`)
- **GraphQL Playground**: `/graphql` - Test API interactively
- **API Endpoints**:
  - `POST /graphql` - Register, Login, Logout, Me queries
  - `POST /refresh_token` - JWT token refresh
  - `GET /` - Health check

### React Login App (`https://your-web.railway.app`)
- **Login Page** - User authentication
- **Register Page** - New user signup
- **Dashboard** - After login (shows user info)

## 🔐 GraphQL API Operations

### Register User
```graphql
mutation {
  register(input: {
    email: "user@example.com"
    password: "password123"
    firstName: "John"
    lastName: "Doe"
    age: 25
  }) {
    success
    message
    accessToken
  }
}
```

### Login
```graphql
mutation {
  login(input: {
    email: "user@example.com"
    password: "password123"
  }) {
    accessToken
    user {
      id
      email
      firstName
      lastName
      age
    }
  }
}
```

### Get Current User
```graphql
query {
  me {
    id
    email
    firstName
    lastName
    age
  }
}
```

### Logout
```graphql
mutation {
  logout
}
```

## 🎯 What to Tell Your Sir

**"Sir, I have created a complete GraphQL JWT Authentication system with:**

1. **GraphQL API Server**: `https://your-api.railway.app/graphql`
   - User registration and login
   - JWT token authentication
   - Secure password hashing
   - Token refresh mechanism

2. **React Login Application**: `https://your-web.railway.app`
   - User-friendly login/register pages
   - Connected to GraphQL API
   - JWT token management

**Features:**
- ✅ Secure JWT authentication
- ✅ Password encryption
- ✅ Token refresh
- ✅ GraphQL API
- ✅ React frontend
- ✅ Free hosting on Railway

**Technology Stack:**
- Backend: Node.js, TypeScript, GraphQL, TypeORM
- Frontend: React, Apollo Client, TypeScript
- Database: SQLite
- Hosting: Railway (Free)"

## 🔧 Local Testing (Optional)

```bash
# Test GraphQL API locally
cd server
yarn dev  # Runs on http://localhost:4000

# Test React app locally
cd web
yarn start  # Runs on http://localhost:3000
```

## 📝 Environment Variables Summary

### API Server (server/.env):
```
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
```

### React App (web environment):
```
REACT_APP_API_URL=https://your-api.railway.app
```

## 🎉 Final Result

After deployment, give your sir:
- **API Link**: `https://your-api.railway.app/graphql`
- **Web App Link**: `https://your-web.railway.app`

Both are live, hosted, and fully functional! 🚀
