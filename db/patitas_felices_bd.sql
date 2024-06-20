-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 20, 2024 at 02:15 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `patitas_felices_bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `historialdonaciones`
--

CREATE TABLE `historialdonaciones` (
  `ID` int NOT NULL,
  `nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `fechaDonación` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `montoDonacion` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historialdonaciones`
--

INSERT INTO `historialdonaciones` (`ID`, `nombre`, `email`, `fechaDonación`, `montoDonacion`) VALUES
(1, 'Juan Perez', 'gabyttox@gmail.com', '2024-06-16 23:59:44', 500),
(2, 'María Diaz', '', '2024-06-17 00:36:25', 1000),
(3, 'Hector Rodriguez', '', '2024-06-17 00:38:51', 850.5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `historialdonaciones`
--
ALTER TABLE `historialdonaciones`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `historialdonaciones`
--
ALTER TABLE `historialdonaciones`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
