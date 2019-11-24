// @flow


let express = require("express");
let mysql = require("mysql");
let app = express();
let apiRoutes = express.Router();
let bodyParser = require("body-parser");
app.use(bodyParser.json()); // for å tolke JSON

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Fikk en feilmelding der jeg ikke hadde lov til å bruke DELETE-metoden
    next();
});

const CategoryDao = require("./dao/CategoryDao");
const ArticleDao = require("./dao/ArticleDao");
const CommmentsDao = require("./dao/CommentsDao");

let pool = mysql.createPool( {
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "maxts",
    password: "Ecax0rJT",
    database: "maxts",
    debug: false
});

let articleDao = new ArticleDao(pool);
let categoryDao = new CategoryDao(pool);
let commentsDao = new CommmentsDao(pool);

//Comments //

//BØR KANSKJE ENDRES???
app.get("/comments/:id", (req, res) => {
    commentsDao.getCommentsByArticle(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/comments/:id", (req, res) => {
    commentsDao.deleteComment(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/comments", (req, res) => {
    commentsDao.addComment(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});




app.get("/articles", (req ,res) => {
    articleDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});


//Registrer ny artikkel
app.post("/articles", (req, res)  => {
   articleDao.createOne(req.body, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

//Hent en nyhetssak
app.get("/articles/:id", (req, res) => {
   articleDao.getOne(req.params.id, (status, data) => {
       res.status(status);
       res.json(data);
   })
});

//Slett en nyhetssak
app.delete("/articles/:id", (req, res) => {
   articleDao.deleteOne(req.params.id, (status, data) => {
       res.status(status);
       res.json(data);
   });
});

app.put("/articles/likes/:id", (req, res) => {
    articleDao.updateLikes(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

//Endre en nyhetssak
app.put("/articles/:id", (req, res) => {
    articleDao.updateOne(req.params.id, req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

//Henter articles til livefeed

// BØR KANSKJE ENDRES?????!!??!?!?!?!?
app.get("/livefeed", (req, res) => {
    articleDao.getArticlesLiveFeed((status, data) => {
        res.status(status);
        res.json(data);
    })
});

//Henter alle kategorier
app.get("/categories", (reg, res) => {
    categoryDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    })
});

//Henter en kategori
app.get("/categories/:id", (req, res) => {
    categoryDao.getOne(parseInt(req.params.id), (status, data) => {
        res.status(status);
        res.json(data);
    })
});
//Henter alle articles til en kategori
app.get("/articles/categories/:id", (req, res) => {
    articleDao.getArticlesByCategory(parseInt(req.params.id), (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get("/frontpage", (req, res) => {
    articleDao.getAllFrontPage((status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/articles/getAmount/:amount", (req, res) => {
    articleDao.getAmountOfNews(parseInt(req.params.amount), (status, data) => {
        res.status(status);
        res.json(data);
    });
});


let server = app.listen(8080);