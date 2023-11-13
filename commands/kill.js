const { SlashCommandBuilder } = require('discord.js');
const { isInGame } = require('../core/game');
const { replyEmbed, generalEmbed } = require('../core/utility');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('Register a Kill in a game.')
        .addStringOption(option =>
            option.setName('victim')
                .setDescription('The player that was killed.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('killer')
                .setDescription('The player that killed the victim.')),
    async execute(interaction) {
        if (!isInGame()) {
            await replyEmbed(interaction, generalEmbed('There is currently no game running.'));
            return;
        }

        const victim = interaction.options.getString('victim');
        const killer = interaction.options.getString('killer');
        if (killer == null) {
            await replyEmbed(interaction, generalEmbed(`${victim} died to natural causes.`));
        } else {
            await replyEmbed(interaction, generalEmbed(`${victim} was killed by ${killer}.`));
        }
    },
};