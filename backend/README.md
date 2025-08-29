# EcoTrack Backend

A secure authentication and rental management system backend for EcoTrack.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   - Copy `env` to `.env` (or create `.env` file)
   - Update MongoDB connection string in `.env`
   - Update JWT secret in `.env`

3. **MongoDB:**
   - Make sure MongoDB is running locally or update `MONGODB_URI` in `.env`
   - Default: `mongodb://localhost:27017/ecotrack`

## Running the Backend

1. **Start the server:**
   ```bash
   npm start
   ```
   or for development with auto-reload:
   ```bash
   npm run dev
   ```

2. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

## API Endpoints

- **Health Check:** `GET /health`
- **Server runs on:** `http://localhost:5000`

## Database

- MongoDB with Mongoose ODM
- Collections: Dealers, Vehicles, Customers, Rentals, Payments, Alerts
- Sample data available via seed script

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- JWT authentication (ready for implementation)
