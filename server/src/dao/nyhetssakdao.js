const dao = require('./dao.js');



module.exports = class NyhetssakDao extends dao {
    getAll(callback) {
        super.query("SELECT id, overskrift, ingress innhold, tidspunkt, bilde, kategori, viktighet, forfatter from nyhetssak order by tidspunkt desc", [], callback
        );
    }

    getOne(id, callback) {
        super.query(
            "SELECT overskrift, ingress ,innhold, tidspunkt, bilde, kategori, viktighet, forfatter, likes from nyhetssak where id = (?)", [id], callback
        );
    }



    getAllFrontPage(callback) {
        super.query("SELECT id, overskrift, ingress, innhold, tidspunkt, bilde, kategori, viktighet, forfatter from nyhetssak where viktighet = 1 order by tidspunkt desc", [], callback
        );
    }

    getAmountOfNews(amount, callback) {
        super.query(
            "SELECT id, overskrift, bilde, viktighet FROM nyhetssak HAVING viktighet = 1 ORDER BY tidspunkt DESC limit ?", 
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
        let val = [json.overskrift, json.ingress, json.innhold, dateTime, json.bilde, json.kategori, json.viktighet, json.forfatter];
        super.query(
            "insert into nyhetssak (overskrift, ingress, innhold, tidspunkt, bilde, kategori, viktighet, forfatter) values (?, ?, ?, ?, ?, ?,?, ?)",
            val,
            callback
        );
    }

    getArtiklerLiveFeed(callback) {
        super.query(
            "SELECT id, overskrift, tidspunkt FROM nyhetssak order by tidspunkt desc limit 10", [], callback);
    }

    getArtiklerByCategory(id, callback) {
        super.query(
            "SELECT id, overskrift, bilde, tidspunkt FROM nyhetssak where kategori = (?) order by tidspunkt desc",
            [id], 
            callback
        );
    }

    deleteOne(id, callback) {
        super.query(
            "DELETE from nyhetssak where id = (?)",
            [id],
            callback
        );
    }

    updateOne(id, json, callback) {
        const val = [json.overskrift, json.ingress, json.innhold, json.bilde, json.kategori, json.viktighet, id];
        super.query(
            "UPDATE nyhetssak SET overskrift=?, ingress=?, innhold=?,  bilde=?, kategori=?, viktighet=? where id=?",
            val,
            callback
        );
    }
    updateLikes(id, json, callback) {
        const val = [json.likes, id];
        super.query(
            "UPDATE nyhetssak SET likes = ? where id=?",
            val,
            callback
        );
    }






};