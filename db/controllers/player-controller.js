const Player = require('../models/player');

const getPlayer = async (uuid) => {
    const player = await Player.findOne({
        where: {
            uuid,
        },
    });
    return player;
};

const createPlayer = async (uuid) => {
    const player = await Player.create({
        uuid,
    });
    return player;
};

const updateStats = async (uuid, stats) => {
    const update = await Player.update(stats, {
        where: {
            uuid,
        },
    });

    return update;
};

module.exports = {
    getPlayer,
    createPlayer,
    updateStats,
};