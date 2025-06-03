# Test Chat Room - Backend

## Project Description
This project provides the backend for a real-time chat room application. It is built with Node.js, Express, MongoDB, and Socket.io. The backend exposes RESTful APIs for chat room and message management, and uses Socket.io to enable real-time communication between clients. All chat data, including rooms and messages, are persisted in MongoDB.

## Features
- Create, list, and join chat rooms
- Send and receive messages in real time (Socket.io)
- RESTful API for chat room and message management
- Store chat rooms and messages in MongoDB
- Scalable architecture for multiple concurrent users
- Modular code structure for easy maintenance and extension

## Requirements
- Node.js (v14 or higher recommended)
- MongoDB (local or remote instance)
- npm (Node package manager)

## Installation & Setup
1. **Install Node.js and MongoDB** on your machine if you haven't already.
2. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd test-chatroom-be
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Configure MongoDB:**
   - By default, the app connects to `mongodb://localhost:27017/chatapp`. You can change this in `app.js` if needed.
   - Start your MongoDB server:
     ```bash
     mongod
     ```
5. **Run the server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node ./bin/www
   ```
6. The server will be available at `http://localhost:3000` by default.

## API Endpoints
### Chat Room APIs
- `GET /api/chat/rooms`  
  Retrieve the list of all chat rooms.
- `POST /api/chat/rooms`  
  Create a new chat room.  
  **Body:** `{ "name": "Room Name" }`

### Message APIs
- `GET /api/chat/rooms/:roomId/messages`  
  Get all messages in a specific chat room.
- `POST /api/chat/messages`  
  Send a new message.  
  **Body:** `{ "chatRoomId": "...", "sender": "...", "content": "..." }`

### Example API Usage (with curl)
- Create a room:
  ```bash
  curl -X POST http://localhost:3000/api/chat/rooms -H "Content-Type: application/json" -d '{"name":"General"}'
  ```
- Send a message:
  ```bash
  curl -X POST http://localhost:3000/api/chat/messages -H "Content-Type: application/json" -d '{"chatRoomId":"<roomId>","sender":"Alice","content":"Hello!"}'
  ```

## Real-time Communication (Socket.io)
- **Connect to the server** using a Socket.io client (e.g., from a web frontend or another Node.js app).
- **Join a room:**
  - Emit event: `joinRoom` with the room ID as payload.
- **Send a message:**
  - Emit event: `sendMessage` with `{ chatRoomId, sender, content }`.
- **Receive new messages:**
  - Listen for event: `newMessage` to receive real-time updates when a new message is sent in the room.

### Example Socket.io Client (JavaScript)
```js
const socket = io('http://localhost:3000');
socket.emit('joinRoom', '<roomId>');
socket.emit('sendMessage', { chatRoomId: '<roomId>', sender: 'Alice', content: 'Hello!' });
socket.on('newMessage', (msg) => {
  console.log('New message:', msg);
});
```

## Main Folder Structure
- `models/`   - Mongoose schemas for ChatRoom and Message
- `routes/`   - Express route definitions for API endpoints
- `configs/`  - Socket.io configuration
- `bin/www`   - Server and Socket.io initialization
- `app.js`    - Express app configuration
- `public/`   - Static files (if needed)

## Example Usage Flow
1. Create a chat room via API or UI.
2. Connect to the backend using a Socket.io client.
3. Join the desired chat room.
4. Send and receive messages in real time.

## Security & Notes
- This project is for learning/demo purposes. For production, consider adding authentication, input validation, and rate limiting.
- CORS is enabled for Socket.io by default (see `bin/www`). Adjust as needed for your frontend.

## Author
- Nhat Thach
