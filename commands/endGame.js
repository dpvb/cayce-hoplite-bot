const { SlashCommandBuilder } = require('discord.js');
const { isInGame, endGame } = require('../core/game');
const { generalEmbed, replyEmbed } = require('../core/utility');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('endgame')
        .setDescription('End the currently active game.'),
    async execute(interaction) {

        if (!isInGame()) {
            await replyEmbed(interaction, generalEmbed('There is no game currently in progress.'));
            return;
        }

        endGame();
        await replyEmbed(interaction, generalEmbed('The game has been ended!'));
    },
};