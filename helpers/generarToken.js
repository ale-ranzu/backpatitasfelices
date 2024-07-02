const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
};

const tokenVerify = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return e;
    }
};

const tokenDecrypt = async (token) => {
    try {
        return jwt.decode(token, null);
    } catch (e) {
        return e;
    }
}

module.exports = { tokenSign, tokenVerify, tokenDecrypt };
