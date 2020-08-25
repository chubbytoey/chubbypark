CREATE DATABASE IF NOT EXISTS `chubbyparkDB`;

USE 'chubbyparkDB';

DROP TABLE IF EXISTS `Account`;
DROP TABLE IF EXISTS `Locations`;
DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Accounts`(
    `account_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(8) NOT NULL,
    `status`   VARCHAR(10) NOT NULL,
    

    PRIMARY KEY(`account_id`)

) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `Locations`(
    `loaction_id` INT NOT NULL AUTO_INCREMENT,
    `location_name` VARCHAR(100) NOT NULL,
    `price_rate` DECIMAL NOT NULL,
    `category_Id` INT NOT NULL,

    PRIMARY KEY(`location_id`)

) ENGINE = InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `Categories`(
    `category_id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(20) NOT NULL,
    `free_hour` SMALLINT(2) NOT NULL,

    PRIMARY KEY(`category_id`)

) ENGINE = InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `Users`(
    `account_id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `user_rate` SMALLINT(1) NOT NULL,
    `previllage` VARCHAR(20) NOT NULL,
    `reservation` INT NOT NULL,
    `cancle` INT NOT NULL,
    `email` VARCHAR(200) NOT NULL UNIQUE,
    `fistname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(10),
    `age` SMALLINT(3) NOT NULL,

    PRIMARY KEY(`user_id`),
    CONSTRAINT `accounts_ibfk_1` FOREIGN KEY(`account_id`) REFERENCES `Accounts`.`account_id`

) ENGINE = InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `ParkingLots`(
    `code_lot` VARCHAR(10) NOT NULL UNIQUE,
    `lot_status` VARCHAR(12) NOT NULL,
    `checkin` TIME ,
    `checkout` TIME ,
    `hour` SMALLINT(2);
    `price` DECIMAL NOT NULL,
    `user_id` INT NOT NULL ,
    `category_id` INT NOT NULL ,
    `loaction_id` INT NOT NULL ,

    PRIMARY KEY(`code_lot`),
    CONSTRAINT `users_ibfk_1` FOREIGN KEY(`user_id`) REFERENCES `Users`.`user_id`,
    CONSTRAINT `categories_ibfk_2` FOREIGN KEY(`category_id`) REFERENCES `Categories`.`category_id`,
    CONSTRAINT `locations_ibfk_1` FOREIGN KEY(`location_id`) REFERENCES `Locations`.`location_id`

) ENGINE = InnoDB DEFAULT CHARSET utf8mb4;










