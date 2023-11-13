let inGame = false;

const setInGame = (value) => {
    inGame = value;
};

const startGame = () => {
    setInGame(true);
};

const isInGame = () => {
    return inGame;
};

const endGame = () => {
    setInGame(false);
};

module.exports = {
    setInGame,
    isInGame,
    startGame,
    endGame,
};