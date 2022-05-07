BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "weaponType" (
	"type"	TEXT NOT NULL UNIQUE,
	"seq"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("seq" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "regionType" (
	"type"	TEXT NOT NULL UNIQUE,
	"seq"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("seq" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "elementType" (
	"type"	TEXT NOT NULL UNIQUE,
	"seq"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("seq" AUTOINCREMENT)
);
INSERT INTO "weaponType" ("type","seq") VALUES ('Polearm',1),
 ('Sword',2),
 ('Bow',3),
 ('Claymore',4),
 ('Catalyst',5);
INSERT INTO "regionType" ("type","seq") VALUES ('Mondstadt',1),
 ('Liyue',2),
 ('Inazuma',3),
 ('Snezhnaya',4),
 ('None',5),
 ('Khaenri''ah',6);
INSERT INTO "elementType" ("type","seq") VALUES ('Cryo',1),
 ('Hydro',2),
 ('Electro',3),
 ('Anemo',4),
 ('Geo',5),
 ('Pyro',6),
 ('None',7);
COMMIT;
