import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { CometCard } from "../ui/comet-card.jsx";

// Utility function to generate random session ID
const generateSessionId = () => {
  return 'sess_' + Math.random().toString(36).substr(2, 16) + Date.now().toString(36);
};

// Utility function to get or create session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('hushhh_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('hushhh_session_id', sessionId);
  }
  return sessionId;
};

// Create Room Popup Component
export const CreateRoomPopup = ({ isOpen, onClose, onSubmit }) => {
  const [roomType, setRoomType] = useState('public');
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!roomName.trim()) return;
    setIsLoading(true);
    const roomData = {
      roomId: roomName,
      isPrivate: roomType === 'private',
      ...(roomType === 'private' && { password })
    };
    await onSubmit(roomData);
    setIsLoading(false);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <CometCard>
        <div className="relative w-96 rounded-2xl bg-[#1F2121] p-6 shadow-2xl border border-gray-700">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold text-white mb-6">Create A Room</h2>
          <div className="space-y-4">
            {/* Room Type Toggle */}
            <div className="flex bg-gray-800/50 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setRoomType('public')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  roomType === 'public' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Public
              </button>
              <button
                type="button"
                onClick={() => setRoomType('private')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  roomType === 'private' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Private
              </button>
            </div>
            {/* Room Name Input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Room Name
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Enter room name"
              />
            </div>
            {/* Password Input (only for private rooms) */}
            {roomType === 'private' && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Enter room password"
                />
              </div>
            )}
            {/* Note for public rooms */}
            {roomType === 'public' && (
              <p className="text-xs text-gray-400 bg-gray-800/30 p-3 rounded-lg">
                Note: This is open to all and anybody can join this room.
              </p>
            )}
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !roomName.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </div>
      </CometCard>
    </div>
  );
};

// Join Room Popup Component
export const JoinRoomPopup = ({ isOpen, onClose, onSubmit }) => {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    if (!roomId.trim()) return;
    setIsLoading(true);
    const joinData = {
      roomId: roomId,
      ...(password && { password })
    };
    await onSubmit(joinData);
    setIsLoading(false);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <CometCard>
        <div className="relative w-96 rounded-2xl bg-[#1F2121] p-6 shadow-2xl border border-gray-700">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold text-white mb-6">Join A Room</h2>
          <div className="space-y-4">
            {/* Room ID Input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Room ID
              </label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Enter room ID"
              />
            </div>
            {/* Password Input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Enter password (if required)"
              />
            </div>
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !roomId.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Joining...' : 'Join Room'}
            </button>
          </div>
        </div>
      </CometCard>
    </div>
  );
};

// Success Popup Component
export const SuccessPopup = ({ isOpen, onClose, roomData, isCreator }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomData?.roomId || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy room ID');
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <CometCard>
        <div className="relative w-96 rounded-2xl bg-[#1F2121] p-6 shadow-2xl border border-gray-700">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isCreator ? 'Room Created Successfully!' : 'Joined Room Successfully!'}
            </h2>
            <p className="text-gray-300 mb-6">
              {isCreator 
                ? 'Share the Room ID with others to let them join'
                : 'You are now connected to the room'
              }
            </p>
            {roomData && (
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Room ID</p>
                    <p className="text-lg font-mono text-white">{roomData.roomId}</p>
                  </div>
                  <button
                    onClick={handleCopyRoomId}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {roomData.isPrivate && (
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <p className="text-sm text-gray-400">Room Type</p>
                    <p className="text-sm text-purple-400">Private Room</p>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Continue to Chat
            </button>
          </div>
        </div>
      </CometCard>
    </div>
  );
};

// Hook for session management
export const useSession = () => {
  const [sessionId, setSessionId] = useState('');
  useEffect(() => {
    const id = getSessionId();
    setSessionId(id);
  }, []);
  return { sessionId, getSessionId, generateSessionId };
};

// Main RoomCard Component integrating CometCard
export default function RoomCardWithPopups() {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const [joinRoomOpen, setJoinRoomOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const { sessionId } = useSession();

  const handleCreateRoom = async (roomData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const roomInfo = {
        ...roomData,
        createdBy: sessionId,
        createdAt: new Date().toISOString(),
        isAdmin: true
      };
      localStorage.setItem(`room_${roomData.roomId}`, JSON.stringify(roomInfo));
      localStorage.setItem('current_room', roomData.roomId);
      setCurrentRoom(roomInfo);
      setIsCreator(true);
      setCreateRoomOpen(false);
      setSuccessOpen(true);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleJoinRoom = async (joinData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const existingRoom = localStorage.getItem(`room_${joinData.roomId}`);
      if (!existingRoom) {
        alert('Room not found');
        return;
      }
      const roomInfo = JSON.parse(existingRoom);
      if (roomInfo.isPrivate && roomInfo.password !== joinData.password) {
        alert('Invalid password');
        return;
      }
      const userRoomInfo = {
        ...roomInfo,
        joinedBy: sessionId,
        joinedAt: new Date().toISOString(),
        isAdmin: roomInfo.createdBy === sessionId
      };
      localStorage.setItem('current_room', joinData.roomId);
      setCurrentRoom(userRoomInfo);
      setIsCreator(false);
      setJoinRoomOpen(false);
      setSuccessOpen(true);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <CometCard>
        <div
          className="flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-6"
          style={{
            transformStyle: "preserve-3d",
            transform: "none",
            opacity: 1,
          }}
        >
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setCreateRoomOpen(true)}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Create A Room
            </button>
            <button 
              onClick={() => setJoinRoomOpen(true)}
              className="w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 font-medium text-gray-200 transition-all duration-300 hover:bg-gray-700/50 hover:border-gray-500 hover:text-white"
            >
              Join A Room
            </button>
          </div>
        </div>
      </CometCard>
      {/* Popups inside CometCard */}
      <CreateRoomPopup 
        isOpen={createRoomOpen}
        onClose={() => setCreateRoomOpen(false)}
        onSubmit={handleCreateRoom}
      />
      <JoinRoomPopup 
        isOpen={joinRoomOpen}
        onClose={() => setJoinRoomOpen(false)}
        onSubmit={handleJoinRoom}
      />
      <SuccessPopup 
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        roomData={currentRoom}
        isCreator={isCreator}
      />
    </div>
  );
}
