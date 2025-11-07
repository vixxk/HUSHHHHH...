# 💬 HUSHHHH... - Anonymous Chat Application

A modern, quirky, and fully functional real-time chat application built with React, Socket.IO, and Tailwind CSS — plus a robust Express + Prisma backend. Create or join chat rooms instantly with no sign-up required!

---

## 🌟 Full-Stack Overview

| Layer | Tech | Description |
|-------|------|-------------|
| **Frontend** | React + Vite + Tailwind CSS | Interactive chat UI |
| **Backend** | Express + Socket.IO + Prisma | Real-time APIs and communication |
| **Database** | PostgreSQL (via Prisma ORM) | Room metadata and persistence |
| **Storage** | Cloudinary | File uploads |
| **Realtime** | Socket.IO | Instant messaging and typing indicators |

---

## 📁 Project Structure

```
HUSHHHH/
├── backend/
│   ├── controllers/
│   │   └── room.controllers.js
│   ├── routes/
│   │   ├── room.routes.js
│   │   └── upload.routes.js
│   ├── utils/
│   │   ├── cleanUpRooms.js
│   │   ├── roomIdGenerator.js
│   │   └── updateLastActivity.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── prisma.js
│   ├── uploads/
│   ├── swagger.js
│   ├── cloudinary.config.js
│   ├── multer.middleware.js
│   ├── index.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── RoomPage.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Loading.jsx
│   │   │   │
│   │   │   ├── landing/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── FeatureCards.jsx
│   │   │   │   ├── HowItWorks.jsx
│   │   │   │   └── CTA.jsx
│   │   │   │
│   │   │   ├── modals/
│   │   │   │   ├── CreateRoomModal.jsx
│   │   │   │   ├── JoinRoomModal.jsx
│   │   │   │   └── ConfirmationModal.jsx
│   │   │   │
│   │   │   └── room/
│   │   │       ├── ChatWindow.jsx
│   │   │       ├── Message.jsx
│   │   │       ├── MessageInput.jsx
│   │   │       ├── TypingIndicator.jsx
│   │   │       ├── UsersList.jsx
│   │   │       ├── RoomInfo.jsx
│   │   │       └── FileUpload.jsx
│   │   │
│   │   ├── utils/
│   │   │   ├── messageStorage.js
│   │   │   ├── userStorage.js
│   │   │   └── storageManager.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.local
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
│
└── README.md
```

---

## ⚙️ Backend Setup

### Environment Variables

Create a `.env` file in `/backend`:

```
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/hushhh"
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
BACKEND_URL=http://localhost:5000
NODE_ENV=development
```

### Install Dependencies

```
cd backend
npm install
```

### Prisma Setup

```
npx prisma migrate dev --name init
```

### Start the Backend

```
npm start
```

Server: http://localhost:5000  
Swagger Docs: http://localhost:5000/api-docs

---

## 🔌 Backend Features

- Room Creation, Joining, Deletion
- File Uploads via Cloudinary
- Real-Time Messaging with Socket.IO
- Typing Indicators
- Automatic Inactive Room Cleanup
- Swagger API Docs

---

## 🎯 Frontend Overview

### Core Features
- ✅ Instant Room Creation with unique 4-digit codes
- ✅ Join Public/Private Rooms
- ✅ Real-Time Messaging
- ✅ Typing Indicators
- ✅ File Sharing via Cloudinary
- ✅ User Persistence for 30 minutes
- ✅ Message Persistence for 30 minutes

### UI/UX Features
- 🎨 Quirky black & white theme
- 📱 Fully responsive design
- ⚡ Smooth animations
- 💾 Auto-save for user/message data

---

## 🚀 Frontend Setup

### Installation

```
cd frontend
npm install
```

### Start Development Server

```
npm run dev
```

Frontend runs at: http://localhost:5173

### Environment Variables

```
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🔌 Socket Events

| Event | Description |
|--------|--------------|
| `joinRoom` | Join chat room |
| `sendMessage` | Send message |
| `typing` | Notify typing |
| `stopTyping` | Stop typing notification |
| `receiveMessage` | Receive message |
| `userTyping` | Show typing indicator |
| `userStopTyping` | Hide typing indicator |
| `roomDeleted` | Notify room deletion |

---

## ✅ Health Check

GET http://localhost:5000/health

Response:
```
{ "status": "Server is up and running!" }
```