-- DROP DATABASE IF EXISTS sql_from_our_apps;
-- CREATE DATABASE sql_from_our_apps;

DROP TABLE IF EXISTS movie_villains;

CREATE TABLE movie_villains(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    movie VARCHAR(50)
);