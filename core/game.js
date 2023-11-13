let inGame = false;

const startGame = () => {
    setInGame(true);
};

const endGame = () => {
    setInGame(false);
};

const setInGame = (value) => {
    inGame = value;
};

const isInGame = () => {
    return inGame;
};


module.exports = {
    setInGame,
    isInGame,
    startGame,
    endGame,
};