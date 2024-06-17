-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 17, 2024 at 09:52 PM
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
-- Table structure for table `perritos`
--

CREATE TABLE `perritos` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `genero` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `edad` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `condicion_medica` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tamaño` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `estado_adopcion` tinyint(1) NOT NULL,
  `url_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha_ingreso` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='esta tabla contiene perritos adoptados y no adoptados';

--
-- Dumping data for table `perritos`
--

INSERT INTO `perritos` (`id`, `nombre`, `genero`, `edad`, `condicion_medica`, `tamaño`, `estado_adopcion`, `url_img`, `fecha_ingreso`) VALUES
(1, 'Firulais', 'macho', '5 meses', 'desparacitado', 'mediano', 0, '', '2024-06-14 19:57:47'),
(2, 'Cuqui', 'macho', '5 meses', 'desparacitado', 'mediano', 0, NULL, '2024-06-14 20:58:00'),
(3, 'Uma', 'hembra', '10 años', 'vacunada', 'pequeño', 0, NULL, '2024-06-14 21:00:56'),
(4, 'Uma', 'hembra', '10 años', 'vacunada', 'pequeño', 0, NULL, '2024-06-14 21:02:49'),
(5, 'Luz', 'hembra', '7 años', 'vacunada', 'pequeño', 0, NULL, '2024-06-14 21:03:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `perritos`
--
ALTER TABLE `perritos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `perritos`
--
ALTER TABLE `perritos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
