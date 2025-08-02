# NutterXMD - WhatsApp Bot Automation Platform

🔥 **NutterXMD** is a comprehensive multi-user WhatsApp bot platform with admin and client dashboards.

## 🚀 Features

### Core Features
- ✅ WhatsApp linking via QR code or 6-digit phone code
- ✅ Auto-generated session IDs with secure management
- ✅ User registration and authentication system
- ✅ Client dashboard with toggleable bot features
- ✅ Admin panel for payment verification and bot activation
- ✅ M-Pesa payment integration with SMS verification
- ✅ 30-day subscription model with automated reminders
- ✅ Multiple bot features (auto-reply, typing delay, group welcome, etc.)

### Design Features
- 🎨 Modern glassmorphism UI with animated backgrounds
- ✨ Smooth animations and micro-interactions
- 📱 Fully responsive design
- 🌟 AI-inspired interface with glowing effects
- 🎭 Professional gradient themes

## 🛠 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Lucide React for icons

**Backend:**
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Baileys for WhatsApp integration
- bcryptjs for password hashing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB Atlas URL:
```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nutterxmd
ADMIN_PHONE=0758891491
NODE_ENV=development
```

5. Start backend server:
```bash
npm run dev
```

### Frontend Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start frontend development server:
```bash
npm run dev
```

## 🎯 Usage Guide

### User Journey
1. **Register** - Create account with username, email, phone
2. **Login** - Access your dashboard
3. **Link WhatsApp** - Use QR code or phone code method
4. **Get Session ID** - Automatically generated after linking
5. **Send Session** - Submit session ID to developer via dashboard
6. **Make Payment** - Pay to M-Pesa 0758891491
7. **Submit Payment** - Paste M-Pesa confirmation in dashboard
8. **Activation** - Admin verifies payment and activates bot for 30 days
9. **Configure Features** - Toggle bot features from dashboard

### Admin Panel
- Access via `/admin` with admin key: `nutterxmd-admin-2024`
- View pending payments and verify M-Pesa confirmations
- Monitor active bot sessions
- Activate bots for 30-day periods

### Bot Features
- 🤖 **Auto Reply** - Automatic message responses
- ⏰ **Typing Delay** - Human-like typing simulation
- 👋 **Group Welcome** - Welcome new group members
- 📅 **Scheduled Messages** - Time-based message sending
- 🔗 **Referral Messages** - Invite and referral system
- 📡 **Online-Only Mode** - Bot works only when user is online
- 💰 **Payment Reminders** - 30-day renewal notifications
- ⌨️ **Custom Commands** - Define custom bot responses

## 🔧 Configuration

### MongoDB Collections
- `users` - User accounts and authentication
- `sessions` - WhatsApp session management
- `payments` - Payment tracking and verification
- `usersettings` - Bot feature configurations

### Environment Variables
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `ADMIN_PHONE` - M-Pesa payment number
- `PORT` - Backend server port

## 👨‍💻 Developer Contact

**Built by Bill Nutter (Calvin Omayio)**
- 📱 WhatsApp: [wa.me/254713881613](https://wa.me/254713881613)
- 🆘 Customer Support: 0713881613
- 💳 M-Pesa Payment: 0758891491

## 📄 License

This project is proprietary software. All rights reserved.

---

**⚡ NutterXMD - Powering WhatsApp Automation Since 2024**