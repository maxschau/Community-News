DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  id int(11) NOT NULL AUTO_INCREMENT ,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS article;

CREATE TABLE article (
    id int(11) NOT NULL AUTO_INCREMENT,
    headline varchar(60) NOT NULL,
    ingress varchar(100) NOT NULL,
    contents text NOT NULL,
    time datetime NOT NULL,
    image mediumtext NOT NULL,
    category int(11) NOT NULL,
    importance int(11) NOT NULL,
    author varchar(30) NOT NULL,
    likes int(11) NOT NULL DEFAULT '0',
    PRIMARY KEY(id),
    FOREIGN KEY(categories) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
