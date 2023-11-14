class Player {
    constructor(username, uuid) {
        this.username = username;
        this.uuid = uuid;
        this.kills = [];
        this.died = false;
        this.elo = 1000;
    }
}

module.exports = {
    Player,
};