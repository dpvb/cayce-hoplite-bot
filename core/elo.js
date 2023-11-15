/**
 * Calculates the odds of Player 1 winning the fight.
 * @param {int} loserElo - Elo of lower.
 * @param {int} winnerElo - Elo of winner.
 */
const expectedOutcome = (loserElo, winnerElo) => {
    return 1.0 / (1 + Math.pow(10, (loserElo - winnerElo) / 400.0));
};

const calcKillElo = (killerElo, victimElo) => {
    return killerElo + 40 * (1 - expectedOutcome(victimElo, killerElo));
};

const calcDeathToPlayerElo = (victimElo, killerElo) => {
    return victimElo - 40 * (1 - expectedOutcome(victimElo, killerElo));
};

const calcDeathToNCElo = (victimElo) => {
    return victimElo - 40 * (1 - expectedOutcome(victimElo, 1000));
};

/**
 * Calculate the placement elo gain for a player against placing over "victim".
 * @param {int} playerElo The elo of the player who placed above the victim.
 * @param {int} victimElo The elo of the victim (the one who is placed below the player).
 * @returns The elo gain for a placement above the victim.
 */
const calcPlacementEloGain = (playerElo, victimElo) => {
    return 2.49 * (1 - expectedOutcome(victimElo, playerElo));
};

/**
 * Calculate the elo gain the player gets for winning against this loser.
 * @param {int} winnerElo The elo of the winner.
 * @param {int} loserElo The elo of the loser.
 * @returns The elo gain for a win against this player.
 */
const calcWinnerEloGain = (winnerElo, loserElo) => {
    return 1.49 * (1 - expectedOutcome(loserElo, winnerElo));
};

module.exports = {
    expectedOutcome,
    calcKillElo,
    calcDeathToPlayerElo,
    calcDeathToNCElo,
    calcPlacementEloGain,
    calcWinnerEloGain,
};