export const initializeStorageCleanup = () => {
    const now = Date.now();
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('room_messages_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          const messageAge = now - data.timestamp;
          
          if (messageAge > 30 * 60 * 1000) {
            localStorage.removeItem(key);
            console.log(`🗑️ Cleaned up expired messages: ${key}`);
          }
        } catch (error) {
          localStorage.removeItem(key);
        }
      }
    });
  };
  

  export const getCachedRooms = () => {
    const cachedRooms = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('room_messages_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          const roomCode = key.replace('room_messages_', '');
          cachedRooms.push({
            roomCode,
            messageCount: data.messages.length,
            timestamp: new Date(data.timestamp).toLocaleString()
          });
        } catch (error) {
        }
      }
    });
    
    return cachedRooms;
  };
  
  export const clearAllMessageCache = () => {
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('room_messages_')) {
        localStorage.removeItem(key);
      }
    });
    
    console.log('🗑️ Cleared all message cache');
  };
  