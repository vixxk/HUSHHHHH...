const MESSAGE_PREFIX = "room_messages_";
const EXPIRATION_TIME = 30 * 60 * 1000;

export const saveMessagesToStorage = (roomCode, messages) => {
  try {
    const data = {
      messages,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${MESSAGE_PREFIX}${roomCode}`, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving messages to storage:", error);
  }
};

export const getMessagesFromStorage = (roomCode) => {
  try {
    const stored = localStorage.getItem(`${MESSAGE_PREFIX}${roomCode}`);

    if (!stored) {
      return null;
    }

    const data = JSON.parse(stored);
    const now = Date.now();
    const messageAge = now - data.timestamp;

    if (messageAge > EXPIRATION_TIME) {
      localStorage.removeItem(`${MESSAGE_PREFIX}${roomCode}`);
      return null;
    }

    return data.messages;
  } catch (error) {
    console.error("Error retrieving messages from storage:", error);
    return null;
  }
};

//  Clear messages for a specific room
export const clearMessagesFromStorage = (roomCode) => {
  try {
    localStorage.removeItem(`${MESSAGE_PREFIX}${roomCode}`);
  } catch (error) {
    console.error("Error clearing messages from storage:", error);
  }
};
 
export const clearExpiredMessages = () => {
  try {
    const now = Date.now();
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith(MESSAGE_PREFIX)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          const messageAge = now - data.timestamp;

          if (messageAge > EXPIRATION_TIME) {
            localStorage.removeItem(key);
          }
        } catch (error) {
          localStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.error("Error clearing expired messages:", error);
  }
};

// For Debugging
export const getStorageInfo = (roomCode) => {
  try {
    const stored = localStorage.getItem(`${MESSAGE_PREFIX}${roomCode}`);

    if (!stored) {
      return {
        exists: false,
        messageCount: 0,
        timeRemaining: null,
      };
    }

    const data = JSON.parse(stored);
    const now = Date.now();
    const messageAge = now - data.timestamp;
    const timeRemaining = Math.max(0, EXPIRATION_TIME - messageAge);

    return {
      exists: true,
      messageCount: data.messages.length,
      timeRemaining,
      expiresIn: `${Math.floor(timeRemaining / 60000)} minutes`,
    };
  } catch (error) {
    return {
      exists: false,
      error: error.message,
    };
  }
};
