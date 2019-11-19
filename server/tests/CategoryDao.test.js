var mysql = require("mysql");

const CategoryDao = require("../src/dao/CategoryDao");
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

let categoryDao = new CategoryDao(pool);

beforeAll(done => {
    runsqlfile("create_tables.sql", pool, () => {
        runsqlfile("create_testdata_article.sql", pool, done);
    });
});

test("test that we receive all categories", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.length).toBe(4);
    done();
  }
  categoryDao.getAll(callback);
});

test("that we get one category ", done => {
  function callback(status, data) {
    console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Sport");
    done();
  }
  categoryDao.getOne(1, callback);
})

afterAll(() => {
  pool.end();
});