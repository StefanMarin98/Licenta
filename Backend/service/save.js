const { Save, OP } = require("../models");

const save = {
    create: async save => {
        try {
            const result = await Save.create(save);
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    delete: async id => {
        try {
            return await Save.destroy({
                where: {
                    id
                }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    update: async save => {
        try {
            const result = await Save.update(save, {
                where: { id: save.id, userId: save.userId, testId: save.testId }
            });
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },
};

module.exports = save;