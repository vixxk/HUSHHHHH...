// THIS WILL GENERATE A RANDOM 4-DIGIT ROOM ID
export function roomIdGenerator(){
    const id = Math.floor(1000 + (Math.random()*9000));
    return id; 
};