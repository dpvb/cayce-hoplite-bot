const { SlashCommandBuilder } = require('discord.js');
const { UUIDToUsername } = require('../core/utility');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test command!')
		.addStringOption(option => {
			return option.setName('input')
				.setDescription('Input UUID...')
				.setRequired(true);
		}),
	async execute(interaction) {
		const UUID = interaction.options.getString('input');
		try {
			const username = await UUIDToUsername(UUID);
			await interaction.reply(username);
		} catch (err) {
			console.error(err);
			await interaction.reply(`An error has occurred: ${err}`);
		}
	},
};