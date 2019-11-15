DROP TABLE IF EXISTS kategorier;
CREATE TABLE kategorier (
  "id" int(11) NOT NULL,
  "navn" varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS nyhetssak;

CREATE TABLE nyhetssak (
    "id" int(11) NOT NULL AUTO_INCREMENT,
    "overskrift" varchar(60) NOT NULL,
    "ingress" varchar(100) NOT NULL,
    "innhold" text NOT NULL,
    "tidspunkt" datetime NOT NULL,
    "bilde" mediumtext NOT NULL,
    "kategori" int(11) NOT NULL,
    "viktighet" int(11) NOT NULL,
    "forfatter" varchar(30) NOT NULL,
    "likes" int(11) NOT NULL DEFAULT '0',
    PRIMARY KEY(id),
    FOREIGN KEY(kategori) REFERENCES kategorier(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
