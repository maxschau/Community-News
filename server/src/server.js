// @flow


var express = require("express");
var mysql = require("mysql");
var app = express();
var apiRoutes = express.Router();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // for å tolke JSON

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Fikk en feilmelding der jeg ikke hadde lov til å bruke DELETE-metoden
    next();
});

const KategoriDao = require("./dao/kategoridao");
const NyhetssakDao = require("./dao/nyhetssakdao");

var pool = mysql.createPool( {
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "maxts",
    password: "Ecax0rJT",
    database: "maxts",
    debug: false
});

let nyhetssakDao = new NyhetssakDao(pool);
let kategoriDao = new KategoriDao(pool);


app.get("/nyheter", (req ,res) => {
    nyhetssakDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});


//Registrer ny artikkel
app.post("/nyheter", (req, res)  => {
   nyhetssakDao.createOne(req.body, (status, data) => {
      res.status(status);
      res.json(data);
   });
});

//Hent en nyhetssak
app.get("/nyheter/:id", (req, res) => {
   nyhetssakDao.getOne(req.params.id, (status, data) => {
       res.status(status);
       res.json(data);
   })
});

//Slett en nyhetssak
app.delete("/nyheter/:id", (req, res) => {
   nyhetssakDao.deleteOne(req.params.id, (status, data) => {
       res.status(status);
       res.json(data);
   });
});

app.put("/nyheter/likes/:id", (req, res) => {
    nyhetssakDao.updateLikes(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

//Endre en nyhetssak
app.put("/nyheter/:id", (req, res) => {
    nyhetssakDao.updateOne(req.params.id, req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

//Henter nyheter til livefeed

// BØR KANSKJE ENDRES?????!!??!?!?!?!?
app.get("/livefeed", (req, res) => {
    nyhetssakDao.getArtiklerLiveFeed((status, data) => {
        res.status(status);
        res.json(data);
    })
});

//Henter alle kategorier
app.get("/kategorier", (reg, res) => {
    kategoriDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    })
});

//Henter en kategori
app.get("/kategorier/:id", (req, res) => {
    kategoriDao.getOne(parseInt(req.params.id), (status, data) => {
        res.status(status);
        res.json(data);
    })
});
//Henter alle nyheter til en kategori
app.get("/nyheter/kategorier/:id", (req, res) => {
    nyhetssakDao.getArtiklerByCategory(parseInt(req.params.id), (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get("/frontpage", (req, res) => {
    nyhetssakDao.getAllFrontPage((status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/nyheter/finnAntall/:antall", (req, res) => {
    nyhetssakDao.getAmountOfNews(parseInt(req.params.antall), (status, data) => {
        res.status(status);
        res.json(data);
    });
});


var server = app.listen(8080);