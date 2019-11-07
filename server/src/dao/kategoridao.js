const dao = require('./dao.js');

module.exports = class Kategoridao extends dao {
    getAll(callback) {
        super.query(
            "SELECT * FROM kategorier"
        ,[], callback);
    };

    getOne(id, callback) {
        super.query(
            "SELECT * FROM kategorier where id = (?)",
            [id],
            callback
        );
    };
}
