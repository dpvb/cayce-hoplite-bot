const { SlashCommandBuilder } = require('discord.js');
const { isInGame, isPlayerInGame, removePlayerFromGame } = require('../core/game');
const { replyEmbed, generalEmbed } = require('../core/utility');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove a Player from the Game')
        .addStringOption(option =>
            option.setName('username')
            .setDescription('The name of the player you want to remove.')
            .setRequired(true)),
    async execute(interaction) {
        if (!isInGame()) {
            await replyEmbed(interaction, generalEmbed('There is currently no game running.'));
            return;
        }

        const username = interaction.options.getString('username');
        if (!isPlayerInGame(username)) {
            await replyEmbed(interaction, generalEmbed(`${username} is not in this game.`));
            return;
        }

        removePlayerFromGame(username);
        await replyEmbed(interaction, generalEmbed(`Removed ${username} from game.`));
    },
};
