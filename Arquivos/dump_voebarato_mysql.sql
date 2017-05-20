/*
SQLyog Ultimate v9.20 
MySQL - 5.7.18 : Database - voebarato
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`voebarato` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `voebarato`;

/*Table structure for table `tb_aeroporto` */

DROP TABLE IF EXISTS `tb_aeroporto`;

CREATE TABLE `tb_aeroporto` (
  `cod_aeroporto` int(11) NOT NULL AUTO_INCREMENT,
  `des_aeroporto_completo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `des_aeroporto_abreviado` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cod_aeroporto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `tb_configuracao` */

DROP TABLE IF EXISTS `tb_configuracao`;

CREATE TABLE `tb_configuracao` (
  `dat_inicio` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dat_fim` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aeroporto_origem` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aeroporto_destino` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `tb_dados_voo` */

DROP TABLE IF EXISTS `tb_dados_voo`;

CREATE TABLE `tb_dados_voo` (
  `cod_id` int(11) NOT NULL AUTO_INCREMENT,
  `des_empresa_aviacao` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `des_cidade_origem` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `des_cidade_destino` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dat_ida` date DEFAULT NULL,
  `dat_chegada` date DEFAULT NULL,
  `dat_volta` date DEFAULT NULL,
  `dat_volta_chegada` date DEFAULT NULL,
  `val_preco_com_taxa` double DEFAULT NULL,
  `val_preco_sem_taxa` double DEFAULT NULL,
  PRIMARY KEY (`cod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `tb_voo_dia` */

DROP TABLE IF EXISTS `tb_voo_dia`;

CREATE TABLE `tb_voo_dia` (
  `cod_id` int(11) NOT NULL AUTO_INCREMENT,
  `des_empresa` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `menorPreco` double DEFAULT NULL,
  `origem` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destino` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aeroportoOrigem` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aeroportoDestino` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dataIda` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=396 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
