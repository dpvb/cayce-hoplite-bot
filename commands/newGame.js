const { SlashCommandBuilder } = require('discord.js');
const { isInGame, startGame } = require('../core/game');
const { generalEmbed, replyEmbed } = require('../core/utility');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newgame')
        .setDescription('Create a New Game'),
    async execute(interaction) {

        if (isInGame()) {
            await replyEmbed(interaction, generalEmbed('There is already a game in progress.'));
            return;
        }

        startGame();
        await replyEmbed(interaction, generalEmbed('New game has started!'));
    },
};