const userToUUIDCache = new Map();
const uuidToUserCache = new Map();

/**
 * Retrieve the player's UUID. Throws an error if it does not exist.
 * @param {string} username The Username of the Player
 * @returns The UUID of the Player
 */
const usernameToUUID = async (username) => {
    let UUID = userToUUIDCache.get(username);
    if (UUID == null) {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`, {
            method: 'GET',
        });
        const data = await response.json();
        if ('id' in data) {
            UUID = data['id'];
            userToUUIDCache.set(username, UUID);
        } else {
            throw Error('Could not find a UUID for this user.');
        }
    }
    return UUID;
};

/**
 * Retrieve a Username from a given UUID. If the UUID does not exist, an error is thrown.
 * @param {string} UUID The UUID of the Player.
 * @returns The Username of the Player.
 */
const UUIDToUsername = async (UUID) => {
    let username = uuidToUserCache.get(UUID);
    if (username == null) {
        const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`);
        const data = await response.json();
        if ('name' in data) {
            username = data['name'];
            uuidToUserCache.set(UUID, username);
        } else {
            throw Error('Could not find a Username for that UUID');
        }
    }

    return username;
};

module.exports = {
    usernameToUUID,
    UUIDToUsername,
};