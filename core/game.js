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

module.exports = {
    setInGame,
    isInGame,
    startGame,
};