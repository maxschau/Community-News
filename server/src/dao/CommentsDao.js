const dao = require('./dao.js');

module.exports = class CommentsDao extends dao {
    getCommentsByArticle(id, callback){
        super.query("SELECT * from comments where article = ? order by id desc",
        [id],
        callback);
    };

    addComment(json, callback) {
        let val = [json.name, json.comment, json.article];
        super.query(
            "INSERT INTO comments(name, comment, article) values (?, ?, ?)",
            val,
            callback
        );
    }

    deleteComment(id, callback) {
        super.query(
            "DELETE from comments where id = ?",
            [id],
            callback
        );
    }
}