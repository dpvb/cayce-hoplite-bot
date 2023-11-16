const { DataTypes } = require('sequelize');
const { sequelize } = require('../connect');

const Player = sequelize.define('player', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    kills: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    deaths: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    gamesPlayed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    elo: {
        type: DataTypes.INTEGER,
        defaultValue: 1000,
    },
});

module.exports = Player;