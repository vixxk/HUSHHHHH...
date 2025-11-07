import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import RoomInfo from '../components/room/RoomInfo';
import ChatWindow from '../components/room/ChatWindow';
import MessageInput from '../components/room/MessageInput';
import TypingIndicator from '../components/room/TypingIndicator';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { 
  saveMessagesToStorage, 
  getMessagesFromStorage, 
  clearMessagesFromStorage,
  clearExpiredMessages 
} from '../utils/messageStorage';
import {
  saveUserData,
  getUserData,
  clearUserData,
  cleanupExpiredUsers
} from '../utils/userStorage';

const RoomPage = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const socketRef = useRef(null);

  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showKickedModal, setShowKickedModal] = useState(false);
  const [messagesLoadedFromStorage, setMessagesLoadedFromStorage] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const currentUserRef = useRef(null);

  if (!currentUserRef.current) {
    const savedUserData = getUserData(roomCode);

    if (savedUserData) {
      currentUserRef.current = savedUserData;
    } else {
      const newUser = {
        id: Date.now(),
        name: `User${Math.floor(Math.random() * 1000)}`
      };
      currentUserRef.current = newUser;
    }
  }

  const currentUser = currentUserRef.current;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const initializeRoom = async () => {
      try {
        clearExpiredMessages();
        cleanupExpiredUsers();

        const roomInfo = JSON.parse(localStorage.getItem('currentRoom'));
        if (!roomInfo || roomInfo.roomCode != roomCode) {
          navigate('/');
          return;
        }

        setRoom(roomInfo);

        const adminId = parseInt(roomInfo.admin);
        const isAdmin = parseInt(currentUser.id) === adminId;
        setIsAdminUser(isAdmin);

        saveUserData(roomCode, currentUser);

        const cachedMessages = getMessagesFromStorage(roomCode);
        if (cachedMessages && cachedMessages.length > 0) {
          setMessages(cachedMessages);
          setMessagesLoadedFromStorage(true);
        }

        socketRef.current = io(BACKEND_URL);
        
        socketRef.current.emit('joinRoom', { roomCode: parseInt(roomCode) });
        
        setUsers([{
          id: currentUser.id,
          name: currentUser.name,
          isOnline: true
        }]);

        socketRef.current.on('receiveMessage', (message) => {
          setMessages(prev => {
            const updated = [...prev, message];
            saveMessagesToStorage(roomCode, updated);
            return updated;
          });
        });

        socketRef.current.on('userTyping', ({ sender }) => {
          setTypingUsers(prev => !prev.includes(sender) && sender !== currentUser.name ? [...prev, sender] : prev);
        });

        socketRef.current.on('userStopTyping', () => setTypingUsers([]));

        socketRef.current.on('userJoined', (userData) => {
          setUsers(prev => prev.some(u => u.id === userData.id) ? prev : [...prev, userData]);
        });

        socketRef.current.on('userLeft', (userId) => {
          setUsers(prev => prev.filter(u => u.id !== userId));
        });

        socketRef.current.on('roomDeleted', ({ message }) => {
          setShowKickedModal(true);
        });

        setLoading(false);
      } catch (err) {
        setError('Failed to join room');
        setLoading(false);
      }
    };

    initializeRoom();

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [roomCode, navigate, BACKEND_URL, currentUser]);

  useEffect(() => {
    if (messages.length > 0 && messagesLoadedFromStorage) {
      saveMessagesToStorage(roomCode, messages);
    }
  }, [messages, roomCode, messagesLoadedFromStorage]);

  useEffect(() => {
    const interval = setInterval(() => {
      saveUserData(roomCode, currentUser);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [roomCode, currentUser]);

  const handleSendMessage = (message, type = 'text') => {
    if (!socketRef.current) return;

    socketRef.current.emit('sendMessage', {
      roomCode: parseInt(roomCode),
      sender: currentUser.name,
      message,
      type
    });
  };

  const handleTyping = () => socketRef.current?.emit('typing', { roomCode: parseInt(roomCode), sender: currentUser.name });
  const handleStopTyping = () => socketRef.current?.emit('stopTyping', { roomCode: parseInt(roomCode) });

  const handleLeaveRoom = () => {
    socketRef.current?.disconnect();
    localStorage.removeItem('currentRoom');
    clearUserData(roomCode);
    navigate('/');
  };

  const handleKickedOut = () => {
    socketRef.current?.disconnect();
    localStorage.removeItem('currentRoom');
    clearMessagesFromStorage(roomCode);
    clearUserData(roomCode);
    navigate('/');
  };

  const handleDeleteRoom = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/room/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode: parseInt(roomCode), userId: currentUser.id })
      });
      
      const data = await response.json();

      if (response.ok) {
        clearMessagesFromStorage(roomCode);
        clearUserData(roomCode);
        handleLeaveRoom();
      } else {
        console.error('Delete failed:', data.message);
        setError(data.message || 'Failed to delete room');
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please try again.');
    }
    setShowDeleteModal(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      <RoomInfo 
        room={room}
        isAdmin={isAdminUser}
        currentUserId={currentUser.id}
        onLeave={handleLeaveRoom}
        onDelete={() => setShowDeleteModal(true)}
      />

      <div className="flex-1 flex overflow-hidden border-t-4 border-black">
        <div className="flex-1 flex flex-col">
          <ChatWindow messages={messages} currentUser={currentUser} roomCode={roomCode} />
          <TypingIndicator typingUsers={typingUsers} />
          <MessageInput onSend={handleSendMessage} onTyping={handleTyping} onStopTyping={handleStopTyping} />
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          title="DELETE ROOM?"
          message="This action cannot be undone. All messages will be lost forever."
          onConfirm={handleDeleteRoom}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Modal for kicked users */}
      {showKickedModal && (
        <ConfirmationModal
          isOpen={showKickedModal}
          title="ROOM DELETED"
          message="The admin has deleted this room. You will be redirected to the home page."
          onConfirm={handleKickedOut}
          onCancel={() => {}}
          confirmText="OK"
          showCancel={false}
        />
      )}
    </div>
  );
};

export default RoomPage;