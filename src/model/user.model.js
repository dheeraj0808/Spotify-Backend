const db = require("../db");

// Function to create the users table if it doesn't exist
const createUserTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            role ENUM('user', 'artist') DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error creating users table:", err.message);
        } else {
            console.log("Users table ensured in database");
        }
    });
};

// Creating table automatically when this model is imported
createUserTable();

// Model object to handle user operations
const User = {
    // Find a user by their username
    findByUsername: (username, callback) => {
        const sql = "SELECT * FROM users WHERE username = ?";
        db.query(sql, [username], callback);
    },

    // Create a new user
    create: (userData, callback) => {
        const sql = "INSERT INTO users (username, role) VALUES (?, ?)";
        db.query(sql, [userData.username, userData.role || 'user'], callback);
    },

    // Get all users
    getAll: (callback) => {
        const sql = "SELECT id, username, role, created_at FROM users";
        db.query(sql, callback);
    }
};

module.exports = User;