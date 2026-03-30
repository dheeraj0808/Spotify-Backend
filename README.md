# Spotify Clone - Backend API

This is the backend API for a Spotify Clone application, built using Node.js, Express.js, and Sequelize ORM with MySQL. It provides comprehensive endpoints for user authentication, music file management, and playlist creation.

## 🚀 Features

- **Authentication & Authorization**: Secure user registration, login, and password management (including OTP-based reset) using JWT.
- **Role-Based Access Control**: Distinguishes between normal users, artists, and administrators.
- **Music Management**: Upload, update, delete, and search music tracks.
- **Media Storage**: Integration with ImageKit for storing images and media assets, and Multer for parsing form data.
- **Playlist Management**: Create custom playlists, and add or remove songs.
- **Rate Limiting**: Applied to authentication routes to prevent brute-force attacks.
- **Security**: Password hashing using bcrypt and secure cookie parsing.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **File Uploads**: Multer, ImageKit
- **Other Utilities**: CORS, cookie-parser, dotenv, express-rate-limit

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- An [ImageKit](https://imagekit.io/) account for media storage

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```env
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PORT=3306
DB_PASSWORD=your_db_password
DB_NAME=spotify

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# ImageKit Configuration (For music/image uploads)
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dheeraj0808/Spotify-Backend.git
   cd Spotify-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   Ensure your MySQL server is running and create the database specified in your `.env` file (`spotify`).
   The models will automatically be synchronized and tables will be created when the server starts via `sequelize.sync()`.

4. **Start the server:**
   
   For development (uses nodemon for hot-reloading):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

## 📡 API Endpoints

Here is an overview of the core API endpoints. A complete Postman collection (`Spotify_Backend_Postman_Collection.json`) is included in the root directory for easy import and testing.

### Authentication (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login to account
- `POST /forgetPassword` - Initiate password reset
- `POST /verifyOtp` - Verify OTP for reset
- `POST /resetPassword` - Reset password

### Users (`/api`)
- `GET /profile` - Get logged-in user's profile
- `PUT /profile` - Update profile details
- `GET /users` - Get all users (Admin only)
- `PATCH /changePassword` - Change existing password

### Music (`/api`)
- `POST /create` - Upload a new song (Artist)
- `GET /all` - Get all songs
- `GET /search/songname` - Search for a song
- `PUT /update/:musicId` - Update a song's details
- `DELETE /delete/:musicId` - Delete a song

### Playlists (`/api`)
- `POST /create` - Create a new playlist
- `GET /all` - Get all playlists
- `POST /add/:playlistId/:musicId` - Add a song to a playlist
- `DELETE /remove/:playlistId/:musicId` - Remove a song from a playlist
- `GET /with-songs/:playlistId` - Get a specific playlist along with its songs

## 📁 Project Structure

```
Spotify-backend/
├── src/
│   ├── app.js             # Express app setup and middleware routing
│   ├── config/            # Database and external service configurations
│   ├── controllers/       # Business logic for handling requests
│   ├── models/            # Sequelize database models
│   ├── routes/            # API route definitions
│   └── middlewares/       # Custom middlewares (auth, validation, etc.)
├── Uploads/               # Temporary directory for file uploads
├── .env                   # Environment variables (not tracked by git)
├── package.json           # Output dependencies and project scripts
├── server.js              # Entry point to start the DB & Express server
└── Spotify_Backend_Postman_Collection.json # Postman collection for API
```

## 📝 License

This project is licensed under the ISC License.
