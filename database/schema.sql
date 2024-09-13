-- Create the database
CREATE DATABASE aspireit_db;
USE aspireit_db;

-- Create tables
CREATE TABLE children (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT NOT NULL
);

CREATE TABLE caregiver (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
    VARCHAR(20) NOT NULL DEFAULT 'registered'
);

CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20),
    FOREIGN KEY (child_id) REFERENCES children(id)
);



CREATE TABLE financial (
    id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (child_id) REFERENCES children(id)
);

CREATE TABLE enrollment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    date DATE NOT NULL,
    program VARCHAR(50) NOT NULL,
    FOREIGN KEY (child_id) REFERENCES children(id)
);