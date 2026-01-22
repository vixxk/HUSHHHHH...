import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import RoomInfo from '../components/room/RoomInfo';
import ChatWindow from '../components/room/ChatWindow';
import MessageInput from '../components/room/MessageInput';
import TypingIndicator from '../components/room/TypingIndicator';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { useTheme } from '../context/ThemeContext';
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
  const { theme } = useTheme();

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

  if (loading) return (
    <div className="w-full h-screen flex items-center justify-center bg-yellow-300">
      <div className="text-4xl font-black animate-bounce">LOADING...</div>
    </div>
  );

  return (
    <div className={`w-full h-[100dvh] flex flex-col items-center justify-center p-0 lg:p-8 overflow-hidden relative transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'bg-[#09090B]' : 'bg-gray-100'
      }`}>
      {/* Dot Pattern Background - Removed for cleaner look in dark mode */}
      <div className={`absolute inset-0 opacity-10 ${theme === 'dark' ? 'hidden' : 'bg-[radial-gradient(#000_2px,transparent_2px)]'
        }`} style={{ backgroundSize: '20px 20px' }}></div>

      {/* Main Card Container */}
      <div className={`w-full h-full max-w-6xl border-x-0 border-y-0 lg:border-0 lg:rounded-2xl flex flex-col overflow-hidden relative z-10 transition-colors duration-500 ease-in-out ${theme === 'dark'
        ? 'bg-[#18181B] shadow-2xl border-[#27272A] border'
        : 'bg-white border-black lg:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] lg:border-4'
        }`}>

        {/* Header */}
        <RoomInfo
          room={room}
          isAdmin={isAdminUser}
          currentUserId={currentUser.id}
          onLeave={handleLeaveRoom}
          onDelete={() => setShowDeleteModal(true)}
        />

        {/* Chat Area */}
        <div className={`flex-1 flex overflow-hidden relative ${theme === 'dark' ? 'bg-[#18181B]' : 'bg-white'
          }`}>
          <div className="flex-1 flex flex-col relative">
            <ChatWindow messages={messages} currentUser={currentUser} roomCode={roomCode} />

            {/* Typing Indicator Overlay */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none p-4">
              <TypingIndicator typingUsers={typingUsers} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <MessageInput onSend={handleSendMessage} onTyping={handleTyping} onStopTyping={handleStopTyping} />
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

      {showKickedModal && (
        <ConfirmationModal
          isOpen={showKickedModal}
          title="ROOM DELETED"
          message="The admin has deleted this room. You will be redirected to the home page."
          onConfirm={handleKickedOut}
          onCancel={() => { }}
          confirmText="OK"
          showCancel={false}
        />
      )}
    </div>
  );
};

export default RoomPage;