const { SlashCommandBuilder } = require('discord.js');
const { calcKillElo, calcDeathToPlayerElo } = require('../core/elo');
const { isAuthorized } = require('../lib/perms');
const { replyEmbed, generalEmbed } = require('../core/utility');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test command!')
		.addIntegerOption(option => {
			return option.setName('test1')
				.setDescription('loser elo')
				.setRequired(true);
		})
		.addIntegerOption(option => {
			return option.setName('test2')
				.setDescription('winner elo')
				.setRequired(true);
		}),
	async execute(interaction) {
		// Check if player is authorized
		if (!isAuthorized(interaction.user.id)) {
			await replyEmbed(interaction, generalEmbed('You are not authorized to use this command.'));
			return;
		}
		const loserElo = interaction.options.getInteger('test1');
		const winnerElo = interaction.options.getInteger('test2');

		const killerElo = calcKillElo(winnerElo, loserElo);
		const deathElo = calcDeathToPlayerElo(loserElo, winnerElo);
		await interaction.reply(`Killer ELO: ${killerElo} Death ELO: ${deathElo}`);
	},
};