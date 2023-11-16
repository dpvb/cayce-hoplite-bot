const { Events } = require('discord.js');
const { sequelize } = require('../db/connect');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        sequelize.sync().then(() => {
            console.log('Database synced.');
        }).catch((err) => {
            console.error(`Failed to sync database: ${err}`);
            process.exit(1);
        });
        console.log(`Ready! Logged in as: ${client.user.tag}`);
    },
};