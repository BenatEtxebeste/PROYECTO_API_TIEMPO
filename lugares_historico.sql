-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 25-01-2024 a las 12:27:38
-- Versión del servidor: 10.3.38-MariaDB-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Beñat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugares_historico`
--

CREATE TABLE `lugares_historico` (
  `nombre` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `temperatura` float NOT NULL,
  `humedad` int(3) NOT NULL,
  `id_lugar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `lugares_historico`
--
ALTER TABLE `lugares_historico`
  ADD PRIMARY KEY (`nombre`,`fecha`),
  ADD KEY `fk_id_lugar` (`id_lugar`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `lugares_historico`
--
ALTER TABLE `lugares_historico`
  ADD CONSTRAINT `fk_id_lugar` FOREIGN KEY (`id_lugar`) REFERENCES `lugares` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
