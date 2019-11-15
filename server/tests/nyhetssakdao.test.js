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
    runsqlfile("./create_tables.sql", pool, () => {
        runsqlfile("./create_testdata_nyhetssak.sql", pool, done);
    });
});

test("test that one plus one is teo", done => {
  expect(1+1).toBe(2);
})
//
/*
test("Receive one article by id from database", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].overskrift).toBe("Test v2");
    done();
  }
  nyhetssakDao.getOne(2, callback);
})
*/

afterAll(() => {
  pool.end();
})