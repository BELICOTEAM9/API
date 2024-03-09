CREATE DATABASE ActFinal;

USE ActFinal;

DROP TABLE IF EXISTS `USER`;
CREATE TABLE `ActFinal`.`USER` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `email` VARCHAR(40) NOT NULL UNIQUE,
  PRIMARY KEY (`id`));

  INSERT INTO user VALUES
(1, "Erick", "Erick@hotmail.com");

SELECT * FROM user

SELECT * FROM user WHERE id = 1;

DELETE FROM user WHERE id = 2;