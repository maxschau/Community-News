// @flow

const dao = require('./dao.js');

module.exports = class CommentsDao extends dao {
    getCommentsByArticle(id : number, callback : function){
        super.query("SELECT * from comments where article = ? order by time desc",
        [id],
        callback);
    };

    addComment(json : {name : string, comment : string, article: number}, callback : function) {
        let val = [json.name, json.comment, json.article];
        super.query(
            "INSERT INTO comments(name, comment, article) values (?, ?, ?)",
            val,
            callback
        );
    }

    deleteComment(id : number, callback : function) {
        super.query(
            "DELETE from comments where id = ?",
            [id],
            callback
        );
    }
};