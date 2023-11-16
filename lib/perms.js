const authorizedUsers = ['107607679484047360', '223200575515394048'];

const isAuthorized = (userid) => {
    return authorizedUsers.includes(userid);
};

module.exports = {
    isAuthorized,
};