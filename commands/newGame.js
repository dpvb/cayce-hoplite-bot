const { SlashCommandBuilder } = require('discord.js');
const { isInGame, startGame, getPlayers } = require('../core/game');
const { generalEmbed, replyEmbed, addZeroWidthSpaceBeforeUnderscore } = require('../core/utility');
const { isAuthorized } = require('../lib/perms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newgame')
        .setDescription('Create a New Game')
        .addStringOption(option =>
            option.setName('uuids')
                .setDescription('Comma-separated list of UUIDS in this game.')
                .setRequired(true)),
    async execute(interaction) {
        // Check if player is authorized
        if (!isAuthorized(interaction.user.id)) {
            await replyEmbed(interaction, generalEmbed('You are not authorized to use this command.'));
            return;
        }

        const uuids = interaction.options.getString('uuids');
        if (isInGame()) {
            await replyEmbed(interaction, generalEmbed('There is already a game in progress.'));
            return;
        }

        // Start the Game
        await startGame(uuids);

        // Get Player List
        const playerList = getPlayers();
        let playerListMessage = '';
        playerList.forEach(player => {
            playerListMessage += player.username + '\n';
        });
        playerListMessage = addZeroWidthSpaceBeforeUnderscore(playerListMessage);

        // Create Embed
        const embed = {
            color: 0x0099FF,
            author: {
                name: 'Cayce Hoplite Bot',
            },
            fields: [
                {
                    name: '',
                    value: 'The game has started!',
                },
                {
                    name: 'Players',
                    value: playerListMessage,
                },
            ],
        };

        await replyEmbed(interaction, embed);
    },
};