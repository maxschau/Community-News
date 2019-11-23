// @flow

const dao = require('./dao.js');

module.exports = class CategoryDao extends dao {
    getAll(callback : function) {
        super.query(
            "SELECT * FROM categories"
        ,[], callback);
    };

    getOne(id : number, callback : Function) {
        super.query(
            "SELECT * FROM categories where id = (?)",
            [id],
            callback
        );
    };
};
