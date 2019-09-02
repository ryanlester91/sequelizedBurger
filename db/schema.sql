CREATE DATABASE IF NOT EXISTS burgers_db;
USE burgers_db;

CREATE TABLE burgers (
    id int NOT NULL AUTO_INCREMENT,
    burger_name varchar(255) NOT NULL,
    date_created TIMESTAMP NOT NULL,
    devoured BOOL DEFAULT false,
    eater_id varchar (255),
    date_eaten TIMESTAMP,
    PRIMARY KEY (id)
);