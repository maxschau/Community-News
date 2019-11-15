var mysql = require("mysql");

const NyhetssakDao = require("../src/dao/nyhetssakdao");
const runsqlfile = require("./runsqlfile.js");
/*
var pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql.stud.iie.ntnu.no",
  user: "maxts",
  password: "Ecax0rJT",
  database: "maxts",
  debug: false,
  multipleStatements: true
});
*/ 
//dosiijfdsiojfpodsf

var pool = mysql.createPool({
  connectionLimit : 1,
  host: "mysql",
  user: "root",
  password: "root123",
  database: "school",
  debug: false,
  multipleStatements: true
})


let nyhetssakDao = new NyhetssakDao(pool);

beforeAll(done => {
    runsqlfile("create_tables.sql", pool, () => {
        runsqlfile("create_testdata_nyhetssak.sql", pool, done);
    });
});



test("Receive one article by id from database", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].overskrift).toBe("Test v2");
    done();
  }
  nyhetssakDao.getOne(2, callback);
})

test("Receive all articles from database", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.length).toBe(4);
    done();
  }
  nyhetssakDao.getAll(callback);
})

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
    expect(data.affectedRows).toBe(1);
  }
  nyhetssakDao.createOne(
    {
      overskrift : "Ny overskrift", ingress: "ny ingress", innhold: "ny innhold", bilde: "dummylink.no/", kategori: 2, viktighet: 1, forfatter: "max"
    }, callback
  );
})


afterAll(() => {
  pool.end();
})