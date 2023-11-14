const { SlashCommandBuilder } = require('discord.js');
const { isInGame, isPlayerInGame, killedByNaturalCauses, killedByPlayer } = require('../core/game');
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
        // Check if Victim is currently in the Game.
        if (!isPlayerInGame(victim)) {
            await replyEmbed(interaction, generalEmbed(`${victim} is not in this game.`));
            return;
        }

        const killer = interaction.options.getString('killer');
        if (killer == null) {
            // Victim died to natural causes.
            killedByNaturalCauses(victim);
            await replyEmbed(interaction, generalEmbed(`${victim} died to natural causes.`));
        } else {
            // Check if Killer is in game.
            if (!isPlayerInGame(killer)) {
                await replyEmbed(interaction, generalEmbed(`${killer} is not in this game.`));
                return;
            }
            // Victim was killed by the Killer.
            killedByPlayer(victim, killer);
            await replyEmbed(interaction, generalEmbed(`${victim} was killed by ${killer}.`));
        }
    },
};