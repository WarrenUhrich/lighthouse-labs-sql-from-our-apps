DROP DATABASE IF EXISTS sql_from_our_apps;
CREATE DATABASE sql_from_our_apps;
USE DATABASE sql_from_our_apps;

DROP TABLE IF EXISTS movie_villains;

CREATE TABLE movie_villains (
  id SERIAL PRIMARY KEY,
  villain VARCHAR(50),
  movie VARCHAR(50)
);

INSERT INTO movie_villains (villain, movie)
VALUES ('Agent Smith',              'The Matrix'),
       ('Voldemort',                'Harry Potter Series'),
       ('Wicked Witch of the West', 'Wizard of Oz'),
       ('Thanos',                   'Avengers'),
       ('Doc Ock',                  'Spider-Man');
