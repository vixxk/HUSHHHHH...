const USER_PREFIX = 'chatroom_user_';
const EXPIRATION_TIME = 30 * 60 * 1000; 

export const saveUserData = (roomCode, userData) => {
  try {
    const data = {
      id: userData.id,
      name: userData.name,
      timestamp: Date.now(),
      roomCode: roomCode
    };
    localStorage.setItem(`${USER_PREFIX}${roomCode}`, JSON.stringify(data));
    console.log(`User data saved: ${userData.name} (${userData.id})`);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserData = (roomCode) => {
  try {
    const stored = localStorage.getItem(`${USER_PREFIX}${roomCode}`);
    
    if (!stored) {
      return null;
    }

    const data = JSON.parse(stored);
    const now = Date.now();
    const userAge = now - data.timestamp;

    if (userAge > EXPIRATION_TIME) {
      localStorage.removeItem(`${USER_PREFIX}${roomCode}`);
      console.log(`User data expired for room ${roomCode}`);
      return null;
    }

    console.log(`User data retrieved: ${data.name} (expires in ${Math.floor((EXPIRATION_TIME - userAge) / 60000)} mins)`);
    return {
      id: data.id,
      name: data.name
    };
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};


export const clearUserData = (roomCode) => {
  try {
    localStorage.removeItem(`${USER_PREFIX}${roomCode}`);
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

export const getAllCachedUsers = () => {
  try {
    const users = [];
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      if (key.startsWith(USER_PREFIX)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          users.push(data);
        } catch (error) {
          localStorage.removeItem(key);
        }
      }
    });

    return users;
  } catch (error) {
    console.error('Error getting cached users:', error);
    return [];
  }
};


export const cleanupExpiredUsers = () => {
  try {
    const now = Date.now();
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      if (key.startsWith(USER_PREFIX)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          const userAge = now - data.timestamp;

          if (userAge > EXPIRATION_TIME) {
            localStorage.removeItem(key);
            console.log(`Cleaned up expired user: ${data.name}`);
          }
        } catch (error) {
          localStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.error('Error cleaning up expired users:', error);
  }
};


export const getUserSessionInfo = (roomCode) => {
  try {
    const stored = localStorage.getItem(`${USER_PREFIX}${roomCode}`);
    
    if (!stored) {
      return null;
    }

    const data = JSON.parse(stored);
    const now = Date.now();
    const userAge = now - data.timestamp;
    const timeRemaining = Math.max(0, EXPIRATION_TIME - userAge);

    return {
      name: data.name,
      expiresIn: `${Math.floor(timeRemaining / 60000)} minutes`,
      percentRemaining: Math.round((timeRemaining / EXPIRATION_TIME) * 100)
    };
  } catch (error) {
    return null;
  }
};
