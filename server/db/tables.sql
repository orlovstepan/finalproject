DROP TABLE IF EXISTS invited;
DROP TABLE IF EXISTS flats;
DROP TABLE IF EXISTS users;



CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR,
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE flats(
    id SERIAL PRIMARY KEY,
    renter INT REFERENCES users(id) NOT NULL,
    headline VARCHAR,
    description VARCHAR NOT NULL,
    starting DATE,
    till DATE,
    image_1 VARCHAR NOT NULL,
    image_2 VARCHAR,
    image_3 VARCHAR,
    image_4 VARCHAR,
    image_5 VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE invited(
    id SERIAL PRIMARY KEY,
    inviter INT REFERENCES users(id) NOT NULL,
    email VARCHAR(255) NOT NULL
);