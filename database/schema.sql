-- Create the database 
CREATE DATABASE aspireit_db;
USE aspireit_db;

-- Create children table
CREATE TABLE children (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    status VARCHAR(20),  
    year INT NOT NULL
);

-- Create caregiver table
CREATE TABLE caregiver (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL 
);

-- Create attendance table
CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL, 
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE  
);

-- Create financial table
CREATE TABLE financial (
    id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL,  
    description VARCHAR(255),
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE  
);

-- Create enrollment table
CREATE TABLE enrollment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    date DATETIME NOT NULL,  
    program VARCHAR(50) NOT NULL,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE

-- Create caregiver_child association table
CREATE TABLE caregiver_child (
    caregiver_id INT NOT NULL,
    child_id INT NOT NULL,
    PRIMARY KEY (caregiver_id, child_id),
    FOREIGN KEY (caregiver_id) REFERENCES caregiver(id) ON DELETE CASCADE,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE
);
