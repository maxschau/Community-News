const dao = require('./dao.js');



module.exports = class ArticleDao extends dao {
    getAll(callback) {
        super.query("SELECT id, headline, ingress contents, time, image, category, importance, author from article order by time desc", [], callback
        );
    }

    getOne(id, callback) {
        super.query(
            "SELECT headline, ingress ,contents, time, image, category, importance, author, likes from article where id = (?)", [id], callback
        );
    }



    getAllFrontPage(callback) {
        super.query("SELECT id, headline, ingress, contents, time, image, category, importance, author from article where importance = 1 order by time desc", [], callback
        );
    }

    getAmountOfNews(amount, callback) {
        super.query(
            "SELECT id, headline, image, importance FROM article ORDER BY time DESC limit ?", 
            [amount],
            callback
        );
    }

    createOne(json, callback) {
        console.log("Create one");

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        let val = [json.headline, json.ingress, json.contents, dateTime, json.image, json.category, json.importance, json.author];
        super.query(
            "insert into article (headline, ingress, contents, time, image, category, importance, author) values (?, ?, ?, ?, ?, ?,?, ?)",
            val,
            callback
        );
    }

    getArticlesLiveFeed(callback) {
        super.query(
            "SELECT id, headline, time FROM article order by time desc limit 10", [], callback);
    }

    getArticlesByCategory(id, callback) {
        super.query(
            "SELECT id, headline, image, time FROM article where category = (?) order by time desc",
            [id], 
            callback
        );
    }

    deleteOne(id, callback) {
        super.query(
            "DELETE from article where id = (?)",
            [id],
            callback
        );
    }

    updateOne(id, json, callback) {
        const val = [json.headline, json.ingress, json.contents, json.image, json.category, json.importance, id];
        super.query(
            "UPDATE article SET headline=?, ingress=?, contents=?,  image=?, category=?, importance=? where id=?",
            val,
            callback
        );
    }
    updateLikes(id, callback) {
        super.query(
            "UPDATE article SET likes = likes+1 where id=?",
            id,
            callback
        );
    }






};