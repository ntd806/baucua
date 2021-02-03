-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 03, 2021 at 03:23 PM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_development`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversion_rates`
--

DROP TABLE IF EXISTS `conversion_rates`;
CREATE TABLE IF NOT EXISTS `conversion_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number_conversion` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `conversion_rates`
--

INSERT INTO `conversion_rates` (`id`, `number_conversion`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 100, '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 200, '2', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 300, '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 400, '4', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 500, '5', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 600, '6', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 700, '7', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 800, '8', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 900, '9', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 1000, '10', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
