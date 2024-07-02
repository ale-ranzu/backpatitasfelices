-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 02, 2024 at 08:22 PM
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
-- Table structure for table `adopciones`
--

CREATE TABLE `adopciones` (
  `id_perrito` int UNSIGNED NOT NULL,
  `id_adoptante` int UNSIGNED NOT NULL,
  `fecha_adopcion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adopciones`
--

INSERT INTO `adopciones` (`id_perrito`, `id_adoptante`, `fecha_adopcion`) VALUES
(1, 1, '2024-06-02'),
(2, 2, '2024-06-02');

-- --------------------------------------------------------

--
-- Table structure for table `adoptantes`
--

CREATE TABLE `adoptantes` (
  `id` int UNSIGNED NOT NULL,
  `nombre_apellido` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vivienda` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Esta tabla contiene los postulantes/adoptantes que se registran desde la página web';

--
-- Dumping data for table `adoptantes`
--

INSERT INTO `adoptantes` (`id`, `nombre_apellido`, `telefono`, `email`, `dni`, `vivienda`) VALUES
(1, 'Josefina Palmieri', '5485632558', 'josepal@email.com', '33.014.025', 'Casa'),
(2, 'Andrea G', '5485632558', 'andreag@gmail.com', '37.014.777', 'Casa');

-- --------------------------------------------------------

--
-- Table structure for table `adoptantes_perritos`
--

CREATE TABLE `adoptantes_perritos` (
  `id_postulacion` int UNSIGNED NOT NULL,
  `id_perrito` int UNSIGNED NOT NULL,
  `id_adoptante` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Esta tabla contiene información sobre postulaciones';

-- --------------------------------------------------------

--
-- Table structure for table `historialdonaciones`
--

CREATE TABLE `historialdonaciones` (
  `ID` int NOT NULL,
  `nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fechaDonacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `montoDonacion` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historialdonaciones`
--

INSERT INTO `historialdonaciones` (`ID`, `nombre`, `email`, `fechaDonacion`, `montoDonacion`) VALUES
(1, 'Juan Perez', 'juanperez01@gmail.com', '2024-06-16 23:59:44', 5000),
(2, 'María Diaz', 'mariadiaz@gmail.com', '2024-06-17 00:36:25', 10000),
(3, 'Hector Rodriguez', 'hector07@gmail.com', '2024-06-17 00:38:51', 1850),
(4, 'Daniela Carrizo', 'danicarrizo@gmail.com', '2024-06-20 16:51:23', 700),
(5, 'Florencia Roca', 'flor001@gmail.com', '2024-06-20 16:52:21', 10700),
(6, 'Susana Gimenez', 'holasusana@gmail.com', '2024-06-20 16:53:15', 500000),
(7, 'fulano dono', 'fulano@email.com', '2024-06-25 00:00:00', 5);

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
  `tamano` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `estado_adopcion` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_ingreso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='esta tabla contiene perritos adoptados y no adoptados';

--
-- Dumping data for table `perritos`
--

INSERT INTO `perritos` (`id`, `nombre`, `genero`, `edad`, `condicion_medica`, `tamano`, `estado_adopcion`, `url_img`, `fecha_ingreso`) VALUES
(1, 'cuqui', 'macho', '10 años', 'vacunado, castrado', 'mediano', 'adoptado', '\\img_perritos\\1719914236295.jpg', '2024-06-02'),
(2, 'uma', 'hembra', '10 años', 'castrada', 'pequeño', 'adoptado', '\\img_perritos\\1719914947878.jpg', '2024-06-02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adopciones`
--
ALTER TABLE `adopciones`
  ADD PRIMARY KEY (`id_perrito`),
  ADD KEY `fk_id_adoptante_adopciones` (`id_adoptante`);

--
-- Indexes for table `adoptantes`
--
ALTER TABLE `adoptantes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `adoptantes_perritos`
--
ALTER TABLE `adoptantes_perritos`
  ADD PRIMARY KEY (`id_postulacion`),
  ADD KEY `fk_id_perritos` (`id_perrito`),
  ADD KEY `fk_id_adoptante` (`id_adoptante`);

--
-- Indexes for table `historialdonaciones`
--
ALTER TABLE `historialdonaciones`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `perritos`
--
ALTER TABLE `perritos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adoptantes`
--
ALTER TABLE `adoptantes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `adoptantes_perritos`
--
ALTER TABLE `adoptantes_perritos`
  MODIFY `id_postulacion` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `historialdonaciones`
--
ALTER TABLE `historialdonaciones`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `perritos`
--
ALTER TABLE `perritos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adopciones`
--
ALTER TABLE `adopciones`
  ADD CONSTRAINT `fk_id_adoptante_adopciones` FOREIGN KEY (`id_adoptante`) REFERENCES `adoptantes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_id_perrito_adopciones` FOREIGN KEY (`id_perrito`) REFERENCES `perritos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `adoptantes_perritos`
--
ALTER TABLE `adoptantes_perritos`
  ADD CONSTRAINT `fk_id_adoptante` FOREIGN KEY (`id_adoptante`) REFERENCES `adoptantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_perritos` FOREIGN KEY (`id_perrito`) REFERENCES `perritos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
