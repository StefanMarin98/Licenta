const { User, OP } = require("../models");

const user = {
    create: async user => {
        try {
            //check if the user already exists
            const foundUser =
                (await User.findOne({ where: { email: user.email } })) || false;
            if (foundUser) {
                return false;
            }
            user.password = await User.generateHash(user.password);

            return await User.create(user);
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    getById: async id => {
        try {
            const users = await User.findOne({
                where: {
                    id
                },
                attributes: ["fullName", "id", "email"]
            });
            return users;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    delete: async id => {
        try {
            return await User.destroy({
                where: {
                    id
                }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    login: async (email, password) => {
        try {
            const foundUser =
                (await User.findOne({ where: { email } })) || false;
            if (foundUser) {
                const validPassword = await foundUser.validPassword(password);
                return validPassword ? foundUser.id : false;
            } else {
                return false;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }
};

module.exports = user;