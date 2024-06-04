-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2024 at 07:51 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iphone_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `iphone`
--

CREATE TABLE `iphone` (
  `deviceID` int(11) NOT NULL,
  `device` varchar(30) NOT NULL,
  `harga` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `iphone`
--

INSERT INTO `iphone` (`deviceID`, `device`, `harga`) VALUES
(1, 'iPhone 15', 16999000),
(2, 'iPhone 15 Plus', 18999000),
(3, 'iPhone 15 Pro', 21999000),
(4, 'iPhone 15 Pro Max', 22999000),
(5, 'iPhone 14', 12249000),
(6, 'iPhone 14 Plus', 12499000),
(7, 'iPhone 14 Pro', 14999000),
(8, 'iPhone 14 Pro Max', 15999000),
(9, 'iPhone 13', 12749000),
(10, 'iPhone 12', 8749000),
(11, 'iPhone SE 3rd Gen', 4999000),
(12, 'iPhone 11', 6249000);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplierID` int(11) NOT NULL,
  `supplier` varchar(30) NOT NULL,
  `info` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplierID`, `supplier`, `info`) VALUES
(1, 'iBox', 'https://ibox.co.id/'),
(2, 'Digimap', 'https://www.digimap.co.id/'),
(3, 'Erafone', 'https://eraspace.com/'),
(4, 'Global Danapati Niaga', 'https://ibgadgetstore.id/'),
(5, 'Medibyx', 'https://www.medibyx.com/');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `iphone`
--
ALTER TABLE `iphone`
  ADD PRIMARY KEY (`deviceID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplierID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `iphone`
--
ALTER TABLE `iphone`
  MODIFY `deviceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplierID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
