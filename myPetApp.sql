

CREATE DATABASE IF NOT EXISTS myPetApp;
USE myPetApp;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
CREATE TABLE uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  imagePaths TEXT,
  videoPaths TEXT,
  breed VARCHAR(50),
  type VARCHAR(50) NOT NULL,
  color VARCHAR(50),
  gender VARCHAR(50),
  age VARCHAR(50),
  size VARCHAR(50),
  petCondition VARCHAR(100),
  lostOrFoundDate DATE,
  lostOrFoundLocation TEXT,
  latitude DECIMAL(10, 6),
  longitude DECIMAL(10, 6),
  ownerName VARCHAR(100) NOT NULL,
  reward VARCHAR(100),
  ownerPhone VARCHAR(100) NOT NULL,
  ownerEmail VARCHAR(100) NOT NULL,
  ownerMessage TEXT,
  deviceId VARCHAR(255),
  userId INT,
  status ENUM('lost', 'found', 'adoption', 'lookingForMate', 'solidarityHelp') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
