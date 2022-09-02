-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 29 août 2022 à 20:39
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbcooptation`
--

-- --------------------------------------------------------

--
-- Structure de la table `cooptation`
--

CREATE TABLE `cooptation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pole_id` int(11) DEFAULT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cv` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `civility` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` int(11) NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `professional_experience` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_date` date DEFAULT NULL,
  `current_position` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_experience_date` date DEFAULT NULL,
  `fields_activity` tinyint(1) NOT NULL,
  `talan_values` tinyint(1) NOT NULL,
  `key_figures` tinyint(1) NOT NULL,
  `interview_date` date NOT NULL,
  `interview_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `geographical_wishes` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `comments` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `personality` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `skils` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `experience` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `fixed_desired_salary` double DEFAULT NULL,
  `variable_desired_salary` double DEFAULT NULL,
  `fixed_current_salary` double DEFAULT NULL,
  `variable_current_salary` double DEFAULT NULL,
  `disponibility_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `second_comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cooptation`
--

INSERT INTO `cooptation` (`id`, `user_id`, `pole_id`, `firstname`, `lastname`, `cv`, `civility`, `phone`, `link`, `email`, `professional_experience`, `application_date`, `current_position`, `first_experience_date`, `fields_activity`, `talan_values`, `key_figures`, `interview_date`, `interview_type`, `geographical_wishes`, `comments`, `personality`, `skils`, `experience`, `date`, `fixed_desired_salary`, `variable_desired_salary`, `fixed_current_salary`, `variable_current_salary`, `disponibility_date`, `second_comment`) VALUES
(5, 4, 1, 'Mohamed Ilyes', 'Dhieb', 'CV_Dhieb-ilyes-630cdf1679eb6.pdf', 'Homme', 56776046, 'Familial', 'ilyes.dhieb@gmail.com', 'epérience 2 ans', '2022-08-01', 'développeur java', '2021-03-02', 0, 0, 0, '2022-07-30', 'null', 'a:1:{i:0;s:7:\"Tunisie\";}', 'cooptation intéressante pour le pole recommandé', '', '', '', '2022-08-29', 1600, 200, 1500, 100, 'Dans un mois', ''),
(32, 4, 1, 'Hajjem', 'Habib', 'CV_Hajjem_Habib-62d59881d98de-630cdc629efb2.pdf', 'Homme', 22784122, 'Amitié', 'habib@gmail.com', '', '2022-07-31', 'développeur java', '2020-06-30', 0, 0, 0, '2022-08-14', 'rdv_cooptation', 'a:1:{i:0;s:7:\"Tunisie\";}', 'candidat intéressant ', 'esprit d\'équipe', '', '2 ans d\'expérience', '2022-08-29', 1800, 300, 1500, 200, 'Dans 2 mois', ''),
(33, 4, 3, 'Olfa', 'Ben Aissa', 'cv-Olfa-BenAissa-630ce13a4a467.pdf', 'Femme', 55147998, 'Professionnel', 'benaissaolfa@gmail.com', '', '2020-08-29', 'développeur mobile-web', '2019-07-30', 0, 0, 0, '2022-07-30', 'others', 'a:1:{i:0;s:6:\"France\";}', 'profil convenable', '', '', '', '2022-08-29', 2500, 200, 2000, 200, 'Dans 2 mois', ''),
(34, 4, 2, 'Sana', 'Bouden', 'CV_sana-bouden-630ce2512c779.pdf', 'Femme', 55987147, 'Professionnel', 'sanabouden@gmail.com', '6 ans d\'expérience', '2022-04-04', 'developpeur php', '2016-01-12', 1, 1, 1, '2022-08-01', 'rdv_cooptation', 'a:1:{i:0;s:6:\"France\";}', 'profil intéressant pour nos métiers', '', '', '', '2022-08-29', 2500, 300, 2000, 200, 'Dans 2 mois', ''),
(35, 4, 1, 'Oussema', 'Moussi', 'CV_oussema_moussi-630ce2ef8dc4d.pdf', 'Homme', 22121445, 'Réseaux sociaux', 'moussioussema@gmail.com', '', '2022-04-04', 'développeur java', '2017-04-28', 0, 0, 0, '2022-08-01', '', 'a:1:{i:0;s:7:\"Tunisie\";}', 'cooptation adaptée à nos besoins', '', '', '', '2022-08-29', 1800, 300, 1500, 300, 'Dans 3 mois', ''),
(36, 5, 1, 'Nasri', 'Lotfi', 'CV_Nasri_Lotfi-630ce45fe4c12.pdf', 'Homme', 98745555, 'Professionnel', 'lotfi.nasri@gmail.com', '', '2022-07-31', '', '2017-08-29', 0, 0, 0, '2022-08-10', 'rdv_cooptation', 'a:1:{i:0;s:7:\"Tunisie\";}', 'cooptation intéressante ', '', '', '', '2022-08-29', 1800, 300, 1500, 200, 'Dans une semaine', ''),
(37, 2, 1, 'Sadok', 'Ammar', 'cv_ammar_sadok-630cf6f5b1f44.pdf', 'Homme', 92784744, 'Amitié', 'ammar.sadok@gmail.com', '', '2022-04-27', 'développeur php-symfony', '2017-11-08', 1, 1, 0, '2022-06-27', 'rdv_cooptation', 'a:1:{i:0;s:7:\"Tunisie\";}', 'Bien', '', '', '', '2022-08-29', 2000, 300, 1700, 150, 'Dans 2 mois', ''),
(38, 2, 4, 'Asma', 'Ben Gabsia', 'cv_asma-bengabsia-630cf79247aef.pdf', 'Femme', 22154999, 'Amitié', 'asma.bengabsia@gmail.com', '', '2022-08-01', '', '2015-11-01', 1, 1, 1, '2022-08-10', 'rdv_cooptation', 'a:1:{i:0;s:6:\"France\";}', 'profil intéressant ', '', '', '', '2022-08-29', 1800, 200, 1500, 200, '', ''),
(39, 3, 1, 'Sonia', 'Ben abdelfattah', 'cv_sonia_benabdelfattah-630cfaceaf7cc.pdf', 'Femme', 92258888, 'Familial', 'sonia.baf@gmail.com', '', '2022-08-01', '', '2022-03-29', 1, 1, 1, '2022-08-01', 'others', 'a:1:{i:0;s:7:\"Tunisie\";}', 'bien', '', '', '', '2022-08-29', NULL, NULL, 1500, 200, '', ''),
(40, 1, 1, 'Yassin', 'Salem', 'cv_yassin_salem-630d00e634ded.pdf', 'Homme', 22784888, 'Familial', 'yassin.salem@gmail.com', '', '2022-08-01', '', '2022-08-01', 1, 1, 1, '2022-08-01', '', 'a:1:{i:0;s:7:\"Tunisie\";}', 'bien', '', '', '', '2022-08-29', NULL, NULL, NULL, NULL, '', ''),
(41, 3, 1, 'Latifa', 'Guesmi', 'cv_latifa_guesmi-630d01b2e9ccd.pdf', 'Femme', 22154444, 'Professionnel', 'latifa.guesmi@yahoo.fr', '', '2022-08-01', '', '2022-08-01', 1, 1, 1, '2022-08-01', '', 'a:1:{i:0;s:0:\"\";}', 'bien', '', '', '', '2022-08-29', 1500, 220, 1000, 200, '', ''),
(42, 2, 1, 'Asma', 'Zgolli', 'cv_asma_zgolli-630d023b02192.pdf', 'Femme', 55874999, 'Amitié', 'asma.zgolli@yahoo.fr', '', NULL, '', '2022-08-01', 1, 1, 1, '2022-08-01', '', 'a:1:{i:0;s:0:\"\";}', 'bien', '', '', '', '2022-08-29', NULL, NULL, NULL, NULL, '', '');

-- --------------------------------------------------------

--
-- Structure de la table `coopted_entity`
--

CREATE TABLE `coopted_entity` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `coopted_entity`
--

INSERT INTO `coopted_entity` (`id`, `name`) VALUES
(1, 'Talan Tunisie'),
(2, 'Talan France');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20220819110238', '2022-08-22 12:04:35', 4294);

-- --------------------------------------------------------

--
-- Structure de la table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `cooptation_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `history`
--

INSERT INTO `history` (`id`, `cooptation_id`, `status_id`, `date`) VALUES
(1, 5, 1, '2022-08-29 16:27:49'),
(71, 32, 2, '2022-08-29 17:33:54'),
(72, 33, 1, '2022-08-29 17:54:34'),
(73, 34, 1, '2022-08-29 17:59:13'),
(74, 35, 1, '2022-08-29 18:01:51'),
(75, 35, 2, '2022-08-29 18:02:04'),
(76, 36, 1, '2022-08-29 18:07:59'),
(77, 32, 1, '2022-08-29 19:12:49'),
(78, 37, 2, '2022-08-29 19:27:17'),
(79, 38, 1, '2022-08-29 19:29:54'),
(80, 33, 1, '2022-08-29 19:30:44'),
(81, 34, 2, '2022-08-29 19:30:48'),
(85, 39, 2, '2022-08-29 19:43:42'),
(86, 35, 5, '2022-08-29 19:56:58'),
(88, 40, 2, '2022-08-29 20:09:42'),
(89, 41, 2, '2022-08-29 20:13:06'),
(90, 38, 2, '2022-08-29 20:13:50'),
(91, 42, 2, '2022-08-29 20:15:23'),
(93, 42, 5, '2022-08-29 20:21:02'),
(94, 41, 5, '2022-08-29 20:21:07'),
(98, 42, 4, '2022-08-29 20:30:56');

-- --------------------------------------------------------

--
-- Structure de la table `pole`
--

CREATE TABLE `pole` (
  `id` int(11) NOT NULL,
  `coopted_entity_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `pole`
--

INSERT INTO `pole` (`id`, `coopted_entity_id`, `name`) VALUES
(1, 1, 'PHP'),
(2, 2, 'web'),
(3, 2, 'mobile'),
(4, 1, 'Java');

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'A soumettre'),
(2, 'En attente de validation'),
(3, 'Rejeté | Cooptation incomplète'),
(4, 'Rejeté | Non adapté à nos métiers'),
(5, 'En cours d\'évaluation'),
(6, 'Désistement en cours de process'),
(7, 'Négatif'),
(8, 'En cours d\'évaluation - RDV MNG 1'),
(9, 'En cours d\'évaluation - RDV MNG 2'),
(10, 'Vivier'),
(11, 'Proposition signé'),
(12, 'Contrat signé'),
(13, 'Désistement après proposition'),
(14, 'Désistement après signature'),
(15, 'Embauché | PE à confirmer'),
(16, 'Embauché | PE renouvelée confirmée'),
(17, 'Embauché | PE confirmée');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `pole_id` int(11) DEFAULT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `pole_id`, `email`, `name`, `roles`, `password`) VALUES
(1, 1, 'o.mahsni@talan.com', 'Ons', '[\"ROLE_ADMIN\"]', '$argon2id$v=19$m=65536,t=4,p=1$Z081YW1uMVVGSi5CWVhMRA$R3Gn8v6H68UY3DFCw6/kEOnUYMBSBkOIDTZXY1vXYUE'),
(2, 1, 'h.hajjem@talan.com', 'habib', '[\"ROLE_USER\"]', '$argon2id$v=19$m=65536,t=4,p=1$dEJNR0k0Mk00Ukh1dGdXYw$Kq+bD2a0B239IzAkNWcEs2egFqRXMLpQ4g7t/RXlvaY'),
(3, 1, 's.cherni@talan.com', 'samar', '[\"ROLE_USER\"]', '$argon2id$v=19$m=65536,t=4,p=1$bjRyNGxkN3BtMFdiRkR5Ug$mgh/GV6yJIQf/uttrneOul5M1XrDXGo0kJtGwkepP1A'),
(4, 1, 'k.daghrir@talan.com', 'kenza', '[\"ROLE_USER\"]', '$argon2id$v=19$m=65536,t=4,p=1$Q2tzOE1IL0VZcG5oSE9VYw$13O5Gp7RmU2mbt3hsgLzfb0JTinSmUc4W6aDs6v8VCY'),
(5, 1, 'ma.zouai@talan.com', 'MohamedAli', '[\"ROLE_MANAGER\"]', '$argon2id$v=19$m=65536,t=4,p=1$VW8vMlE4a29sSC5jQmc3bg$m4pN7FewQ6PpnEpS1eNqEJP2DJaXLRWjPgYepAsxK/U');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cooptation`
--
ALTER TABLE `cooptation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_60F61635A76ED395` (`user_id`),
  ADD KEY `IDX_60F61635419C3385` (`pole_id`);

--
-- Index pour la table `coopted_entity`
--
ALTER TABLE `coopted_entity`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_27BA704BCA700D5` (`cooptation_id`),
  ADD KEY `IDX_27BA704B6BF700BD` (`status_id`);

--
-- Index pour la table `pole`
--
ALTER TABLE `pole`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_FD6042E1A7607E37` (`coopted_entity_id`);

--
-- Index pour la table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`),
  ADD KEY `IDX_8D93D649419C3385` (`pole_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cooptation`
--
ALTER TABLE `cooptation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `coopted_entity`
--
ALTER TABLE `coopted_entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT pour la table `pole`
--
ALTER TABLE `pole`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cooptation`
--
ALTER TABLE `cooptation`
  ADD CONSTRAINT `FK_60F61635419C3385` FOREIGN KEY (`pole_id`) REFERENCES `pole` (`id`),
  ADD CONSTRAINT `FK_60F61635A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `FK_27BA704B6BF700BD` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `FK_27BA704BCA700D5` FOREIGN KEY (`cooptation_id`) REFERENCES `cooptation` (`id`);

--
-- Contraintes pour la table `pole`
--
ALTER TABLE `pole`
  ADD CONSTRAINT `FK_FD6042E1A7607E37` FOREIGN KEY (`coopted_entity_id`) REFERENCES `coopted_entity` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D649419C3385` FOREIGN KEY (`pole_id`) REFERENCES `pole` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
