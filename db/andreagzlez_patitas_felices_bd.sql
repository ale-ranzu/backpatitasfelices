-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-andreagzlez.alwaysdata.net
-- Generation Time: Jul 12, 2024 at 07:22 PM
-- Server version: 10.6.17-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `andreagzlez_patitas_felices_bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `adopciones`
--

CREATE TABLE `adopciones` (
  `id_perrito` int(10) UNSIGNED NOT NULL,
  `id_adoptante` int(10) UNSIGNED NOT NULL,
  `fecha_adopcion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `adoptantes`
--

CREATE TABLE `adoptantes` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre_apellido` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `vivienda` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Esta tabla contiene los postulantes/adoptantes que se registran desde la página web';

-- --------------------------------------------------------

--
-- Table structure for table `adoptantes_perritos`
--

CREATE TABLE `adoptantes_perritos` (
  `id_postulacion` int(10) UNSIGNED NOT NULL,
  `id_perrito` int(10) UNSIGNED NOT NULL,
  `id_adoptante` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Esta tabla contiene información sobre postulaciones';

-- --------------------------------------------------------

--
-- Table structure for table `historialdonaciones`
--

CREATE TABLE `historialdonaciones` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `fechaDonacion` datetime NOT NULL DEFAULT current_timestamp(),
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
(8, 'gaby pprobando', 'gabyttox@gmail.com', '2024-07-03 00:00:00', 1500),
(9, 'gabriel', 'gabyttox@gmail.com', '2024-07-03 00:00:00', 500000),
(10, 'pedro', 'petergrox@gmail.com', '2024-07-04 00:00:00', 5000);

-- --------------------------------------------------------

--
-- Table structure for table `perritos`
--

CREATE TABLE `perritos` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `genero` varchar(10) NOT NULL,
  `edad` varchar(50) NOT NULL,
  `condicion_medica` varchar(255) NOT NULL,
  `tamano` varchar(20) NOT NULL,
  `estado_adopcion` char(50) NOT NULL,
  `url_img` varchar(255) NOT NULL,
  `fecha_ingreso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='esta tabla contiene perritos adoptados y no adoptados';

--
-- Dumping data for table `perritos`
--

INSERT INTO `perritos` (`id`, `nombre`, `genero`, `edad`, `condicion_medica`, `tamano`, `estado_adopcion`, `url_img`, `fecha_ingreso`) VALUES
(9, 'cuqui', 'macho', '10 años', 'vacunado', 'pequeño', 'libre', '/img_perritos/1720766891986.jpg', '2024-06-12');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido` varchar(80) NOT NULL,
  `email` varchar(200) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `password` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `rol`, `password`) VALUES
(2, 'Andrea', 'Gonzalez', 'andrea@gmail.com', 'admin', '$2a$08$/Vue8UjMugQW7LuI0ME7Iu7omdyy/iUiKgBku2bCxiQPZ9sbKG.m6'),
(3, 'Probando', 'probando', 'probando@gmail.com', 'admin', '$2a$08$B0DVyw43Ihz2vljqUjP9.e/rvP57LmPHwc4zarECddI3bU4iNeDTS');

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
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adoptantes`
--
ALTER TABLE `adoptantes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `adoptantes_perritos`
--
ALTER TABLE `adoptantes_perritos`
  MODIFY `id_postulacion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `historialdonaciones`
--
ALTER TABLE `historialdonaciones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `perritos`
--
ALTER TABLE `perritos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
