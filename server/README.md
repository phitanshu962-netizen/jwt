# GraphQL JWT Authentication API

A complete GraphQL authentication API with JWT tokens, refresh token rotation, and secure password handling.

## 🚀 Features

- ✅ User registration and login with GraphQL
- ✅ JWT access + refresh token authentication
- ✅ Secure password hashing with bcrypt
- ✅ Token refresh via HTTP-only cookies
- ✅ Logout with token revocation
- ✅ SQLite database with auto-migration
- ✅ GraphQL Playground for API testing
- ✅ TypeScript with full type safety
- ✅ CORS configured for frontend integration

## 🛠️ Local Development

1. **Install dependencies:**
   ```bash
   cd server
   yarn install
   ```

2. **Environment variables** (`.env`):
   ```
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```

3. **Run development server:**
   ```bash
   yarn dev
   ```

4. **Access GraphQL Playground:** http://localhost:4000/graphql

## 📡 API Endpoints

- **GraphQL API:** `POST /graphql`
- **Token Refresh:** `POST /refresh_token`
- **Health Check:** `GET /`

## 🔐 GraphQL API Usage

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

### Login User
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

### Get Current User (requires Authorization header)
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

### Logout User
```graphql
mutation {
  logout
}
```

## 🚀 Production Deployment

### Railway (Free Tier - Recommended)

1. **Sign up:** https://railway.app
2. **Create project** and connect GitHub repo
3. **Railway auto-detects** Node.js + provides SQLite
4. **Set environment variables:**
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
5. **Deploy automatically** on git push

### Alternative: Render

1. **Sign up:** https://render.com
2. **Create Web Service** from GitHub
3. **Build settings:**
   - Build Command: `yarn build`
   - Start Command: `yarn start`
4. **Add environment variables**
5. **Deploy**

## 🏗️ Architecture

- **Framework:** Node.js + TypeScript
- **GraphQL:** Apollo Server + TypeGraphQL
- **Database:** SQLite + TypeORM
- **Auth:** JWT + bcrypt + HTTP-only cookies
- **Security:** Token rotation + CORS protection

## 📝 Environment Variables

```
ACCESS_TOKEN_SECRET=your_access_secret_here
REFRESH_TOKEN_SECRET=your_refresh_secret_here
```

## 🧪 Testing

The API includes comprehensive GraphQL operations for authentication. Use the GraphQL Playground at `/graphql` for testing all endpoints interactively.
