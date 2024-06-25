-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 24, 2024 at 11:45 PM
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
-- Table structure for table `adoptantes`
--

CREATE TABLE `adoptantes` (
  `id` int UNSIGNED NOT NULL,
  `nombre_apellido` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vivienda` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ID_perrito` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Esta tabla contiene los postulantes/adoptantes que se registran desde la página web';

--
-- Dumping data for table `adoptantes`
--

INSERT INTO `adoptantes` (`id`, `nombre_apellido`, `telefono`, `email`, `dni`, `vivienda`, `ID_perrito`) VALUES
(3, 'Angelina Jolie', '22147854569', 'angelina@email.com', '37.014.025', 'casa', 3),
(6, 'Mirtha Legrand', '45678912', 'mirtha@email.com', '1.589.364', 'casa', 3);

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
  `estado_adopcion` char(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pendiente',
  `url_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_ingreso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='esta tabla contiene perritos adoptados y no adoptados';

--
-- Dumping data for table `perritos`
--

INSERT INTO `perritos` (`id`, `nombre`, `genero`, `edad`, `condicion_medica`, `tamaño`, `estado_adopcion`, `url_img`, `fecha_ingreso`) VALUES
(3, 'Luz', 'hembra', '7', 'vacunada, desparacitada', 'pequeño', 'pendiente', '\\img_perritos\\1719005120786.jpg', '2024-05-21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adoptantes`
--
ALTER TABLE `adoptantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_perrito` (`ID_perrito`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adoptantes`
--
ALTER TABLE `adoptantes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adoptantes`
--
ALTER TABLE `adoptantes`
  ADD CONSTRAINT `adoptantes_ibfk_1` FOREIGN KEY (`ID_perrito`) REFERENCES `perritos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
