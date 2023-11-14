/**
 * Calculates the odds of Player 1 winning the fight.
 * @param {int} loserElo - Elo of lower.
 * @param {int} winnerElo - Elo of winner.
 */
const expectedOutcome = (loserElo, winnerElo) => {
    return 1.0 / (1 + Math.pow(10, (loserElo - winnerElo) / 400.0));
};

const calcKillElo = (killerElo, victimElo) => {
    return killerElo + 32 * (1 - expectedOutcome(victimElo, killerElo));
};

const calcDeathToPlayerElo = (victimElo, killerElo) => {
    return victimElo - 32 * (1 - expectedOutcome(victimElo, killerElo));
};

const calcDeathToNCElo = (victimElo) => {
    return victimElo - 32 * (1 - expectedOutcome(victimElo, 1000));
};

module.exports = {
    expectedOutcome,
    calcKillElo,
    calcDeathToPlayerElo,
    calcDeathToNCElo,
};