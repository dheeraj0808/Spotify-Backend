const otpTemplate = (otp, userName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification - Spotify Backend</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f8f9fa;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #191414;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                color: #1DB954;
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .header p {
                color: #b3b3b3;
                font-size: 16px;
            }
            .content {
                background-color: white;
                padding: 40px 30px;
            }
            .greeting {
                font-size: 18px;
                color: #333;
                margin-bottom: 20px;
            }
            .message {
                font-size: 16px;
                color: #666;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .otp-container {
                background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%);
                border: 2px dashed #1DB954;
                border-radius: 10px;
                padding: 30px;
                text-align: center;
                margin: 30px 0;
            }
            .otp-label {
                font-size: 14px;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 15px;
            }
            .otp-code {
                font-size: 36px;
                font-weight: bold;
                color: #1DB954;
                letter-spacing: 5px;
                background: white;
                padding: 15px 25px;
                border-radius: 8px;
                display: inline-block;
                box-shadow: 0 4px 15px rgba(29, 185, 84, 0.2);
            }
            .instructions {
                background-color: #f8f9fa;
                border-left: 4px solid #1DB954;
                padding: 20px;
                margin: 30px 0;
                border-radius: 5px;
            }
            .instructions h3 {
                color: #333;
                font-size: 16px;
                margin-bottom: 15px;
            }
            .instructions ul {
                list-style: none;
                padding: 0;
            }
            .instructions li {
                color: #666;
                font-size: 14px;
                margin-bottom: 10px;
                padding-left: 20px;
                position: relative;
            }
            .instructions li:before {
                content: "✓";
                color: #1DB954;
                position: absolute;
                left: 0;
                font-weight: bold;
            }
            .footer {
                background-color: #191414;
                padding: 30px;
                text-align: center;
            }
            .footer p {
                color: #b3b3b3;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .footer .security-note {
                color: #ff6b6b;
                font-size: 12px;
                font-style: italic;
            }
            .social-links {
                margin-top: 20px;
            }
            .social-links a {
                color: #b3b3b3;
                text-decoration: none;
                margin: 0 10px;
                font-size: 20px;
            }
            .social-links a:hover {
                color: #1DB954;
            }
            @media (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 10px;
                }
                .header, .content, .footer {
                    padding: 20px;
                }
                .otp-code {
                    font-size: 28px;
                    letter-spacing: 3px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎵 Spotify Backend</h1>
                <p>Secure Music Platform</p>
            </div>
            
            <div class="content">
                <p class="greeting">Hello ${userName || 'User'},</p>
                
                <p class="message">
                    We received a request to reset your password for your Spotify Backend account. 
                    To proceed with the password reset, please use the One-Time Password (OTP) below:
                </p>
                
                <div class="otp-container">
                    <div class="otp-label">Your OTP Code</div>
                    <div class="otp-code">${otp}</div>
                </div>
                
                <div class="instructions">
                    <h3>🔒 Important Instructions:</h3>
                    <ul>
                        <li>This OTP will expire in <strong>10 minutes</strong></li>
                        <li>Do not share this OTP with anyone</li>
                        <li>Our team will never ask for your OTP</li>
                        <li>If you didn't request this, please ignore this email</li>
                        <li>For security, this OTP can only be used once</li>
                    </ul>
                </div>
                
                <p class="message">
                    If you have any questions or concerns, please contact our support team.
                </p>
            </div>
            
            <div class="footer">
                <p>Thank you for using Spotify Backend</p>
                <p class="security-note">
                    🔐 This is an automated security email. Please do not reply to this message.
                </p>
                <div class="social-links">
                    <a href="#">📧</a>
                    <a href="#">🌐</a>
                    <a href="#">📱</a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

const welcomeTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Spotify Backend</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f8f9fa;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #191414;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                color: #1DB954;
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .content {
                background-color: white;
                padding: 40px 30px;
            }
            .welcome-message {
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
                text-align: center;
            }
            .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            .feature {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
            }
            .feature-icon {
                font-size: 30px;
                margin-bottom: 10px;
            }
            .feature-title {
                font-weight: bold;
                color: #333;
                margin-bottom: 5px;
            }
            .footer {
                background-color: #191414;
                padding: 30px;
                text-align: center;
            }
            .footer p {
                color: #b3b3b3;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎵 Spotify Backend</h1>
                <p>Secure Music Platform</p>
            </div>
            
            <div class="content">
                <h2 class="welcome-message">Welcome, ${userName || 'User'}! 🎉</h2>
                
                <p style="text-align: center; color: #666; margin-bottom: 30px;">
                    Your account has been successfully created. Start exploring our amazing features!
                </p>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">🎵</div>
                        <div class="feature-title">Music Library</div>
                        <div style="color: #666; font-size: 14px;">Upload and manage your music</div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">📱</div>
                        <div class="feature-title">Playlists</div>
                        <div style="color: #666; font-size: 14px;">Create custom playlists</div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">❤️</div>
                        <div class="feature-title">Likes</div>
                        <div style="color: #666; font-size: 14px;">Like your favorite songs</div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>Thank you for joining Spotify Backend!</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = {
  otpTemplate,
  welcomeTemplate
};
