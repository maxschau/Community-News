var mysql = require("mysql");

const ArticleDao = require("../src/dao/ArticleDao");
const runsqlfile = require("./runsqlfile.js");


var pool = mysql.createPool({
  connectionLimit : 1,
  host: "mysql",
  user: "root",
  password: "root123",
  database: "school",
  debug: false,
  multipleStatements: true
});


let articleDao = new ArticleDao(pool);

beforeAll(done => {
    runsqlfile("create_tables.sql", pool, () => {
        runsqlfile("create_testdata_article.sql", pool, done);
    });
});



test("Receive one article by id from database", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].headline).toBe("Test v2");
    done();
  }
  articleDao.getOne(2, callback);
});

test("Receive all articles from database", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.length).toBe(4);
    done();
  }
  articleDao.getAll(callback);
});

/*
test("get a specific amount of news (2)", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.length).toBe(2);
    done();
  }
  nyhetssakDao.getAmountOfNews(2, callback);
})
*/

test("test that we create a new article", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }
  articleDao.createOne(
    {
      headline : "Ny headline", ingress: "ny ingress", contents: "ny innhold", image: "dummylink.no/", category: 2, importance: 1, author: "max"
    }, callback
  );
});

test("test that we get all articles from one kategori", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.length).toBe(2)
  }
  articleDao.getArticlesByCategory(1, callback);
  done();
});

test("test that we can delete one article", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    let amount = -1;
    articleDao.getAll((data) => {
        amount = data.length;
    });
    expect(length).toBeLessThan(4);
    done();
  }
  articleDao.deleteOne(1, callback);
});

test("test that we can update one article", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    articleDao.getOne(2, (status, data) => {
      console.log("DATA: " + data[0]);
      expect(data[0].headline).toBe("Denne er blitt endret");
      done();
    });
  }
  articleDao.updateOne(
    2,
    {headline : "Denne er blitt endret", ingress: "ny ingress", contents: "ny innhold", image: "dummylink.no/", category: 2, importance: 1, author: "max"},
    callback
  );
});



afterAll(() => {
  pool.end();
});