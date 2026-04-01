# 🎵 Spotify Clone - Backend API

[![Deploy to Render](https://img.shields.io/badge/Deploy-Render-blue?style=for-the-badge&logo=render)](https://spotify-backend-3ouf.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)](https://mysql.com/)

This is a premium, industry-standard backend API for a Spotify Clone application. Built with **Node.js**, **Express.js**, and **Sequelize ORM**, it features a robust authentication system, cloud media management, and advanced relational data structures.

---

## 🚀 Live Production URL
The API is currently live and accessible at:
### 🔗 [https://spotify-backend-3ouf.onrender.com/](https://spotify-backend-3ouf.onrender.com/)

---

## ✨ Features

- **🔐 Advanced Authentication**: Secure User Registration, Login, and Password Management (OTP-based reset) using **JWT** and **Bcrypt**.
- **👥 Role-Based Access Control (RBAC)**: Distinct permissions for `User`, `Artist`, and `Admin`.
- **📻 Music Management**: High-performance APIs for uploading, updating, deleting, and searching music tracks.
- **☁️ Cloud Media Storage**: Integrated with **ImageKit** for optimized cloud storage of music files and images.
- **📁 Many-to-Many Playlists**: Advanced relationship logic allowing one song to exist in multiple playlists and one playlist to hold thousands of songs (Pivot Table architecture).
- **🛡️ Production Security**: Implements `Helmet` for secure headers, `CORS` for cross-origin safety, and `Express-Rate-Limit` to prevent brute-force attacks.
- **⚡ Pro-Performance**: MySQL database optimization with connection pooling and SSL support for cloud databases (Aiven).

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (Hosted on Aiven Cloud)
- **ORM**: Sequelize (V6)
- **Security**: JWT, Bcrypt, Helmet, CORS
- **Media**: ImageKit Node SDK, Multer

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory for local development:

```env
# Server Config
PORT=3000

# Database Configuration (Cloud or Local)
DB_HOST=your_host
DB_USER=your_user
DB_PORT=your_port
DB_PASSWORD=your_password
DB_NAME=defaultdb

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# ImageKit Configuration
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

---

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/register` | Register a new user |
| POST | `/login` | Login to account (returns JWT) |
| POST | `/forgetPassword` | Initiate OTP-based password reset |
| POST | `/verifyOtp` | Verify received OTP |
| POST | `/resetPassword` | Set a new password |

### 🎵 Music Manager (`/api`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/create` | Upload a new song (Artist Role) |
| GET | `/all` | Fetch all available songs (with pagination) |
| GET | `/search/:name` | Search songs by title |
| PUT | `/update/:id` | Update track metadata |
| DELETE | `/delete/:id` | Permanent deletion of track |

### 📂 Playlists - Multi-Relationship (`/api`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/create` | Initialize a new playlist |
| GET | `/all` | List all playlists with track counts |
| POST | `/add` | Add a song to a playlist (Many-to-Many) |
| DELETE | `/remove` | Remove a song from a playlist |
| GET | `/with-songs/:id` | Fetch full playlist tracks data |

---

## 🚧 Setup for Developers

1. **Clone & Install:**
   ```bash
   git clone https://github.com/dheeraj0808/Spotify-Backend.git
   npm install
   ```

2. **Database Sync:**
   The project uses `sequelize.sync({ alter: true })`, which automatically manages table creation on startup.

3. **Running the Server:**
   ```bash
   npm run dev   # Development with Nodemon
   npm start     # Production mode
   ```

---

## 📝 License
This project is licensed under the **ISC License**.

*Built with ❤️ for the Spotify Clone community.*
