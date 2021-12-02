-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2021 at 03:53 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cc_letsbid`
--

-- --------------------------------------------------------

--
-- Table structure for table `bankaccounts`
--

CREATE TABLE `bankaccounts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `amount` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) DEFAULT current_timestamp(3),
  `updated_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  `is_block` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bankaccounts`
--

INSERT INTO `bankaccounts` (`id`, `user_id`, `amount`, `status`, `created_at`, `updated_at`, `is_block`) VALUES
(1, 1, 100, 1, '2021-11-22 04:04:42.208', '2021-11-22 04:04:42.208', 0);

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `game_type` int(5) NOT NULL,
  `character_1` varchar(255) NOT NULL DEFAULT '',
  `character_2` varchar(255) NOT NULL DEFAULT '',
  `character_3` varchar(255) NOT NULL DEFAULT '',
  `character_4` varchar(255) DEFAULT '',
  `character_5` varchar(255) DEFAULT '',
  `character_6` varchar(255) DEFAULT '',
  `character_7` varchar(255) NOT NULL DEFAULT '',
  `character_8` varchar(255) NOT NULL DEFAULT '',
  `character_9` varchar(255) NOT NULL DEFAULT '',
  `character_10` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime(3) DEFAULT current_timestamp(3),
  `updated_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `conversion_rates`
--

CREATE TABLE `conversion_rates` (
  `id` int(11) NOT NULL,
  `number_conversion` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login_users`
--

CREATE TABLE `login_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login_at` datetime(3) DEFAULT current_timestamp(3),
  `time` int(11) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT current_timestamp(3),
  `updated_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_users`
--

INSERT INTO `login_users` (`id`, `user_id`, `login_at`, `time`, `created_at`, `updated_at`) VALUES
(1, 1, '2021-11-22 04:07:09.000', 2, '2021-11-22 04:04:46.708', '2021-11-22 04:07:09.721');

-- --------------------------------------------------------

--
-- Table structure for table `matcheshistories`
--

CREATE TABLE `matcheshistories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `win` int(3) NOT NULL DEFAULT 0,
  `lose` int(3) NOT NULL DEFAULT 0,
  `type_bet` int(5) NOT NULL DEFAULT 0,
  `place_bet` varchar(255) DEFAULT '',
  `stake` int(11) NOT NULL DEFAULT 0,
  `status` int(3) NOT NULL DEFAULT 0,
  `created_at` datetime(3) DEFAULT current_timestamp(3),
  `updated_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  `placed_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `game_type` int(5) NOT NULL,
  `proportionality` int(5) NOT NULL,
  `created_at` datetime(3) DEFAULT current_timestamp(3),
  `updated_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  `is_play` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `type` int(5) NOT NULL,
  `name` int(5) NOT NULL,
  `created_at` datetime(3) DEFAULT current_timestamp(3),
  `updated_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210107075442-create-options.js'),
('20210107080355-create-users.js'),
('20210107080537-create-transfershistory.js'),
('20210107080548-create-permissions.js'),
('20210107080602-create-matcheshistory.js'),
('20210107080616-create-bankaccounts.js'),
('20210108040232-modify-transfershistories-add-new-fields.js'),
('20210109142635-modify_users_rename_and_remove_fields.js'),
('20210109143951-modify_transfershistories_rename_fields.js'),
('20210109144458-modify_matcheshistories_add_new_fields.js'),
('20210109145729-create-user_admins.js'),
('20210112555555-create-characters.js'),
('20210112555575-modify-users-add-phone-colunm.js'),
('2021011711111-modify_options.js'),
('20210122160303-create-conversion-rate.js'),
('20210122499993-modify_users_fb_id_and_gg_email_fields.js'),
('20210123111111-create_login_users.js'),
('20210123111122-delete_user_password.js'),
('20210124131834-create-modify-login-user.js'),
('20210124999999-modify_user_login.js'),
('20210125111111-modify_user_login_time.js'),
('20210205151853-modify-bankaccount.js');

-- --------------------------------------------------------

--
-- Table structure for table `transfershistories`
--

CREATE TABLE `transfershistories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bank_acc_id` int(11) NOT NULL,
  `summand` int(11) NOT NULL DEFAULT 0,
  `destination_id` int(11) NOT NULL DEFAULT 0,
  `arrival_id` int(11) NOT NULL DEFAULT 0,
  `status` int(3) NOT NULL DEFAULT 0,
  `transfer_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  `created_at` datetime(3) DEFAULT current_timestamp(3),
  `updated_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fbUID` varchar(255) DEFAULT NULL,
  `gg_email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` int(3) NOT NULL DEFAULT 1,
  `address` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime(3) DEFAULT current_timestamp(3),
  `updated_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fbUID`, `gg_email`, `phone`, `name`, `image`, `status`, `address`, `created_at`, `updated_at`) VALUES
(1, NULL, 'ntd806@gmail.com', '+84098345560', 'Tiến Đạt Nguyễn', NULL, 1, 'HCM', '2021-11-22 04:04:42.194', '2021-11-22 04:04:42.194');

-- --------------------------------------------------------

--
-- Table structure for table `user_admins`
--

CREATE TABLE `user_admins` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `login_at` datetime(3) DEFAULT NULL,
  `status` int(3) NOT NULL DEFAULT 1,
  `created_at` datetime(3) DEFAULT current_timestamp(3),
  `updated_at` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_admins`
--

INSERT INTO `user_admins` (`id`, `user_name`, `password`, `token`, `login_at`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2b$10$ZJi38IcUR3A5kgQvKtqMu.FFhl.URb4lVC5rbOGfL/Le/ZkbrL8Ye', 'MqQMuvnnxDTkQVcD7Wu32ctHgCz9LCDQBcRR6O8iK2y4tO0eMmXrvMsIt7ug0bIVj6yUus9M70Nfh777AVd6BndGtklhdVLMiKHo', '2021-11-22 03:55:08.000', 1, '2021-11-22 03:55:08.000', '2021-12-01 11:24:32.067');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bankaccounts`
--
ALTER TABLE `bankaccounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversion_rates`
--
ALTER TABLE `conversion_rates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_users`
--
ALTER TABLE `login_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matcheshistories`
--
ALTER TABLE `matcheshistories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transfershistories`
--
ALTER TABLE `transfershistories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_admins`
--
ALTER TABLE `user_admins`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bankaccounts`
--
ALTER TABLE `bankaccounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conversion_rates`
--
ALTER TABLE `conversion_rates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_users`
--
ALTER TABLE `login_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `matcheshistories`
--
ALTER TABLE `matcheshistories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transfershistories`
--
ALTER TABLE `transfershistories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_admins`
--
ALTER TABLE `user_admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
