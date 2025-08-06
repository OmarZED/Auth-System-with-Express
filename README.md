# Auth API with JWT Authentication

A complete Express.js authentication API with JWT tokens, user registration, login, and profile management.

## 🚀 Features

- ✅ User registration with extended profile data
- ✅ JWT-based authentication
- ✅ Secure password hashing with bcrypt
- ✅ User profile management (get/update)
- ✅ Input validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ Environment variable configuration

## 📋 Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create a `.env` file in the root directory:**
```env
MONGO_URI=mongodb://localhost:27017/auth-app
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-2024
```

3. **Make sure MongoDB is running on your system**

4. **Start the server:**
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## 🔐 API Endpoints

### Public Routes (No Authentication Required)

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "phoneNumber": "+1234567890"
  }
}
```

#### POST /api/auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "phoneNumber": "+1234567890"
  }
}
```

### Protected Routes (Require JWT Token)

**Headers required for all protected routes:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### GET /api/auth/profile
Get current user's profile information.

**Response:**
```json
{
  "user": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "phoneNumber": "+1234567890",
    "profilePicture": null,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/auth/profile
Update current user's profile information.

**Request Body (all fields optional):**
```json
{
  "name": "John Updated",
  "age": 26,
  "address": {
    "street": "456 Oak Ave",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90210",
    "country": "USA"
  },
  "phoneNumber": "+1987654321"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Updated",
    "email": "john@example.com",
    "age": 26,
    "address": {
      "street": "456 Oak Ave",
      "city": "Los Angeles",
      "state": "CA",
      "zipCode": "90210",
      "country": "USA"
    },
    "phoneNumber": "+1987654321"
  }
}
```

## 🧪 Testing with Postman

### 1. Register a User
- **Method:** POST
- **URL:** `http://localhost:3001/api/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body:** Use the register example above

### 2. Login
- **Method:** POST
- **URL:** `http://localhost:3001/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body:** Use the login example above

### 3. Get Profile (Protected)
- **Method:** GET
- **URL:** `http://localhost:3001/api/auth/profile`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_JWT_TOKEN`

### 4. Update Profile (Protected)
- **Method:** PUT
- **URL:** `http://localhost:3001/api/auth/profile`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_JWT_TOKEN`
- **Body:** Use the update profile example above

## 📊 User Model Schema

```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  age: { type: Number, min: 1, max: 120 },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phoneNumber: { type: String, trim: true },
  profilePicture: { type: String, default: null },
  isActive: { type: Boolean, default: true }
}
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/auth-app` |
| `PORT` | Server port | `3001` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-jwt-key-2024` |

## 🛡️ Security Features

- **Password Hashing:** All passwords are hashed using bcrypt
- **JWT Tokens:** Secure authentication with 7-day expiration
- **Input Validation:** Comprehensive validation for all inputs
- **Error Handling:** Proper error responses and logging
- **Protected Routes:** Middleware-based route protection

## 📝 Error Responses

### Validation Errors (400)
```json
{
  "message": "Name, email, and password are required"
}
```

### Authentication Errors (401)
```json
{
  "message": "Access denied. No token provided."
}
```

### Server Errors (500)
```json
{
  "message": "Server error"
}
```

## 🚀 Getting Started

1. Clone the repository
2. Run `npm install`
3. Create `.env` file with required variables
4. Start MongoDB
5. Run `npm start`
6. Test endpoints with Postman

## 📦 Dependencies

- **express:** Web framework
- **mongoose:** MongoDB ODM
- **bcryptjs:** Password hashing
- **jsonwebtoken:** JWT authentication
- **dotenv:** Environment variables
- **nodemon:** Development server (dev dependency) 