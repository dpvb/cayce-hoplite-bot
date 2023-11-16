const { SlashCommandBuilder } = require('discord.js');
const { isInGame, endGame, isPlayerInGame } = require('../core/game');
const { generalEmbed, replyEmbed } = require('../core/utility');
const { isAuthorized } = require('../lib/perms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('endgame')
        .setDescription('End the currently active game.')
        .addStringOption(option =>
            option.setName('winner')
            .setDescription('The winner of the game.')
            .setRequired(true)),
    async execute(interaction) {
        // Check if player is authorized
        if (!isAuthorized(interaction.user.id)) {
            await replyEmbed(interaction, generalEmbed('You are not authorized to use this command.'));
            return;
        }

        // Check if in game.
        if (!isInGame()) {
            await replyEmbed(interaction, generalEmbed('There is no game currently in progress.'));
            return;
        }

        // Get the winner
        const winner = interaction.options.getString('winner');
        if (!isPlayerInGame(winner)) {
            await replyEmbed(interaction, generalEmbed('That player is not in the game.'));
            return;
        }
        // End the game.
        await endGame(winner);
        await replyEmbed(interaction, generalEmbed('The game has been ended!'));
    },
};