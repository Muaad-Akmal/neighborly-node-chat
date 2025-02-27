import React, { useState } from 'react';
import io from 'socket.io-client';
import "./App.css";
import Chat from "./Chat";


const socket = io('http://localhost:3001'); // Adjust the URL accordingly

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [userId, setUserId] = useState('');

  const joinRoom = () => {
    if (username.trim() !== '' && room.trim() !== '') {
      socket.emit('join-room', { user_id: userId, group_id: room });
      setShowChat(true);
    }
  };
  
  const leaveRoom = () => {
    console.log('leave-room')
    if (username.trim() !== '' && room.trim() !== '') {
      socket.emit('leave-room', { user_id: userId, group_id: room });
    }
  };


  return (
    <div className="App">
    {!showChat ? (
      <div>
        <h1>Chat App</h1>
        
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type="text"
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='room'>Enter Room:</label>
          <input type='text' name='room' value={room} onChange={(e) => setRoom(e.target.value)} />
        </div>
          <div>
            <label htmlFor='userId'>Enter UserId:</label>
            <input type='text' name='userId' value={userId} onChange={(e) => setUserId(e.target.value)} />
          </div>
        <div>
          <button onClick={joinRoom}>Join Room</button>
        </div>
        <div>
          <button onClick={leaveRoom}>Leave Room</button>
        </div>
      </div>
    ): (
        <Chat socket={socket} username={username} userId={userId} room={room} />
      )}
    
    </div>
  );
}

export default App;
