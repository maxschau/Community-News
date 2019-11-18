const dao = require('./dao.js');

module.exports = class CategoryDao extends dao {
    getAll(callback) {
        super.query(
            "SELECT * FROM categories"
        ,[], callback);
    };

    getOne(id, callback) {
        super.query(
            "SELECT * FROM categories where id = (?)",
            [id],
            callback
        );
    };
}
