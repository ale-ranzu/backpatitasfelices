const bcrypt = require("bcryptjs");

const encriptarPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

const comparar = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};



module.exports = { encriptarPassword, comparar };
