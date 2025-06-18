# Subscription Tracker API

> ⚠️ **Note:** This project was built by me as part of my backend development learning journey.  
> It is intended for educational purposes only and may continue to evolve as I improve my skills.

This project exposes an Express-based REST API for managing user subscriptions. It uses MongoDB via Mongoose and relies on environment variables for configuration.


---

## 🚀 Features

- JWT-based authentication
- Role-based route protection
- CRUD operations for subscriptions
- Status tracking: `active`, `cancelled`, `expired`
- Subscription auto-renewal logic
- Upcoming renewal detection
- Arcjet-based rate limiting (DDOS protection)
- Middleware-driven validation and error handling

---

## 🧱 Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Arcjet
- dotenv, morgan, cors
- Nodemon (for development)

---

## 📦 Installation

1. Install [Node.js](https://nodejs.org/) (v20+ recommended).
2. Clone this repository and install dependencies:

```bash
git clone https://github.com/your-username/subscription-tracker.git
cd subscription-tracker
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.development.local` or `.env.production.local` file and add the following:

```env
PORT=5500
NODE_ENV=development
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db_name>
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
ARCJET_ENV=dev
ARCJET_KEY=your_arcjet_key
```

---

## 🔧 Scripts

```bash
npm run dev   # Start in development mode
npm start     # Start in production
```

---

## 📚 API Endpoints

All routes are prefixed with `/api/v1`.

| Method | Route                              | Description                      | Auth |
|--------|------------------------------------|----------------------------------|------|
| POST   | `/auth/sign-up`                    | Register a new user              | ❌   |
| POST   | `/auth/sign-in`                    | Login and receive JWT            | ❌   |
| GET    | `/users/:id`                       | Get user details                 | ✅   |
| GET    | `/subscriptions`                   | Get all subscriptions (admin)    | ✅   |
| GET    | `/subscriptions/my`                | Get current user's subscriptions | ✅   |
| POST   | `/subscriptions`                   | Create a new subscription        | ✅   |
| PUT    | `/subscriptions/:id`               | Update a subscription            | ✅   |
| PUT    | `/subscriptions/:id/cancel`        | Cancel a subscription            | ✅   |
| GET    | `/subscriptions/upcoming-renewals` | Get upcoming renewal list        | ✅   |
| DELETE | `/subscriptions/:id`               | Delete a subscription            | ✅   |

---

## 📸 Example Requests

### Sign Up

```bash
curl -X POST http://localhost:5500/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"secret"}'
```

### Create Subscription

```bash
curl -X POST http://localhost:5500/api/v1/subscriptions \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
        "name":"Netflix",
        "price":10,
        "currency":"USD",
        "frequency":"monthly",
        "category":"entertainment",
        "paymentMethod":"credit card",
        "startDate":"2024-01-01"
      }'
```



## 📦 Dependencies

### Main Packages

| Package           | Version         | Description                                         |
|-------------------|-----------------|-----------------------------------------------------|
| `express`         | ^4.21.2         | Fast and minimal web framework for Node.js          |
| `mongoose`        | ^8.15.2         | MongoDB ODM for schema-based data modeling          |
| `dotenv`          | ^16.5.0         | Loads environment variables from `.env` files       |
| `jsonwebtoken`    | ^9.0.2          | Generates and verifies JWT tokens                   |
| `bcryptjs`        | ^3.0.2          | Password hashing library                            |
| `cookie-parser`   | ~1.4.4          | Parses cookies from incoming requests               |
| `mongodb`         | ^6.17.0         | Native MongoDB driver for Node.js                   |
| `morgan`          | ~1.9.1          | HTTP request logger middleware                      |
| `@arcjet/node`    | ^1.0.0-beta.8   | Arcjet Node SDK for rate limiting & edge security   |
| `@arcjet/inspect` | ^1.0.0-beta.8   | Arcjet debugging & inspection tool                  |

---

### Dev Dependencies

| Package        | Version       | Description                                |
|----------------|---------------|--------------------------------------------|
| `nodemon`      | ^3.1.10       | Automatically restarts server on changes   |
| `eslint`       | ^9.29.0       | JavaScript linter for code quality         |
| `@eslint/js`   | ^9.29.0       | ESLint JavaScript rules                    |
| `globals`      | ^16.2.0       | Provides global variables for ESLint       |


> All dependencies are defined in the `package.json` file and installed via `npm install`.

---

## 📄 License

This project is open-sourced under the MIT License.
