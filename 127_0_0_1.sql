-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2022 at 08:47 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clients_diclick`
--
CREATE DATABASE IF NOT EXISTS `clients_diclick` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `clients_diclick`;

-- --------------------------------------------------------

--
-- Table structure for table `admin_departments`
--

CREATE TABLE `admin_departments` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `nume` varchar(255) NOT NULL,
  `tip` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_departments`
--

INSERT INTO `admin_departments` (`id`, `unicId`, `nume`, `tip`) VALUES
(1, '39754', 'Sales', 1),
(7, '20800', 'Client service', 2),
(8, '96298', 'Performance', 3);

-- --------------------------------------------------------

--
-- Table structure for table `admin_notifications`
--

CREATE TABLE `admin_notifications` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `text` text NOT NULL,
  `client` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_notifications`
--

INSERT INTO `admin_notifications` (`id`, `date`, `text`, `client`, `status`) VALUES
(13, '2022-03-18 14:45:19', 'Media plan schedule from 2022-03-02 - 16:50:00 is aproved!', 'test - test', 0),
(14, '2022-03-18 15:04:57', 'All media plan schedules are aproved!', 'test - test', 0),
(15, '2022-03-18 15:10:21', 'New schedule added on - 2022-03-04', 'test - test', 0),
(16, '2022-03-18 15:20:35', 'Media plan schedule from 2022-03-02 - 16:50:00 is disaproved!<br>', 'test - test', 0),
(17, '2022-03-18 15:20:45', 'Media plan schedule from 2022-03-02 - 16:50:00 is disaproved!<br>', 'test - test', 0),
(18, '2022-03-18 15:21:11', 'Media plan schedule from 2022-03-02 - 16:50:00 is disaproved!<br>', 'test - test', 0),
(19, '2022-03-18 15:34:03', 'Media plan schedule from 2022-03-02 - 16:50:00 is aproved!', 'test - test', 0),
(20, '2022-03-18 15:34:12', 'Media plan schedule from 2022-03-04 - 00:00:00 is aproved!', 'test - test', 0),
(21, '2022-03-18 15:34:16', 'Media plan schedule from 2022-03-03 - 15:50:00 is disaproved!<br>', 'test - test', 0),
(22, '2022-03-18 15:37:57', 'All media plan schedules are aproved!', 'test - test', 0);

-- --------------------------------------------------------

--
-- Table structure for table `admin_roles`
--

CREATE TABLE `admin_roles` (
  `id` int(11) NOT NULL,
  `roleId` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `permissions` text NOT NULL,
  `superuser` int(5) NOT NULL,
  `users` text NOT NULL,
  `departament` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_roles`
--

INSERT INTO `admin_roles` (`id`, `roleId`, `role`, `permissions`, `superuser`, `users`, `departament`) VALUES
(1, 'role-owner', 'Owner', '[\"add role\",\"edit role\",\"delete role\",\"add admin account\",\"edit admin account\",\"add admin role\",\"delete admin account\",\"add client account\",\"edit client account\",\"delete client account\",\"view media plan\",\"add media plan\",\"edit media plan\",\"delete media plan\",\"write comments media plan\",\"remove comments media plan\",\"crm view all clients\",\"crm view client file\",\"crm view all data client file\",\"crm edit client file\",\"crm view proforms\",\"crm generate proforms\",\"crm send proforms\",\"crm view invoices\",\"crm generate invoices\",\"crm send invoices\"]', 1, 'owner', ''),
(3, 'role621640667402a', 'Sales', '[\"edit role\",\"view media plan\",\"crm view all clients\",\"crm view client file\"]', 0, '', '39754'),
(12, 'role622613021af28', 'Client service', '[\"crm view all clients\",\"crm view client file\",\"crm view all data client file\",\"crm edit client file\"]', 0, '', '20800'),
(13, 'role6226130a464af', 'Performance', '[\"crm view all clients\",\"crm view client file\",\"crm view all data client file\",\"crm edit client file\",\"crm view proforms\"]', 0, '', '96298');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_check`
--

CREATE TABLE `invoice_check` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `code` text NOT NULL,
  `security_code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice_check`
--

INSERT INTO `invoice_check` (`id`, `userId`, `code`, `security_code`) VALUES
(1, 'Owner', '$2y$10$OkmKnTT0FDMkFcWv5d/wwOKz0DXMFAj6Umlm1bpcikoiMHI53xQ6S', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefon` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `function` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `clientAt` varchar(255) NOT NULL,
  `language` int(11) NOT NULL,
  `image` text NOT NULL,
  `gds` text NOT NULL,
  `fbds` text NOT NULL,
  `last_log_in` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `permissions_roles` text NOT NULL,
  `client_service_admin` varchar(255) NOT NULL,
  `sales_admin` varchar(255) NOT NULL,
  `performance_admin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `telefon`, `password`, `company`, `function`, `role`, `unicId`, `clientAt`, `language`, `image`, `gds`, `fbds`, `last_log_in`, `create_date`, `permissions_roles`, `client_service_admin`, `sales_admin`, `performance_admin`) VALUES
(1, 'Owner', 'Owner', 'hello@diagency.eu', '+40123456789', '$2y$10$aD3Ac2g/tWrEY.cD/HpgouwAMY0wmfel1guXexI..0hMKgJeZsjFK', '', 'Platform Administrator', 'Owner', 'Owner', '', 0, '', '', '', NULL, NULL, 'role-owner', '', '', ''),
(2, 'test', 'test', 'test@test.test', '0123456789', '$2y$10$ea6a32Fxt0hz445cJJ687OTRf/i.pojoqiWjxvXNewhosIYmwe0AO', 'test', 'test', 'client', 'client61f7f5d319d4b', 'diclick', 0, 'client61f7f5d319d4b_image.jpg', '', '', NULL, '2022-01-31 00:00:00', '', '', '', ''),
(12, 'TestCRM Edit', 'testcrm', '', '0123456789123', '$2y$10$9rR23D4ref/CVjTnHAxxTeBnDdoNUsWEjuR/6As6FRP7cv1Su7Bym', 'Atat se poate SRL edit', 'TestCRM', 'client', 'client6202495c74c10', 'diclick', 1, '../../../clients-resources/client6202495c74c10/logo.png', '', '', NULL, '2022-02-08 00:00:00', '', 'admin6217661e65b83', 'admin620627d7e36c5', 'admin620627ea1a793'),
(13, 'Raluca Clauda', 'raluca', 'raluca@diagency.eu', '+40721728293', '$2y$10$moY5iAGc05QY8keqMGZcf.iA7vMOUZGjGVj.qiVQUUfWFfmAt/tDa', '', 'NEW BUSINESS DEVELOPMENT MANAGER', 'admin', 'admin620627d7e36c5', '', 0, '', '', '', NULL, NULL, 'role621640667402a', '', '', ''),
(14, 'Teo', 'teo', '', '', '$2y$10$zwTx.Tdc6YSYbfHarj0OGO6LJC0JrOlmKzeA7.6..kZldB5iwWFta', '', '', 'admin', 'admin620627ea1a793', '', 0, '', '', '', NULL, NULL, 'role6226130a464af', '', '', ''),
(15, 'testRaluca', 'testRaluca', 'testRaluca@test.test', '0123456789', '$2y$10$CsJOxImnQtWezNEUPIlsLeeuJ/K2llF2KOkZ/w6lLeu/HLnlQzo7u', 'testRaluca srl', '', 'client', 'client620a520a7c756', 'diclick', 1, '', '', '', NULL, '2022-02-14 00:00:00', '', '', '', ''),
(16, 'testRaluca', 'testRaluca1', 'testRaluca@test.test', '0123456789', '$2y$10$nncyoD/Gbi7gaGqnAU0MmOQ3i5Q49rsvPjF6KQk1Q1D2MaRYG7Ss.', 'testRaluca', '', 'client', 'client620a52c23486d', 'diclick', 1, '', '', '', NULL, '2022-02-14 00:00:00', '', '', '', ''),
(17, 'testRaluca', 'testRaluca12', 'testRaluca@test.test', '0123456789', '$2y$10$/.kf2F/LqE9unw0ybw5u/.FoaOSB5SMbYadc/fTST4gladV6dtkcy', 'testRaluca', '', 'client', 'client620a52ded2861', 'diclick', 1, '', '', '', NULL, '2022-02-14 00:00:00', '', '', '', ''),
(18, 'test3', 'test3', 'test3@TEST.test', '0123456789', '$2y$10$otpOzdcOTnatV2phDXX8HepmuqxSYFiD1xObxZZc/x36Szp1xarJC', 'test3', '', 'client', 'client620a5b2486c61', 'diclick', 1, '', '', '', NULL, '2022-02-14 00:00:00', '', '', '', ''),
(19, 'ximivogue', 'ximivogue.ro', 'Managing.partner@promo-sapiens.ro', '0732857160', '$2y$10$iRQRnHX0SDCqzAuwZb7V/OS6omlMxvdi9Qn3RFQeG4GKo5PuvC.Ve', 'Promosapiens SRL', '', 'client', 'client621497983c326', 'diclick', 1, '', '', '', NULL, '2022-02-22 00:00:00', '', '', '', ''),
(23, 'sdfasfsaf', 'asdfasdfsaf', '', '', '$2y$10$smVVRe4b80DKsWWN2yhchu2CP4sRhNjd8oSKV0tjPeX65WP76c8Fq', '', '', 'admin', 'admin6217661e65b83', '', 0, '', '', '', NULL, NULL, 'role622613021af28', '', '', ''),
(24, 'asdgasgsagdg', 'sdasfsadfasfsdf', '', '', '$2y$10$bTBvVk72fa/jivR.RpxfzeZgnM4XQxIXj0Cw9MXgcV91D.cMaqJYW', '', '', 'admin', 'admin621766385cf57', '', 0, '', '', '', NULL, NULL, 'role621640667402a', '', '', ''),
(25, 'testadminsupersmek', 'testadminsmke', '', '', '$2y$10$Mxd5Gvac9uV6N/nv.Wz/p.Vsa3hfTTe5bdsmHSd9hNmXo2fxBTl3G', '', '', 'admin', 'admin621771765b2ea', '', 0, '', '', '', NULL, NULL, 'role621640667402a', '', '', ''),
(26, 'Test gen dir', 'safsaasdfsaf', 'test123@testtest.test', '0123456789', '$2y$10$CXuWCmTq2VvbiRrW2lR9FuKn0yD3c21.4ihIdxUpKuyUxWVv/TQfC', 'Test gen dir', '', 'client', 'client621898eb76fbb', 'diclick', 1, '', '', '', NULL, '2022-02-25 00:00:00', '', '', '', ''),
(27, 'test-de-seara', 'test-de-seara', 'testestse@teste.com', '0123412341234', '$2y$10$sFqlB35CeIDyss.v.Ju8xuRTRxIk/BbhuY2kX1VSdf9qM257LNa5y', 'srl', '', 'client', 'client622663319f7df', 'diclick', 1, '', '', '', NULL, '2022-03-07 00:00:00', '', 'admin6217661e65b83', 'admin620627d7e36c5', 'admin620627ea1a793'),
(28, 'Test de seara 2', 'test-deseara2', 'bucel.ionsebastian@gmail.com', '0123456789', '$2y$10$atMQPZ3WeI06ClSKdm7/W.TqcxEHhjhQVwo7eI6GJ7rokaZFcrBze', 'Test2-comp', '', 'client', 'client622664aaba4fd', 'diagency', 2, '', '', '', NULL, '2022-03-07 00:00:00', '', 'admin6217661e65b83', 'admin620627d7e36c5', 'admin620627ea1a793'),
(29, 'testdeseara3', 'asfasfdasdf', 'bucel.ionsebastian@gmail.com', '+40123456789', '$2y$10$ZsE2FY1qnZZQgZJe1OOSluR34Ua3jGC5Zzd58V37C43IuqxOtIGb.', 'Test2-comp', '', 'client', 'client6226684249a7d', 'diclick', 1, '../../../clients-resources/client6226684249a7d/logo.png', '', '', NULL, '2022-03-07 00:00:00', '', 'admin6217661e65b83', 'admin620627d7e36c5', 'admin620627ea1a793');

-- --------------------------------------------------------

--
-- Table structure for table `user_notifications`
--

CREATE TABLE `user_notifications` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `project` varchar(255) NOT NULL,
  `task` varchar(255) NOT NULL,
  `social_platform` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_departments`
--
ALTER TABLE `admin_departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_notifications`
--
ALTER TABLE `admin_notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_roles`
--
ALTER TABLE `admin_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_check`
--
ALTER TABLE `invoice_check`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_departments`
--
ALTER TABLE `admin_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `admin_notifications`
--
ALTER TABLE `admin_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `admin_roles`
--
ALTER TABLE `admin_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `invoice_check`
--
ALTER TABLE `invoice_check`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `user_notifications`
--
ALTER TABLE `user_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Database: `clients_diclick_crm`
--
CREATE DATABASE IF NOT EXISTS `clients_diclick_crm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `clients_diclick_crm`;

-- --------------------------------------------------------

--
-- Table structure for table `buget`
--

CREATE TABLE `buget` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `tip` int(5) NOT NULL,
  `retea` text NOT NULL,
  `buget_total` varchar(255) NOT NULL,
  `buget_pe_zi` varchar(255) NOT NULL,
  `perioada_start` date NOT NULL,
  `perioada_sfarsit` date NOT NULL,
  `comentarii` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a5b2486c61`
--

CREATE TABLE `client620a5b2486c61` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a52c23486d`
--

CREATE TABLE `client620a52c23486d` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a52ded2861`
--

CREATE TABLE `client620a52ded2861` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a520a7c756`
--

CREATE TABLE `client620a520a7c756` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client62175a1d69c7a`
--

CREATE TABLE `client62175a1d69c7a` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client621759c00ddfa`
--

CREATE TABLE `client621759c00ddfa` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client621898eb76fbb`
--

CREATE TABLE `client621898eb76fbb` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client622664aaba4fd`
--

CREATE TABLE `client622664aaba4fd` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client6202495c74c10`
--

CREATE TABLE `client6202495c74c10` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client6202495c74c10`
--

INSERT INTO `client6202495c74c10` (`id`, `data`, `timp`, `actiune`, `concluzie`, `observatii_concluzie`, `documente_atasate`, `todo`, `status`, `autor`) VALUES
(1, '2022-02-11', '09:02:36', 'test', '1', 'test', '', '', 0, ''),
(2, '2022-02-11', '09:01:36', 'test', '1', 'test', '', '', 0, ''),
(3, '2022-01-11', '09:01:36', 'test', '1', 'test', '', '', 0, ''),
(4, '2022-03-11', '09:01:36', 'test', '1', 'test', '', '', 0, ''),
(5, '2022-02-11', '09:21:13', 'Test 2', '2', 'Test 2', '', '', 0, ''),
(6, '2022-02-11', '09:21:25', 'Test 3 ', '2', 'test 3 ', '', '', 0, ''),
(7, '2022-02-11', '09:22:06', 'Test 4', '1', 'test 4', '', '', 0, ''),
(8, '2022-02-11', '09:30:42', 'Test actiune viitoare', '2', 'test ', '', '', 0, ''),
(11, '2022-02-14', '10:45:25', '', '1', 'test', '', '', 0, 'admin620627d7e36c5'),
(12, '2022-02-14', '12:03:01', '', '2', 'nu a raspuns la telefon :(', '', '', 0, 'admin620627d7e36c5'),
(13, '2022-02-14', '12:07:05', '', '2', '', '', '', 0, 'admin620627d7e36c5'),
(14, '2022-02-14', '12:55:08', '', '2', '', '', '', 0, 'admin620627d7e36c5'),
(15, '2022-02-14', '13:10:27', '', '2', 'Observatie', '', '', 0, 'admin620627d7e36c5'),
(16, '2022-02-14', '13:32:09', '', 'A raspuns la telefon', 'test', '', '', 0, 'admin620627d7e36c5'),
(17, '2022-02-14', '13:41:49', '5', 'A raspuns la telefon', 'test', '', '', 0, 'admin620627d7e36c5'),
(18, '2022-02-14', '14:44:51', 'am sunat', '2', 'e bulangiu', '', '', 0, 'admin620627d7e36c5');

-- --------------------------------------------------------

--
-- Table structure for table `client6217594f163f8`
--

CREATE TABLE `client6217594f163f8` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client621497983c326`
--

CREATE TABLE `client621497983c326` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client622663319f7df`
--

CREATE TABLE `client622663319f7df` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client6226684249a7d`
--

CREATE TABLE `client6226684249a7d` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `timp` time NOT NULL,
  `actiune` text NOT NULL,
  `concluzie` text NOT NULL,
  `observatii_concluzie` text NOT NULL,
  `documente_atasate` text NOT NULL,
  `todo` text NOT NULL,
  `status` int(5) NOT NULL,
  `autor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client6226684249a7d`
--

INSERT INTO `client6226684249a7d` (`id`, `data`, `timp`, `actiune`, `concluzie`, `observatii_concluzie`, `documente_atasate`, `todo`, `status`, `autor`) VALUES
(1, '2022-03-11', '17:11:05', 'test', '2', 'test', '', '', 0, 'Owner');

-- --------------------------------------------------------

--
-- Table structure for table `client_pers`
--

CREATE TABLE `client_pers` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `nume` varchar(255) NOT NULL,
  `prenume` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefon` varchar(255) NOT NULL,
  `este_decident` int(5) NOT NULL,
  `functie` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_pers`
--

INSERT INTO `client_pers` (`id`, `unicId`, `nume`, `prenume`, `email`, `telefon`, `este_decident`, `functie`) VALUES
(1, 'client6202495c74c10', 'pers ', '1', 'test@test.test', '0123456789', 0, 'nou'),
(5, 'client6202495c74c10', 'pers', '2', 'test@test.test', '0123456789', 0, 'vechi'),
(6, 'client621497983c326', 'Mak ', 'Hadded', 'Managing.partner@promo-sapiens.ro', '0732857160', 0, 'Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `email_adresses`
--

CREATE TABLE `email_adresses` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `adresa_email` varchar(255) NOT NULL,
  `billing_email` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `email_adresses`
--

INSERT INTO `email_adresses` (`id`, `unicId`, `adresa_email`, `billing_email`) VALUES
(1, 'client6202495c74c10', 'TestCRM@test.test', 0),
(8, 'client6202495c74c10', 'nou@test.test', 1),
(9, 'client620a520a7c756', 'testRaluca@test.test', 0),
(10, 'client620a52c23486d', 'testRaluca@test.test', 0),
(11, 'client620a52ded2861', 'testRaluca@test.test', 0),
(12, 'client620a5b2486c61', 'test3@TEST.test', 0),
(13, 'client621497983c326', 'sebastian@diagency.eu', 1),
(15, 'client621497983c326', 'seby.sebastian@gmail.com', 1),
(16, 'client621497983c326', 'test2@test.test', 0),
(17, 'client621497983c326', 'bucel.ionsebastian@gmail.com', 1),
(18, 'client6217594f163f8', 'satda@trsate.tes', 0),
(19, 'client621759c00ddfa', 'asdf!@dsfasdf.com', 0),
(20, 'client62175a1d69c7a', 'qwerq1@TEST.TES', 0),
(21, 'client621898eb76fbb', 'test123@testtest.test', 0),
(23, 'client6202495c74c10', 'test2@test.test', 1),
(24, 'client622663319f7df', 'testestse@teste.com', 0),
(25, 'client622664aaba4fd', 'bucel.ionsebastian@gmail.com', 0),
(26, 'client6226684249a7d', 'bucel.ionsebastian@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `fisa_client`
--

CREATE TABLE `fisa_client` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `nume_client` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `firma` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `cod_fiscal` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `nr_reg_comert` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `adresa_facturare` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `nr_tel` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `logo` int(5) NOT NULL,
  `status` int(5) NOT NULL,
  `categorie` varchar(5) CHARACTER SET utf8mb4 NOT NULL,
  `sursa` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `admin` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `oras_facturare` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `judet_facturare` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `tara_facturare` varchar(255) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fisa_client`
--

INSERT INTO `fisa_client` (`id`, `unicId`, `nume_client`, `firma`, `cod_fiscal`, `nr_reg_comert`, `adresa_facturare`, `nr_tel`, `logo`, `status`, `categorie`, `sursa`, `admin`, `oras_facturare`, `judet_facturare`, `tara_facturare`) VALUES
(10, 'client6202495c74c10', 'TestCRM Edit', 'Atat se poate SRL edit', 'RO 12355745 edit', 'j12/1234/12345 edit', 'str. de acolo nr 123 edit', '0123456789123', 1, 1, 'A', '', 'admin620627d7e36c5', 'Constanta edit', 'Constanta edit', 'Romania edit'),
(16, 'client620a520a7c756', 'testRaluca', 'testRaluca srl', 'testRaluca', 'testRaluca', 'testRaluca', '0123456789', 0, 0, '0', 'testRaluca', '', 'testRaluca', '', 'testRaluca'),
(17, 'client620a52c23486d', 'testRaluca', 'testRaluca', 'testRaluca', 'testRaluca', 'testRaluca', '0123456789', 0, 0, '0', 'testRaluca', '', 'testRaluca', '', 'testRaluca'),
(18, 'client620a52ded2861', 'testRaluca', 'testRaluca', 'testRaluca', 'testRaluca', 'testRaluca', '0123456789', 0, 0, '0', 'testRaluca', '', 'testRaluca', 'testRaluca', 'testRaluca'),
(19, 'client620a5b2486c61', 'test3', 'test3', 'test3', 'test3', 'test3', '0123456789', 0, 0, '0', 'test3', 'admin620627d7e36c5', 'test3', 'test3', 'test3'),
(20, 'client621497983c326', 'ximivogue', 'Promosapiens SRL', 'RO 36357951', 'J02/968/2016', 'Str.Elena Ghiba Birta,nr.4,Ap.4', '0732857160', 1, 3, 'D', 'instagram', 'admin620627d7e36c5', 'Arad', 'Arad', 'Romania'),
(21, 'client6217594f163f8', 'tesatsa', 'asasdtasdt', 'sdtsat', 'asdtas', 'satsadt', '0123456789', 0, 0, '', 'asdtadt', '', 'asdtasdt', 'astasdt', 'asdtasdt'),
(22, 'client621759c00ddfa', 'asdasfasd', 'asdfasdf', 'asdfasf', 'asdfsadf', 'asdfasdf', '123412341234', 0, 0, '', 'afsdfsaf', '', 'asdfasfd', 'asdfasf', 'asdfasdf'),
(23, 'client62175a1d69c7a', 'qwrqwer', 'qwerqwrwqer', 'qwrqwerqw', 'rqwreqwer', 'qwerwqerqwr', '0123124123412', 0, 0, '', 'qwrqwrwe', '', 'wqrqwr', 'wrqwer', 'qwerqwrwq'),
(24, 'client621898eb76fbb', 'Test gen dir', 'Test gen dir', 'Test gen dir', 'Test gen dir', 'Test gen dir', '0123456789', 0, 0, '', 'Test gen dir', '', 'Test gen dir', 'Test gen dir', 'Test gen dir'),
(25, 'client622663319f7df', 'test-de-seara', 'srl', 'ro', 'J02/968/2016', 'sdfgsd', '0123412341234', 0, 0, '', 'test', '', 'sdfgsdfg', 'sdfg', 'sdfg'),
(26, 'client622664aaba4fd', 'Test de seara 2', 'Test2-comp', 'test3', 'J02/968/2016', 'satsadt', '0123456789', 0, 0, 'D', 'testRaluca', '', 'Arad', 'Arad', 'Romania'),
(27, 'client6226684249a7d', 'testdeseara3', 'Test2-comp', 'testRaluca', 'J02/968/2016', 'testRaluca', '+40123456789', 1, 0, 'B', 'testRaluca', '', 'testRaluca', 'testRaluca', 'Romania');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `client` varchar(255) NOT NULL,
  `nr_reg_comert` varchar(255) NOT NULL,
  `cod_fiscal` varchar(255) NOT NULL,
  `adresa_facturare` varchar(255) NOT NULL,
  `oras_facturare` varchar(255) NOT NULL,
  `judet_facturare` varchar(255) NOT NULL,
  `tara_facturare` varchar(255) NOT NULL,
  `data_factura` date NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `vat` int(10) NOT NULL,
  `produse` text NOT NULL,
  `termen_plata` date NOT NULL,
  `emitor` int(5) NOT NULL,
  `prefix_serie_factura` varchar(255) NOT NULL,
  `total_tva` varchar(255) NOT NULL,
  `total_f_tva` varchar(255) NOT NULL,
  `total_de_plata` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `client`, `nr_reg_comert`, `cod_fiscal`, `adresa_facturare`, `oras_facturare`, `judet_facturare`, `tara_facturare`, `data_factura`, `invoice_number`, `vat`, `produse`, `termen_plata`, `emitor`, `prefix_serie_factura`, `total_tva`, `total_f_tva`, `total_de_plata`, `created_by`) VALUES
(11, 'client621497983c326', 'RO 36357951', 'J02/968/2016', 'Str.Elena Ghiba Birta,nr.4,Ap.4', 'Arad', 'Arad', 'Romania', '2022-03-02', '0001', 19, '[{\"nume\":\"Pachet START-UP perioada 11111-11-11-1111-11-11 conform Anexa nr. 1 la contractul dintre parti din data de 11111-11-11\",\"um\":\"buc\",\"cant\":\"1\",\"pret\":\"399\",\"val\":\"399\",\"tva\":\"75.81\"}]', '0000-00-00', 2, 'SMP', '75.81', '399', '474.81', 'Owner'),
(12, 'client621497983c326', 'RO 36357951', 'J02/968/2016', 'Str.Elena Ghiba Birta,nr.4,Ap.4', 'Arad', 'Arad', 'Romania', '2022-03-02', '0002', 19, '[{\"nume\":\"Pachet START-UP perioada 11111-11-11-1111-11-11 conform Anexa nr. 1 la contractul dintre parti din data de 11111-11-11\",\"um\":\"buc\",\"cant\":\"1\",\"pret\":\"399\",\"val\":\"399\",\"tva\":\"75.81\"}]', '0000-00-00', 2, 'SMP', '75.81', '399', '474.81', 'Owner'),
(13, 'client621497983c326', 'RO 36357951', 'J02/968/2016', 'Str.Elena Ghiba Birta,nr.4,Ap.4', 'Arad', 'Arad', 'Romania', '2022-03-02', '2005', 19, '[{\"nume\":\"Pachet START-UP perioada 2022-03-01-2022-03-31 conform Anexa nr. 1 la contractul dintre parti din data de 2022-02-27\",\"um\":\"buc\",\"cant\":\"1\",\"pret\":\"399\",\"val\":\"399\",\"tva\":\"75.81\"},{\"nume\":\"Produs\",\"um\":\"buc\",\"cant\":\"2\",\"pret\":\"300\",\"val\":\"600\",\"tva\":\"114\"}]', '0000-00-00', 1, 'RC', '189.81', '999', '1188.81', 'Owner'),
(14, 'client621497983c326', 'RO 36357951', 'J02/968/2016', 'Str.Elena Ghiba Birta,nr.4,Ap.4', 'Arad', 'Arad', 'Romania', '2022-03-02', '0003', 19, '[{\"nume\":\"Pachet START-UP perioada 11111-11-11-1111-11-11 conform Anexa nr. 1 la contractul dintre parti din data de 11111-11-11\",\"um\":\"buc\",\"cant\":\"1\",\"pret\":\"399\",\"val\":\"399\",\"tva\":\"75.81\"}]', '0000-00-00', 2, 'SMP', '75.81', '399', '474.81', 'Owner'),
(15, 'client621497983c326', 'RO 36357951', 'J02/968/2016', 'Str.Elena Ghiba Birta,nr.4,Ap.4', 'Arad', 'Arad', 'Romania', '2022-03-02', '0004', 19, '[{\"nume\":\"Pachet START-UP perioada 11111-11-11-1111-11-11 conform Anexa nr. 1 la contractul dintre parti din data de 11111-11-11\",\"um\":\"buc\",\"cant\":\"1\",\"pret\":\"399\",\"val\":\"399\",\"tva\":\"75.81\"}]', '0000-00-00', 2, 'SMP', '75.81', '399', '474.81', 'Owner'),
(16, 'client621497983c326', 'RO 36357951', 'J02/968/2016', 'Str.Elena Ghiba Birta,nr.4,Ap.4', 'Arad', 'Arad', 'Romania', '2022-03-02', '2006', 19, '[{\"nume\":\"Pachet START-UP perioada 2022-03-01-2022-03-31 conform Anexa nr. 1 la contractul dintre parti din data de 2022-02-27\",\"um\":\"buc\",\"cant\":\"1\",\"pret\":\"399\",\"val\":\"399\",\"tva\":\"75.81\"},{\"nume\":\"Produs\",\"um\":\"buc\",\"cant\":\"2\",\"pret\":\"300\",\"val\":\"600\",\"tva\":\"114\"}]', '0000-00-00', 1, 'RC', '189.81', '999', '1188.81', 'Owner'),
(17, 'client622664aaba4fd', 'test3', 'J02/968/2016', 'satsadt', 'Arad', 'Arad', 'Romania', '2022-03-08', '2007', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada 275760-03-12-234123-03-12 conform Anexa nr. 123141234 la contractul dintre parti din data de 41234-03-12\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"275760-03-12\",\"per2\":\"234123-03-12\",\"nr\":\"123141234\",\"data\":\"41234-03-12\"},{\"tip\":\"2\",\"nume\":\"Pachet OPTIM perioada 275760-03-12-275760-03-12 conform Anexa nr. 22134 la contractul dintre parti din data de 41234-03-12\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"1199\",\"prevalFaraTvatUnitar\":\"1199\",\"tva\":227.81,\"per1\":\"275760-03-12\",\"per2\":\"275760-03-12\",\"nr\":\"22134\",\"data\":\"41234-03-12\"},{\"tip\":\"0\",\"nume\":\"test edit 2\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"111\",\"prevalFaraTvatUnitar\":\"111\",\"tva\":\"21.09\"},{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada 41234-03-21-41234-03-12 conform Anexa nr. 5 la contractul dintre parti din data de 0412-03-12\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"100\",\"prevalFaraTvatUnitar\":\"100\",\"tva\":\"19\",\"per1\":\"41234-03-21\",\"per2\":\"41234-03-12\",\"nr\":\"5\",\"data\":\"0412-03-12\"}]', '0000-00-00', 1, 'RC', '343.71', '1809', '2152.71', 'Owner'),
(18, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-08', '2008', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada 1111-11-11-1111-11-11 conform Anexa nr. 1 la contractul dintre parti din data de 1111-11-11\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"1111-11-11\",\"per2\":\"1111-11-11\",\"nr\":\"1\",\"data\":\"1111-11-11\"}]', '0000-00-00', 1, 'RC', '75.81', '399', '474.81', 'Owner'),
(19, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-08', '2009', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada 2222-02-22-2222-02-22 conform Anexa nr. 3 la contractul dintre parti din data de 2222-02-22\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"2222-02-22\",\"per2\":\"2222-02-22\",\"nr\":\"3\",\"data\":\"2222-02-22\"},{\"tip\":\"0\",\"nume\":\"Test edit\",\"um\":\"buc\",\"cantitate\":\"3\",\"pretUnitar\":\"100\",\"prevalFaraTvatUnitar\":\"300\",\"tva\":\"57\"}]', '0000-00-00', 1, 'RC', '132.81', '699', '831.81', 'Owner'),
(20, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-09', '2010', 20, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada 2022-02-01-2022-03-12 conform Anexa nr. 1 la contractul dintre parti din data de 2022-01-01\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":\"79.8\",\"per1\":\"2022-02-01\",\"per2\":\"2022-03-12\",\"nr\":\"1\",\"data\":\"2022-01-01\"},{\"tip\":\"0\",\"nume\":\"test\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"100\",\"prevalFaraTvatUnitar\":\"100\",\"tva\":\"20\"}]', '0000-00-00', 1, 'RC', '99.80', '499', '598.8', 'Owner'),
(21, 'client6202495c74c10', 'RO 12355745', 'j12/1234/12345', 'str. de acolo nr 123', 'Constanta', 'Constanta', 'Romania', '2022-03-09', '2011', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada 123123-03-12-0123-02-13 conform Anexa nr. 123123 la contractul dintre parti din data de 0123-03-12\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"123123-03-12\",\"per2\":\"0123-02-13\",\"nr\":\"123123\",\"data\":\"0123-03-12\"}]', '0000-00-00', 1, 'RC', '75.81', '399', '474.81', 'Owner'),
(22, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-09', '2012', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada 123132-03-12-12313-03-12 conform Anexa nr. 123 la contractul dintre parti din data de 3123-03-12\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"123132-03-12\",\"per2\":\"12313-03-12\",\"nr\":\"123\",\"data\":\"3123-03-12\"}]', '0000-00-00', 1, 'RC', '75.81', '399', '474.81', 'Owner'),
(23, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-09', '0005', 19, '[{\"tip\":\"0\",\"nume\":\"sadfasdf\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"1\",\"prevalFaraTvatUnitar\":\"1\",\"tva\":\"0.19\"}]', '0000-00-00', 2, 'SMP', '0.19', '1', '1.19', 'Owner'),
(24, 'client622664aaba4fd', 'test3', 'J02/968/2016', 'satsadt', 'Arad', 'Arad', 'Romania', '2022-03-11', '0006', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada 0123-03-12-0123-03-12 conform Anexa nr. 1 la contractul dintre parti din data de 0123-03-12\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"0123-03-12\",\"per2\":\"0123-03-12\",\"nr\":\"1\",\"data\":\"0123-03-12\"}]', '0000-00-00', 2, 'SMP', '75.81', '399', '474.81', 'Owner'),
(25, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-14', '2013', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada 123123-03-12 - 0123-03-12 conform Anexa nr. 1231 la contractul dintre parti din data de 0123-03-12\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"123123-03-12\",\"per2\":\"0123-03-12\",\"nr\":\"1231\",\"data\":\"0123-03-12\"}]', '0000-00-00', 1, 'RC', '75.81', '399', '474.81', 'Owner');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_check`
--

CREATE TABLE `invoice_check` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `code` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `media_plan`
--

CREATE TABLE `media_plan` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `retea` varchar(255) NOT NULL,
  `tip_content` varchar(255) NOT NULL,
  `frecventa` varchar(255) NOT NULL,
  `perioada_start` date NOT NULL,
  `perioada_sfarsit` date NOT NULL,
  `comentarii` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `media_plan`
--

INSERT INTO `media_plan` (`id`, `unicId`, `retea`, `tip_content`, `frecventa`, `perioada_start`, `perioada_sfarsit`, `comentarii`) VALUES
(7, 'client6202495c74c10', 'facebook', 'story', '[\"luni\",\"miercuri\",\"vineri\",\"duminica\"]', '2022-03-01', '2022-04-01', 'test'),
(8, 'client6202495c74c10', 'instagram', 'postare', '[\"marti\",\"joi\",\"sambata\"]', '2022-03-01', '2022-04-01', 'gsdfg sdfgsdf'),
(9, 'client6202495c74c10', 'youtube', 'video post', '[\"luni\",\"marti\",\"miercuri\"]', '2022-03-23', '2022-04-23', '53w5'),
(10, 'client6202495c74c10', 'pinterest', 'rich pin', '[\"luni\",\"marti\",\"joi\",\"vineri\"]', '2022-03-17', '2022-04-17', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `obiective`
--

CREATE TABLE `obiective` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `tip` int(5) NOT NULL,
  `perioada_start` date NOT NULL,
  `perioada_sfarsit` date NOT NULL,
  `comentarii` text NOT NULL,
  `client_obj` text NOT NULL,
  `social_obj` text NOT NULL,
  `performance_obj` text NOT NULL,
  `dezvoltare_online_obj` text NOT NULL,
  `marketing_obj` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `obiective`
--

INSERT INTO `obiective` (`id`, `unicId`, `tip`, `perioada_start`, `perioada_sfarsit`, `comentarii`, `client_obj`, `social_obj`, `performance_obj`, `dezvoltare_online_obj`, `marketing_obj`) VALUES
(1, 'client6202495c74c10', 0, '0000-00-00', '0000-00-00', 'fa.sdf;as ,fl;dsa, ;sdafs d;f', 'test1', 'test2', 'test3', 'test6', 'test4'),
(4, 'client6202495c74c10', 1, '2022-03-02', '2022-04-02', 'testtestfsda  fsd af sadfsad fsdfsadtestfsda  fsd af sadfsad fsdfsad', 'testfsda  fsd af sadfsad fsdfsad', 'test fsadf asdf astestfsda  fsd af sadfsad fsdfsad', 'testtestfsda  fsd af sadfsad fsdfsad', 'testtestfsda  fsd af sadfsad fsdfsad', 'testtestfsda  fsd af sadfsad fsdfsad'),
(5, 'client6202495c74c10', 1, '2022-02-01', '2022-03-04', 'asd fsad f', 'dsfadf', 'asdfasdf', 'asdfas', 'asdfasf safsa', 'dfasdf'),
(6, 'client6202495c74c10', 1, '2021-12-01', '2022-01-01', 'fgsdfg', 'dsfgsdg', 'sdfgsdg', 'sdfgsdg', 'sdgsd', 'sdfgsdfg');

-- --------------------------------------------------------

--
-- Table structure for table `produse`
--

CREATE TABLE `produse` (
  `id` int(11) NOT NULL,
  `nume` varchar(255) NOT NULL,
  `um` varchar(255) NOT NULL,
  `pret_unitar_fara_tva` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `proforme`
--

CREATE TABLE `proforme` (
  `id` int(11) NOT NULL,
  `client` varchar(255) NOT NULL,
  `nr_reg_comert` varchar(255) NOT NULL,
  `cod_fiscal` varchar(255) NOT NULL,
  `adresa_facturare` varchar(255) NOT NULL,
  `oras_facturare` varchar(255) NOT NULL,
  `judet_facturare` varchar(255) NOT NULL,
  `tara_facturare` varchar(255) NOT NULL,
  `data_factura` date NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `vat` int(10) NOT NULL,
  `produse` text NOT NULL,
  `termen_plata` date NOT NULL,
  `emitor` int(5) NOT NULL,
  `total_tva` varchar(255) NOT NULL,
  `total_f_tva` varchar(255) NOT NULL,
  `total_de_plata` varchar(255) NOT NULL,
  `invoice_created` int(5) NOT NULL,
  `created_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `proforme`
--

INSERT INTO `proforme` (`id`, `client`, `nr_reg_comert`, `cod_fiscal`, `adresa_facturare`, `oras_facturare`, `judet_facturare`, `tara_facturare`, `data_factura`, `invoice_number`, `vat`, `produse`, `termen_plata`, `emitor`, `total_tva`, `total_f_tva`, `total_de_plata`, `invoice_created`, `created_by`) VALUES
(1, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-08', 'PRF 22.03.08.001', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"1111-11-11\",\"per2\":\"1111-11-11\",\"nr\":\"1\",\"data\":\"1111-11-11\"}]', '2022-03-31', 1, '75.81', '399', '474.81', 1, 'Owner'),
(2, 'client6226684249a7d', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-08', 'PRF 22.03.08.002', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"2222-02-22\",\"per2\":\"2222-02-22\",\"nr\":\"3\",\"data\":\"2222-02-22\"},{\"tip\":\"0\",\"nume\":\"Test edit\",\"um\":\"buc\",\"cantitate\":\"3\",\"pretUnitar\":\"100\",\"prevalFaraTvatUnitar\":\"300\",\"tva\":\"57\"}]', '2022-03-31', 1, '132.81', '699', '831.81', 1, 'Owner'),
(3, 'client6226684249a7d', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-09', 'PRF 22.03.09.001', 20, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":\"79.8\",\"per1\":\"2022-02-01\",\"per2\":\"2022-03-12\",\"nr\":\"1\",\"data\":\"2022-01-01\"},{\"tip\":\"0\",\"nume\":\"test\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"100\",\"prevalFaraTvatUnitar\":\"100\",\"tva\":\"20\"}]', '2022-03-31', 1, '99.80', '499', '598.8', 1, 'admin620627d7e36c5'),
(4, 'client6202495c74c10', 'RO 12355745', 'j12/1234/12345', 'str. de acolo nr 123', 'Constanta', 'Constanta', 'Romania', '2022-03-09', 'PRF 22.03.09.002', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"123123-03-12\",\"per2\":\"0123-02-13\",\"nr\":\"123123\",\"data\":\"0123-03-12\"}]', '2022-03-31', 1, '75.81', '399', '474.81', 1, 'admin620627d7e36c5'),
(5, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-09', 'PRF 22.03.09.003', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"123132-03-12\",\"per2\":\"12313-03-12\",\"nr\":\"123\",\"data\":\"3123-03-12\"}]', '2022-03-31', 1, '75.81', '399', '474.81', 1, 'Owner'),
(9, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-09', 'SMP PRF 220309.001', 19, '[{\"tip\":\"0\",\"nume\":\"sadfasdf\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"1\",\"prevalFaraTvatUnitar\":\"1\",\"tva\":\"0.19\"}]', '2022-03-31', 2, '0.19', '1', '1.19', 1, 'Owner'),
(11, 'client622664aaba4fd', 'J02/968/2016', 'test3', 'satsadt', 'Arad', 'Arad', 'Romania', '2022-03-11', 'PRF 22.03.11.001', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada [per1]-[per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"0123-03-12\",\"per2\":\"0123-03-12\",\"nr\":\"1\",\"data\":\"0123-03-12\"}]', '2022-03-31', 2, '75.81', '399', '474.81', 1, 'Owner'),
(13, 'client6226684249a7d', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-14', 'PRF 22.03.14.001', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399\",\"prevalFaraTvatUnitar\":\"399\",\"tva\":75.81,\"per1\":\"123123-03-12\",\"per2\":\"0123-03-12\",\"nr\":\"1231\",\"data\":\"0123-03-12\"}]', '2022-03-31', 1, '75.81', '399', '474.81', 1, 'Owner'),
(16, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-14', 'PRF 22.03.14.002', 19, '[{\"tip\":\"0\",\"nume\":\"test\",\"um\":\"test\",\"cantitate\":\"1\",\"pretUnitar\":\"1\",\"prevalFaraTvatUnitar\":\"1\",\"tva\":\"0.19\"}]', '2022-03-31', 1, '0.19', '1', '1.19', 0, 'Owner'),
(17, 'client6226684249a7d', 'testRaluca', 'J02/968/2016', 'testRaluca', 'testRaluca', 'testRaluca', 'Romania', '2022-03-16', 'PRF 22.03.16.001', 19, '[{\"tip\":\"1\",\"nume\":\"Pachet START-UP perioada [per1] - [per2] conform Anexa nr. [nr] la contractul dintre parti din data de [data]\",\"um\":\"buc\",\"cantitate\":\"1\",\"pretUnitar\":\"399.3123\",\"prevalFaraTvatUnitar\":\"399.3123\",\"tva\":\"75.869337\",\"per1\":\"2022-03-12\",\"per2\":\"2022-03-12\",\"nr\":\"1\",\"data\":\"2022-12-12\"}]', '2022-03-31', 1, '75.87', '399.3123', '475.1823', 0, 'Owner');

-- --------------------------------------------------------

--
-- Table structure for table `setari`
--

CREATE TABLE `setari` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `tip` int(5) NOT NULL,
  `retea` varchar(255) NOT NULL,
  `cod` text NOT NULL,
  `comentarii` text NOT NULL,
  `ownership` int(5) NOT NULL,
  `sub_retea` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `setari`
--

INSERT INTO `setari` (`id`, `unicId`, `tip`, `retea`, `cod`, `comentarii`, `ownership`, `sub_retea`) VALUES
(3, 'client6202495c74c10', 1, 'google', '2345asdfas', 'asdfasdf', 1, 'google ads'),
(4, 'client6202495c74c10', 3, 'google', 'aasdfasd', 'asdfasdf', 1, 'google analytics');

-- --------------------------------------------------------

--
-- Table structure for table `social_media_accounts`
--

CREATE TABLE `social_media_accounts` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `retea` varchar(255) NOT NULL,
  `nume` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `login_user` varchar(255) NOT NULL,
  `login_pass` varchar(255) NOT NULL,
  `personal_account` int(5) NOT NULL,
  `comentarii` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `social_media_accounts`
--

INSERT INTO `social_media_accounts` (`id`, `unicId`, `retea`, `nume`, `link`, `login_user`, `login_pass`, `personal_account`, `comentarii`) VALUES
(3, 'client6202495c74c10', 'instagram', 'test', 'https://www.facebook.com/profile.php?id=100004632721147', 'test', 'test', 1, 'test\r\n-test\r\n-test\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `todo`
--

CREATE TABLE `todo` (
  `id` int(11) NOT NULL,
  `upload_date` datetime NOT NULL,
  `date_todo` date NOT NULL,
  `time_todo` time NOT NULL,
  `action` text NOT NULL,
  `mail` text NOT NULL,
  `telefon` varchar(255) NOT NULL,
  `status` int(5) NOT NULL,
  `observatii` text NOT NULL,
  `admin` varchar(255) NOT NULL,
  `clientId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todo`
--

INSERT INTO `todo` (`id`, `upload_date`, `date_todo`, `time_todo`, `action`, `mail`, `telefon`, `status`, `observatii`, `admin`, `clientId`) VALUES
(1, '2022-02-11 09:30:42', '2022-02-11', '10:30:00', '1', '', '0123456789', 1, 'test', 'admin620627d7e36c5', 'client6202495c74c10'),
(2, '2022-02-11 09:30:42', '2022-02-11', '10:30:00', '1', 'test@test.test', '', 1, 'test', 'admin620627d7e36c5', 'client6202495c74c10'),
(3, '2022-02-11 09:30:42', '2022-02-10', '10:30:00', '1', '', '0123456789', 1, 'test', 'admin620627d7e36c5', 'client6202495c74c10'),
(4, '2022-02-11 09:30:42', '2022-02-11', '10:30:00', '1', 'test@test.test', '', 0, 'test', 'admin620627d7e36c6', 'client6202495c74c10'),
(5, '2022-02-14 12:03:01', '2022-02-17', '15:00:00', '4', 'TestCRM@test.test', '', 0, 'de trimis email cu ce o fi', 'admin620627d7e36c5', 'client6202495c74c10'),
(6, '2022-02-14 12:07:05', '2022-02-14', '16:11:00', '5', 'test@test.test', '', 1, 'de trimis email ca l am sunat', 'admin620627d7e36c5', 'client6202495c74c10'),
(7, '2022-02-14 12:55:08', '2022-02-14', '15:00:00', '1', '', '0123456789', 1, 'test', 'admin620627d7e36c5', 'client6202495c74c10'),
(8, '2022-02-14 13:10:27', '2022-02-14', '17:10:00', '1', '', '0123456789', 1, 'test observatie actiune', 'admin620627d7e36c5', 'client6202495c74c10'),
(9, '2022-02-14 14:44:51', '2022-02-14', '20:44:00', '1', '', '0123456789', 0, 'tot bulnagiu e', 'admin620627d7e36c5', ''),
(10, '2022-03-11 17:11:05', '2022-03-11', '18:10:00', '1', '', '0123456798', 0, 'test', 'Owner', '');

-- --------------------------------------------------------

--
-- Table structure for table `websites`
--

CREATE TABLE `websites` (
  `id` int(11) NOT NULL,
  `unicId` varchar(255) NOT NULL,
  `website_nume` varchar(255) NOT NULL,
  `website_url` varchar(255) NOT NULL,
  `website_tip` varchar(255) NOT NULL,
  `domeniu` varchar(255) NOT NULL,
  `website_url_admin` varchar(255) NOT NULL,
  `website_admin_user` varchar(255) NOT NULL,
  `website_admin_pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `websites`
--

INSERT INTO `websites` (`id`, `unicId`, `website_nume`, `website_url`, `website_tip`, `domeniu`, `website_url_admin`, `website_admin_user`, `website_admin_pass`) VALUES
(8, 'client6202495c74c10', 'diclick.eu', 'https://diclick.eu/', '1', '1', '', '', ''),
(11, 'client621497983c326', 'ximivogue.ro', 'https://ximivogue.ro/', '1', '1', '', '', ''),
(12, 'client6202495c74c10', 'test', 'https://ximivogue.ro/', '1', '1', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buget`
--
ALTER TABLE `buget`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a5b2486c61`
--
ALTER TABLE `client620a5b2486c61`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a52c23486d`
--
ALTER TABLE `client620a52c23486d`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a52ded2861`
--
ALTER TABLE `client620a52ded2861`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a520a7c756`
--
ALTER TABLE `client620a520a7c756`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client62175a1d69c7a`
--
ALTER TABLE `client62175a1d69c7a`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client621759c00ddfa`
--
ALTER TABLE `client621759c00ddfa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client621898eb76fbb`
--
ALTER TABLE `client621898eb76fbb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client622664aaba4fd`
--
ALTER TABLE `client622664aaba4fd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client6202495c74c10`
--
ALTER TABLE `client6202495c74c10`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client6217594f163f8`
--
ALTER TABLE `client6217594f163f8`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client621497983c326`
--
ALTER TABLE `client621497983c326`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client622663319f7df`
--
ALTER TABLE `client622663319f7df`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client6226684249a7d`
--
ALTER TABLE `client6226684249a7d`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_pers`
--
ALTER TABLE `client_pers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_adresses`
--
ALTER TABLE `email_adresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fisa_client`
--
ALTER TABLE `fisa_client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_check`
--
ALTER TABLE `invoice_check`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media_plan`
--
ALTER TABLE `media_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `obiective`
--
ALTER TABLE `obiective`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produse`
--
ALTER TABLE `produse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proforme`
--
ALTER TABLE `proforme`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setari`
--
ALTER TABLE `setari`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_media_accounts`
--
ALTER TABLE `social_media_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `websites`
--
ALTER TABLE `websites`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buget`
--
ALTER TABLE `buget`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a5b2486c61`
--
ALTER TABLE `client620a5b2486c61`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a52c23486d`
--
ALTER TABLE `client620a52c23486d`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a52ded2861`
--
ALTER TABLE `client620a52ded2861`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a520a7c756`
--
ALTER TABLE `client620a520a7c756`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client62175a1d69c7a`
--
ALTER TABLE `client62175a1d69c7a`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client621759c00ddfa`
--
ALTER TABLE `client621759c00ddfa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client621898eb76fbb`
--
ALTER TABLE `client621898eb76fbb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client622664aaba4fd`
--
ALTER TABLE `client622664aaba4fd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client6202495c74c10`
--
ALTER TABLE `client6202495c74c10`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `client6217594f163f8`
--
ALTER TABLE `client6217594f163f8`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client621497983c326`
--
ALTER TABLE `client621497983c326`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client622663319f7df`
--
ALTER TABLE `client622663319f7df`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client6226684249a7d`
--
ALTER TABLE `client6226684249a7d`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client_pers`
--
ALTER TABLE `client_pers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `email_adresses`
--
ALTER TABLE `email_adresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `fisa_client`
--
ALTER TABLE `fisa_client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `invoice_check`
--
ALTER TABLE `invoice_check`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media_plan`
--
ALTER TABLE `media_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `obiective`
--
ALTER TABLE `obiective`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `produse`
--
ALTER TABLE `produse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proforme`
--
ALTER TABLE `proforme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `setari`
--
ALTER TABLE `setari`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `social_media_accounts`
--
ALTER TABLE `social_media_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `websites`
--
ALTER TABLE `websites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Database: `clients_diclick_mediaplan`
--
CREATE DATABASE IF NOT EXISTS `clients_diclick_mediaplan` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `clients_diclick_mediaplan`;

-- --------------------------------------------------------

--
-- Table structure for table `client61f7f5d319d4b_mediaplan`
--

CREATE TABLE `client61f7f5d319d4b_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(50) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client61f7f5d319d4b_mediaplan`
--

INSERT INTO `client61f7f5d319d4b_mediaplan` (`id`, `scheduleUnicId`, `file`, `title`, `text`, `platforms`, `date`, `time`, `status`, `comments`) VALUES
(13, 'schedule61f938a40234f', 'files/client61f7f5d319d4b/schedule_schedule61c06a7db2cbf_2021-12-30.jpg', 'Test', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus justo vitae tellus lacinia, a luctus nunc suscipit. Vestibulum porttitor rutrum mauris, quis vehicula arcu tristique et. Vivamus sed sem nec quam blandit suscipit quis eget dui. Nullam elementum volutpat massa non imperdiet. Praesent erat nibh, euismod at est et, posuere interdum velit. In eget metus iaculis, eleifend nibh sit amet, lobortis tellus. Cras a erat in leo cursus lacinia in eget velit. Aliquam at porttitor dui, ac dapibus magna. In ullamcorper blandit est quis sodales. Phasellus aliquet quam non tristique posuere. Duis lacus nibh, viverra at massa eu, tristique tempus purus. Etiam urna leo, feugiat eget pretium et, vulputate sit amet neque. Vestibulum pulvinar vehicula lectus, ut lacinia orci iaculis vel. In et justo non ex placerat iaculis. Phasellus laoreet dolor vitae metus iaculis vehicula. Fusce eget consequat arcu, vitae venenatis enim.', 'facebook\ninstagram\n', '2022-02-10', '18:41:00', '4', 'asdf'),
(14, 'schedule6200f49c88528', 'files/client61f7f5d319d4b/schedule_schedule6200f49c88528_2022-02-11.jpg', 'test2', 'test ', 'facebook\ninstagram\nsnapchat\n', '2022-02-11', '13:30:00', '4', 'dfa'),
(15, 'schedule6200f4d905eb0', 'files/client61f7f5d319d4b/schedule_schedule6200f4d905eb0_2022-02-12.png', 'test 3', 'test', 'instagram\ntiktok\nsnapchat\n', '2022-02-12', '14:30:00', '4', ''),
(16, 'schedule6200f54f6c7a7', 'files/client61f7f5d319d4b/schedule_schedule6200f54f6c7a7_2022-02-08.png', 'dafdsafs', 'fasgdfgdf', 'facebook\ninstagram\n', '2022-02-08', '17:32:00', '4', ''),
(17, 'schedule6200f5638019f', 'files/client61f7f5d319d4b/schedule_schedule6200f5638019f_2022-02-08.png', 'ertyerty', 'ertyerty', 'tiktok\nsnapchat\n', '2022-02-08', '14:33:00', '4', ''),
(18, 'schedule6200fc6b5c96d', 'files/client61f7f5d319d4b/schedule_schedule6200fc6b5c96d_2022-02-07.png', 'asdfasfasdf', 'asdfasd', 'facebook\nlinkedin\n', '2022-02-07', '15:03:00', '2', 'da'),
(19, 'schedule620a234598ee8', 'files/client61f7f5d319d4b/schedule_schedule620a234598ee8_2022-02-09.', 'test', 'test', 'facebook\n', '2022-02-09', '13:39:00', '1', ''),
(20, 'schedule620a238bcf370', 'files/client61f7f5d319d4b/schedule_schedule620a238bcf370_2022-02-02.jpg', 'test', 'test', 'facebook\ninstagram\n', '2022-02-02', '12:40:00', '1', ''),
(21, 'schedule620caf46d592f', 'files/client61f7f5d319d4b/schedule_schedule620caf46d592f_2022-02-03.mp4', 'gdfsgfg', 'sdfgsdfgsd', 'facebook\n', '2022-02-03', '11:00:00', '1', ''),
(22, 'schedule6215eeed15781', 'files/client61f7f5d319d4b/schedule_schedule6215eeed15781_2022-02-04.png', 'rwar', 'ad fsad fsa fasf asdf', 'facebook\ntwitter\nlinkedin\n', '2022-02-04', '11:23:00', '1', ''),
(23, 'schedule623463ede1470', 'files/client61f7f5d319d4b/schedule_schedule623463ede1470_2022-03-02.jpg', 'test', 'test', 'facebook\n', '2022-03-02', '16:50:00', '4', '[{\"id\":\"com623475d8eaccf\",\"from\":\"admin\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 14:06:48\",\"comment\":\"test\"},{\"id\":\"com623475f237026\",\"from\":\"admin\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 14:07:14\",\"comment\":\"test\"},{\"id\":\"com623475f67c5de\",\"from\":\"admin\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 14:07:18\",\"comment\":\"yrdy\"},{\"id\":\"com6234761b034ec\",\"from\":\"admin\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 14:07:55\",\"comment\":\"test\"},{\"id\":\"com623478abb9f52\",\"from\":\"client\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 14:18:51\",\"comment\":\"test\"},{\"id\":\"com623478ae15603\",\"from\":\"client\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 14:18:54\",\"comment\":\"test\"},{\"id\":\"com623478c7176aa\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 14:19:19\",\"comment\":\"test\"},{\"id\":\"com623478e2d996e\",\"from\":\"client\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 14:19:46\",\"comment\":\"test\"},{\"id\":\"com623478eca2214\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 14:19:56\",\"comment\":\"test\"},{\"id\":\"com623478f475a18\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 14:20:04\",\"comment\":\"test\"},{\"id\":\"com6234792a188d9\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 14:20:58\",\"comment\":\"test\"},{\"id\":\"com62347930d3822\",\"from\":\"client\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 14:21:04\",\"comment\":\"test\"}]'),
(24, 'schedule623463fb1d64f', 'files/client61f7f5d319d4b/schedule_schedule623463fb1d64f_2022-03-03.png', 'basbasd', 'asbdasb', 'facebook\nsnapchat\nyoutube\n', '2022-03-03', '15:50:00', '4', '[{\"id\":\"com62348a5c8406f\",\"from\":\"client\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 15:34:20\",\"comment\":\"test<br>\"},{\"id\":\"com62348aa016ded\",\"from\":\"client\",\"author\":\"client61f7f5d319d4b\",\"date\":\"2022-03-18 15:35:28\",\"comment\":\"test\"},{\"id\":\"com62348aafc091e\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 15:35:43\",\"comment\":\"test\"},{\"id\":\"com62348b279fdd7\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 15:37:43\",\"comment\":\"test\"}]'),
(25, 'schedule623484bdc802c', 'files/client61f7f5d319d4b/schedule_schedule623484bdc802c_2022-03-04.jpg', 'test', 'test', 'facebook\ninstagram\npinterest\ntwitter\nlinkedin\ntiktok\nsnapchat\nyoutube\n', '2022-03-04', '00:00:00', '4', '');

-- --------------------------------------------------------

--
-- Table structure for table `client620a5b2486c61_mediaplan`
--

CREATE TABLE `client620a5b2486c61_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a52c23486d_mediaplan`
--

CREATE TABLE `client620a52c23486d_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a52ded2861_mediaplan`
--

CREATE TABLE `client620a52ded2861_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a520a7c756_mediaplan`
--

CREATE TABLE `client620a520a7c756_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client621898eb76fbb_mediaplan`
--

CREATE TABLE `client621898eb76fbb_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client622664aaba4fd_mediaplan`
--

CREATE TABLE `client622664aaba4fd_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client6202495c74c10_mediaplan`
--

CREATE TABLE `client6202495c74c10_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client621497983c326_mediaplan`
--

CREATE TABLE `client621497983c326_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client621497983c326_mediaplan`
--

INSERT INTO `client621497983c326_mediaplan` (`id`, `scheduleUnicId`, `file`, `title`, `text`, `platforms`, `date`, `time`, `status`, `comments`) VALUES
(1, 'schedule62178d8135eac', 'files/client621497983c326/schedule_schedule62178d8135eac_2022-02-02.png', 'test', 'test', 'instagram\n', '2022-02-02', '17:53:00', '1', ''),
(3, 'schedule623094283ce05', 'files/client621497983c326/schedule_schedule623094283ce05_2022-03-02.jpg', 'test', 'test', 'facebook\n', '2022-03-02', '16:27:00', '1', '[{\"id\":\"com62345f90425b1\",\"from\":\"admin\",\"author\":null,\"date\":\"2022-03-18 12:31:44\",\"comment\":\"test 1\"},{\"id\":\"com62345f949b983\",\"from\":\"admin\",\"author\":null,\"date\":\"2022-03-18 12:31:48\",\"comment\":\"test<br>test\"},{\"id\":\"com62345f9ee6e99\",\"from\":\"admin\",\"author\":null,\"date\":\"2022-03-18 12:31:58\",\"comment\":\"test cu spatii<br>si cu linii noi<br>chiar si ascunse<br><br>\"},{\"id\":\"com62345ffa22458\",\"from\":\"admin\",\"author\":null,\"date\":\"2022-03-18 12:33:30\",\"comment\":\"sa vedem si scrolu<br>\"},{\"id\":\"com62345ffc64411\",\"from\":\"admin\",\"author\":null,\"date\":\"2022-03-18 12:33:32\",\"comment\":\"daca merge\"},{\"id\":\"com6234600000d49\",\"from\":\"admin\",\"author\":null,\"date\":\"2022-03-18 12:33:36\",\"comment\":\"hai ca mergee \"},{\"id\":\"com6234600264b7a\",\"from\":\"admin\",\"author\":null,\"date\":\"2022-03-18 12:33:38\",\"comment\":\"NOICE\"},{\"id\":\"com623462549078d\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 12:43:32\",\"comment\":\"test\"}]'),
(4, 'schedule62346075790e4', 'files/client621497983c326/schedule_schedule62346075790e4_2022-03-03.jpg', 'test', 'test', 'facebook\n', '2022-03-03', '14:35:00', '1', '[{\"id\":\"com623460783eee4\",\"from\":\"admin\",\"author\":null,\"date\":\"2022-03-18 12:35:36\",\"comment\":\"test\"},{\"id\":\"com62346079ed98a\",\"from\":\"admin\",\"author\":null,\"date\":\"2022-03-18 12:35:37\",\"comment\":\"testetset\"},{\"id\":\"com6234627d4a85b\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 12:44:13\",\"comment\":\"test\"},{\"id\":\"com6234627e6e16e\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 12:44:14\",\"comment\":\"test\"},{\"id\":\"com6234627f66a52\",\"from\":\"admin\",\"author\":\"Owner\",\"date\":\"2022-03-18 12:44:15\",\"comment\":\"test\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `client622663319f7df_mediaplan`
--

CREATE TABLE `client622663319f7df_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client6226684249a7d_mediaplan`
--

CREATE TABLE `client6226684249a7d_mediaplan` (
  `id` int(11) NOT NULL,
  `scheduleUnicId` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `platforms` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(40) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client61f7f5d319d4b_mediaplan`
--
ALTER TABLE `client61f7f5d319d4b_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a5b2486c61_mediaplan`
--
ALTER TABLE `client620a5b2486c61_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a52c23486d_mediaplan`
--
ALTER TABLE `client620a52c23486d_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a52ded2861_mediaplan`
--
ALTER TABLE `client620a52ded2861_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a520a7c756_mediaplan`
--
ALTER TABLE `client620a520a7c756_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client621898eb76fbb_mediaplan`
--
ALTER TABLE `client621898eb76fbb_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client622664aaba4fd_mediaplan`
--
ALTER TABLE `client622664aaba4fd_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client6202495c74c10_mediaplan`
--
ALTER TABLE `client6202495c74c10_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client621497983c326_mediaplan`
--
ALTER TABLE `client621497983c326_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client622663319f7df_mediaplan`
--
ALTER TABLE `client622663319f7df_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client6226684249a7d_mediaplan`
--
ALTER TABLE `client6226684249a7d_mediaplan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client61f7f5d319d4b_mediaplan`
--
ALTER TABLE `client61f7f5d319d4b_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `client620a5b2486c61_mediaplan`
--
ALTER TABLE `client620a5b2486c61_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a52c23486d_mediaplan`
--
ALTER TABLE `client620a52c23486d_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a52ded2861_mediaplan`
--
ALTER TABLE `client620a52ded2861_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a520a7c756_mediaplan`
--
ALTER TABLE `client620a520a7c756_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client621898eb76fbb_mediaplan`
--
ALTER TABLE `client621898eb76fbb_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client622664aaba4fd_mediaplan`
--
ALTER TABLE `client622664aaba4fd_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client6202495c74c10_mediaplan`
--
ALTER TABLE `client6202495c74c10_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client621497983c326_mediaplan`
--
ALTER TABLE `client621497983c326_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `client622663319f7df_mediaplan`
--
ALTER TABLE `client622663319f7df_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client6226684249a7d_mediaplan`
--
ALTER TABLE `client6226684249a7d_mediaplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Database: `clients_diclick_tasks`
--
CREATE DATABASE IF NOT EXISTS `clients_diclick_tasks` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `clients_diclick_tasks`;

-- --------------------------------------------------------

--
-- Table structure for table `client61f7f5d319d4b`
--

CREATE TABLE `client61f7f5d319d4b` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a5b2486c61`
--

CREATE TABLE `client620a5b2486c61` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a52c23486d`
--

CREATE TABLE `client620a52c23486d` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a52ded2861`
--

CREATE TABLE `client620a52ded2861` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client620a520a7c756`
--

CREATE TABLE `client620a520a7c756` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client621898eb76fbb`
--

CREATE TABLE `client621898eb76fbb` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client622664aaba4fd`
--

CREATE TABLE `client622664aaba4fd` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client6202495c74c10`
--

CREATE TABLE `client6202495c74c10` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client621497983c326`
--

CREATE TABLE `client621497983c326` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client622663319f7df`
--

CREATE TABLE `client622663319f7df` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client6226684249a7d`
--

CREATE TABLE `client6226684249a7d` (
  `id` int(11) NOT NULL,
  `projectId` varchar(255) NOT NULL,
  `projectStatus` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `projectType` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client61f7f5d319d4b`
--
ALTER TABLE `client61f7f5d319d4b`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a5b2486c61`
--
ALTER TABLE `client620a5b2486c61`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a52c23486d`
--
ALTER TABLE `client620a52c23486d`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a52ded2861`
--
ALTER TABLE `client620a52ded2861`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a520a7c756`
--
ALTER TABLE `client620a520a7c756`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client621898eb76fbb`
--
ALTER TABLE `client621898eb76fbb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client622664aaba4fd`
--
ALTER TABLE `client622664aaba4fd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client6202495c74c10`
--
ALTER TABLE `client6202495c74c10`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client621497983c326`
--
ALTER TABLE `client621497983c326`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client622663319f7df`
--
ALTER TABLE `client622663319f7df`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client6226684249a7d`
--
ALTER TABLE `client6226684249a7d`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client61f7f5d319d4b`
--
ALTER TABLE `client61f7f5d319d4b`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a5b2486c61`
--
ALTER TABLE `client620a5b2486c61`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a52c23486d`
--
ALTER TABLE `client620a52c23486d`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a52ded2861`
--
ALTER TABLE `client620a52ded2861`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client620a520a7c756`
--
ALTER TABLE `client620a520a7c756`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client621898eb76fbb`
--
ALTER TABLE `client621898eb76fbb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client622664aaba4fd`
--
ALTER TABLE `client622664aaba4fd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client6202495c74c10`
--
ALTER TABLE `client6202495c74c10`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client621497983c326`
--
ALTER TABLE `client621497983c326`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client622663319f7df`
--
ALTER TABLE `client622663319f7df`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client6226684249a7d`
--
ALTER TABLE `client6226684249a7d`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Database: `clients_diclick_updates`
--
CREATE DATABASE IF NOT EXISTS `clients_diclick_updates` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `clients_diclick_updates`;

-- --------------------------------------------------------

--
-- Table structure for table `client61f7f5d319d4b_updates`
--

CREATE TABLE `client61f7f5d319d4b_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client61f7f5d319d4b_updates`
--

INSERT INTO `client61f7f5d319d4b_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-01-31', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client620a5b2486c61_updates`
--

CREATE TABLE `client620a5b2486c61_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client620a5b2486c61_updates`
--

INSERT INTO `client620a5b2486c61_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-02-14', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client620a52c23486d_updates`
--

CREATE TABLE `client620a52c23486d_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client620a52c23486d_updates`
--

INSERT INTO `client620a52c23486d_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-02-14', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client620a52ded2861_updates`
--

CREATE TABLE `client620a52ded2861_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client620a52ded2861_updates`
--

INSERT INTO `client620a52ded2861_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-02-14', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client620a520a7c756_updates`
--

CREATE TABLE `client620a520a7c756_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client620a520a7c756_updates`
--

INSERT INTO `client620a520a7c756_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-02-14', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client621898eb76fbb_updates`
--

CREATE TABLE `client621898eb76fbb_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client621898eb76fbb_updates`
--

INSERT INTO `client621898eb76fbb_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-02-25', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client622664aaba4fd_updates`
--

CREATE TABLE `client622664aaba4fd_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client622664aaba4fd_updates`
--

INSERT INTO `client622664aaba4fd_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-03-07', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client6202495c74c10_updates`
--

CREATE TABLE `client6202495c74c10_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client6202495c74c10_updates`
--

INSERT INTO `client6202495c74c10_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-02-08', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client621497983c326_updates`
--

CREATE TABLE `client621497983c326_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client621497983c326_updates`
--

INSERT INTO `client621497983c326_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-02-22', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client622663319f7df_updates`
--

CREATE TABLE `client622663319f7df_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client622663319f7df_updates`
--

INSERT INTO `client622663319f7df_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-03-07', 'Account created', '');

-- --------------------------------------------------------

--
-- Table structure for table `client6226684249a7d_updates`
--

CREATE TABLE `client6226684249a7d_updates` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client6226684249a7d_updates`
--

INSERT INTO `client6226684249a7d_updates` (`id`, `date`, `description`, `file`) VALUES
(1, '2022-03-07', 'Account created', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client61f7f5d319d4b_updates`
--
ALTER TABLE `client61f7f5d319d4b_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a5b2486c61_updates`
--
ALTER TABLE `client620a5b2486c61_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a52c23486d_updates`
--
ALTER TABLE `client620a52c23486d_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a52ded2861_updates`
--
ALTER TABLE `client620a52ded2861_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client620a520a7c756_updates`
--
ALTER TABLE `client620a520a7c756_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client621898eb76fbb_updates`
--
ALTER TABLE `client621898eb76fbb_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client622664aaba4fd_updates`
--
ALTER TABLE `client622664aaba4fd_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client6202495c74c10_updates`
--
ALTER TABLE `client6202495c74c10_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client621497983c326_updates`
--
ALTER TABLE `client621497983c326_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client622663319f7df_updates`
--
ALTER TABLE `client622663319f7df_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client6226684249a7d_updates`
--
ALTER TABLE `client6226684249a7d_updates`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client61f7f5d319d4b_updates`
--
ALTER TABLE `client61f7f5d319d4b_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client620a5b2486c61_updates`
--
ALTER TABLE `client620a5b2486c61_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client620a52c23486d_updates`
--
ALTER TABLE `client620a52c23486d_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client620a52ded2861_updates`
--
ALTER TABLE `client620a52ded2861_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client620a520a7c756_updates`
--
ALTER TABLE `client620a520a7c756_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client621898eb76fbb_updates`
--
ALTER TABLE `client621898eb76fbb_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client622664aaba4fd_updates`
--
ALTER TABLE `client622664aaba4fd_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client6202495c74c10_updates`
--
ALTER TABLE `client6202495c74c10_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client621497983c326_updates`
--
ALTER TABLE `client621497983c326_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client622663319f7df_updates`
--
ALTER TABLE `client622663319f7df_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client6226684249a7d_updates`
--
ALTER TABLE `client6226684249a7d_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Database: `exchange_db`
--
CREATE DATABASE IF NOT EXISTS `exchange_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `exchange_db`;

-- --------------------------------------------------------

--
-- Table structure for table `admin_accounts`
--

CREATE TABLE `admin_accounts` (
  `id` int(11) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `last_connect` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_accounts`
--

INSERT INTO `admin_accounts` (`id`, `userid`, `username`, `name`, `password`, `email`, `role`, `last_connect`) VALUES
(1, 'admin', 'admin', 'admin', '$2y$10$c1/D7OSWQ153Ermpm6rZH.387I/HQeSqyLc6tmjsyPty5liyQv7qu', 'admin@admin.ro', 'admin-1', '2022-01-05 09:56:25');

-- --------------------------------------------------------

--
-- Table structure for table `all_products`
--

CREATE TABLE `all_products` (
  `id` int(11) NOT NULL,
  `product_unic_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `images` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `subcategory` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `upload_date` datetime NOT NULL,
  `aprove_date` datetime NOT NULL,
  `pick_up_county` varchar(255) NOT NULL,
  `pick_up_locality` varchar(255) NOT NULL,
  `pick_up_adress` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `delivery_AWB` varchar(255) NOT NULL,
  `reciver` varchar(255) NOT NULL,
  `pick_up_person` varchar(255) NOT NULL,
  `pick_up_phone` varchar(255) NOT NULL,
  `pick_up_email` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `old_price` varchar(255) NOT NULL,
  `feature` varchar(10) NOT NULL,
  `in_cart` varchar(255) NOT NULL,
  `potential_reciver` text NOT NULL,
  `quantity` int(100) NOT NULL,
  `stock` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all_products`
--

INSERT INTO `all_products` (`id`, `product_unic_id`, `name`, `description`, `images`, `category`, `subcategory`, `author`, `upload_date`, `aprove_date`, `pick_up_county`, `pick_up_locality`, `pick_up_adress`, `status`, `delivery_AWB`, `reciver`, `pick_up_person`, `pick_up_phone`, `pick_up_email`, `price`, `old_price`, `feature`, `in_cart`, `potential_reciver`, `quantity`, `stock`) VALUES
(1, 'produs61eab5602938c', 'Denumire produs', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam lectus, feugiat at molestie sed, imperdiet a enim. Proin ex nunc, porta eu tincidunt id, euismod et sem. Quisque dictum porta ex, et euismod dui tristique nec. Vivamus eleifend at arcu at interdum. Nam sapien justo, vulputate quis ex non, mattis consectetur elit. Nulla facilisi. Nam ipsum enim, cursus aliquet tincidunt quis, laoreet sit amet nulla. Fusce eget consequat sem. Proin a aliquet magna, ac ornare velit. Aenean vel interdum velit. Pellentesque vulputate nisl magna, eget imperdiet sem commodo id.<br><br>Nulla laoreet posuere lectus, quis scelerisque urna pellentesque non. Proin at vestibulum neque. Aliquam pellentesque felis nisl, quis interdum risus finibus eget. Nunc a rutrum velit. Aliquam sit amet dui scelerisque, scelerisque massa in, condimentum purus. Vestibulum at libero urna. Aliquam pellentesque dapibus varius. Fusce sed tristique tortor, ac sagittis justo. Quisque ac elit quis velit laoreet finibus. Nam imperdiet quam velit, quis iaculis dolor porta vitae.', 'produs61eab5602938c_image1.jpeg\nprodus61eab5602938c_image2.jpg\nprodus61eab5602938c_image3.jpg\n', '10', '1025753', 'user61eab0b66cd21', '2022-01-21 15:30:08', '2022-01-21 16:11:36', 'Constanta', 'Constanta', 'Str. Arhiepiscopiei nr. 19', 'de vanzare', '', 'user61eac006e0d10', 'Popescu Ion', '0123456789', 'popescu.ion@test.test', '15', '1000', '', '', '', 1, 1),
(2, 'produs61eac296d2522', 'Alt produs', '61eac006e0dd261eac006e0dd261eac006e0dd261eac006e0dd261eac006e0dd261eac006e0dd261eac006e0dd261eac006e0dd261eac006e0dd261eac006e0dd2 <br>61eac006e0dd2', 'produs61eac296d2522_image1.jpg\nprodus61eac296d2522_image2.jpg\nprodus61eac296d2522_image3.jpg\n', '20', '2019015', 'user61eac006e0d10', '2022-01-21 16:26:30', '2022-01-21 16:27:00', 'Constanta', 'Constanta', 'bla bla', 'de vanzare', '', '', 'test test', '0123456789', 'test@test.test', '100', '', '', '', '', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `banlist`
--

CREATE TABLE `banlist` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `userid` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `reason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banlist`
--

INSERT INTO `banlist` (`id`, `date`, `userid`, `email`, `phone`, `reason`) VALUES
(6, '2022-01-21 09:32:23', 'user61d58a04858b2', 'bucel.ionsebastian3@gmail.com', '0774689080', 'e bun motivul');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_id` varchar(255) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_id`, `category_name`) VALUES
(1, '10', 'Auto, moto și ambarcațiuni'),
(2, '20', 'Imobiliare'),
(3, '30', 'Electronice și electrocasnice'),
(4, '40', 'Modă și frumusețe'),
(6, '60', 'Casă și grădină'),
(7, '70', 'Mama și copilul');

-- --------------------------------------------------------

--
-- Table structure for table `forget_password_token`
--

CREATE TABLE `forget_password_token` (
  `id` int(11) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `request_time` datetime NOT NULL,
  `expire_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `user` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `date`, `user`, `description`, `type`) VALUES
(1, '2022-01-05 14:05:04', 'SERVER', 'user61d5897024c6d - contul a fost creat.', ''),
(2, '2022-01-05 14:07:32', 'SERVER', 'user61d58a04858b1 - contul a fost creat.', ''),
(3, '2022-01-21 15:10:14', 'SERVER', 'user61eab0b66cd21 - contul a fost creat.', ''),
(4, '2022-01-21 16:15:34', 'SERVER', 'user61eac006e0d10 - contul a fost creat.', '');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(255) NOT NULL,
  `reciver` varchar(255) NOT NULL,
  `delivery_adress` text NOT NULL,
  `delivery_AWB` text NOT NULL,
  `total_price` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_status` varchar(255) NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderId`, `date`, `status`, `reciver`, `delivery_adress`, `delivery_AWB`, `total_price`, `payment_method`, `payment_status`, `file`) VALUES
(1, '[value-2]', '0000-00-00 00:00:00', '[value-4]', 'user61d58a04858b1', '[value-6]', '[value-7]', '[value-8]', '[value-9]', 'complete', ''),
(2, '[value-3]', '0000-00-00 00:00:00', '[value-3]', 'user61d58a04858b1', '[value-6]', '[value-7]', '[value-8]', '[value-9]', '[value-10]', '');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `category_id` varchar(255) NOT NULL,
  `subcategory_id` varchar(255) NOT NULL,
  `subcategory_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `category_id`, `subcategory_id`, `subcategory_name`) VALUES
(23, '10', '1025753', 'Autoturisme'),
(24, '10', '1060845', 'Autoutilitare'),
(25, '10', '1033387', 'Camioane - Rulote - Remorci'),
(26, '10', '1012600', 'Motociclete - Scutere - atv'),
(27, '10', '1059701', 'Ambarcațiuni'),
(28, '20', '2084377', 'Apartamente - Garsoniere'),
(29, '20', '2019015', 'Case'),
(30, '20', '2035498', 'Terenuri'),
(32, '20', '2056306', 'Alte proprietăți');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `account_confirm` varchar(50) NOT NULL,
  `last_log_in` datetime DEFAULT NULL,
  `fav_products` text NOT NULL,
  `create_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userid`, `username`, `password`, `role`, `first_name`, `last_name`, `adress`, `phone`, `email`, `account_confirm`, `last_log_in`, `fav_products`, `create_date`) VALUES
(1, 'user61eab0b66cd21', 'Test', '$2y$08$47YELrDIQZVIzevog2qN..kaEnRoiOBS9w9C3h9wO6Ze9R5GzO4vS', 'user', 'Ion', 'Popescu', '{\"county\":\"Constanta\",\"locality\":\"Constanta\",\"adress\":\"Str. Arhiepiscopiei nr. 19\"}', '0123456789', 'popescu.ion@test.test', '0', '2022-01-21 18:15:20', 'produs61eab5602938c', '2022-01-21 15:10:14'),
(2, 'user61eac006e0d10', 'test2', '$2y$08$./w7REvvhMwM.vg3W04qAejtoi2vpEtyGH.Uac.aMj7X.S3ZC9DNm', 'user', 'test', 'test', '{\"county\":\"Constanta\",\"locality\":\"Constanta\",\"adress\":\"bla bla\"}', '0123456789', 'test@test.test', '0', '2022-01-21 16:16:35', '', '2022-01-21 16:15:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `all_products`
--
ALTER TABLE `all_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banlist`
--
ALTER TABLE `banlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forget_password_token`
--
ALTER TABLE `forget_password_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `all_products`
--
ALTER TABLE `all_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `banlist`
--
ALTER TABLE `banlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `forget_password_token`
--
ALTER TABLE `forget_password_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `user` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `query` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_length` text COLLATE utf8_bin DEFAULT NULL,
  `col_collation` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) COLLATE utf8_bin DEFAULT '',
  `col_default` text COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `column_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `settings_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

--
-- Dumping data for table `pma__designer_settings`
--

INSERT INTO `pma__designer_settings` (`username`, `settings_data`) VALUES
('root', '{\"angular_direct\":\"direct\",\"relation_lines\":\"true\",\"snap_to_grid\":\"off\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `export_type` varchar(10) COLLATE utf8_bin NOT NULL,
  `template_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `template_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"clients_diclick\",\"table\":\"users\"},{\"db\":\"clients_diclick_mediaplan\",\"table\":\"client621497983c326_mediaplan\"},{\"db\":\"clients_diclick_crm\",\"table\":\"proforme\"},{\"db\":\"clients_diclick_crm\",\"table\":\"fisa_client\"},{\"db\":\"clients_diclick_crm\",\"table\":\"produse\"},{\"db\":\"clients_diclick_crm\",\"table\":\"invoices\"},{\"db\":\"clients_diclick\",\"table\":\"invoice_check\"},{\"db\":\"clients_diclick\",\"table\":\"admin_roles\"},{\"db\":\"clients_diclick_crm\",\"table\":\"invoice_check\"},{\"db\":\"clients_diclick\",\"table\":\"admin_departments\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `display_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `prefs` text COLLATE utf8_bin NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

--
-- Dumping data for table `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'clients_diclick', 'admin_roles', '{\"sorted_col\":\"`admin_roles`.`permissions` ASC\"}', '2022-02-24 07:49:33'),
('root', 'clients_diclick', 'users', '{\"CREATE_TIME\":\"2022-03-01 09:57:54\",\"col_order\":[0,10,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20],\"col_visib\":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],\"sorted_col\":\"`users`.`unicId` ASC\"}', '2022-03-08 08:29:20'),
('root', 'clients_diclick_crm', 'client6202495c74c10', '{\"sorted_col\":\"`client6202495c74c10`.`data` DESC\"}', '2022-02-14 11:08:18'),
('root', 'clients_diclick_crm', 'email_adresses', '{\"sorted_col\":\"`email_adresses`.`adresa_email` ASC\"}', '2022-02-25 08:10:14'),
('root', 'clients_diclick_crm', 'fisa_client', '{\"sorted_col\":\"`fisa_client`.`categorie` ASC\"}', '2022-03-07 20:16:27'),
('root', 'clients_diclick_crm', 'invoices', '{\"sorted_col\":\"`invoices`.`created_by` ASC\"}', '2022-03-14 09:47:57'),
('root', 'clients_diclick_crm', 'social_media_accounts', '{\"sorted_col\":\"`social_media_accounts`.`comentarii`  DESC\"}', '2022-03-02 13:18:18'),
('root', 'clients_diclick_mediaplan', 'client621497983c326_mediaplan', '{\"sorted_col\":\"`client621497983c326_mediaplan`.`comments` ASC\"}', '2022-03-18 10:28:38'),
('root', 'exchange_db', 'admin_accounts', '{\"CREATE_TIME\":\"2021-12-21 09:35:13\"}', '2022-01-21 07:56:00'),
('root', 'exchange_db', 'all_products', '{\"CREATE_TIME\":\"2022-01-20 15:56:34\",\"sorted_col\":\"`all_products`.`potential_reciver`  ASC\",\"col_order\":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],\"col_visib\":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}', '2022-01-21 10:32:43'),
('root', 'exchange_db', 'subcategories', '{\"sorted_col\":\"`subcategories`.`subcategory_name` ASC\"}', '2022-01-13 11:00:51'),
('root', 'exchange_db', 'users', '{\"CREATE_TIME\":\"2022-01-03 14:18:47\"}', '2022-01-05 13:46:10');

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text COLLATE utf8_bin NOT NULL,
  `schema_sql` text COLLATE utf8_bin DEFAULT NULL,
  `data_sql` longtext COLLATE utf8_bin DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') COLLATE utf8_bin DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2022-03-21 07:47:03', '{\"Console\\/Mode\":\"collapse\",\"Console\\/Height\":195.99579999999997,\"NavigationWidth\":0}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL,
  `tab` varchar(64) COLLATE utf8_bin NOT NULL,
  `allowed` enum('Y','N') COLLATE utf8_bin NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
