DROP TABLE IF EXISTS todoimages CASCADE;

DROP TABLE IF EXISTS todos CASCADE;

DROP TABLE IF EXISTS users CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    userid uuid DEFAULT uuid_generate_v4 (),
    username varchar(50) UNIQUE ,
    firstname varchar(50) ,
    lastname varchar(50) ,
    created timestamp ,
    pass text,
    profileurl text,
    updated timestamp ,
    cloudinary_id text,
    PRIMARY KEY (userid)
);

CREATE TABLE IF NOT EXISTS todos (
    todoid uuid DEFAULT uuid_generate_v4 (),
    userid uuid,
    title text,
    description text,
    is_archived bool,
    created timestamp NOT NULL,
    updated timestamp NOT NULL,
    PRIMARY KEY (todoid),
    CONSTRAINT fk_users FOREIGN KEY (userid) REFERENCES users (userid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS todoimages (
    imgid uuid DEFAULT uuid_generate_v4 (),
    todoid uuid,
    imgurl text,
    cloudinary_id text,
    created timestamp NOT NULL,
    updated timestamp NOT NULL,
    PRIMARY KEY (imgid),
    CONSTRAINT fk_todos FOREIGN KEY (todoid) REFERENCES todos (todoid) ON DELETE CASCADE
);