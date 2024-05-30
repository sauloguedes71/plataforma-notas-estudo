-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: escola
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aluno` (
  `N_matricula` int(11) NOT NULL AUTO_INCREMENT,
  `id_turma` int(11) DEFAULT NULL,
  `nome_aluno` varchar(50) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `sexo` enum('M','F','Outro') DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `rg` varchar(12) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `nome_pai` varchar(50) DEFAULT NULL,
  `cpf_pai` varchar(14) DEFAULT NULL,
  `nome_mae` varchar(50) DEFAULT NULL,
  `cpf_mae` varchar(14) DEFAULT NULL,
  `certidao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`N_matricula`),
  KEY `fk_aluno_turma` (`id_turma`),
  CONSTRAINT `fk_aluno_turma` FOREIGN KEY (`id_turma`) REFERENCES `turma` (`id_turma`)
) ENGINE=InnoDB AUTO_INCREMENT=20220008 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aulas`
--

DROP TABLE IF EXISTS `aulas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aulas` (
  `id_aula` int(11) NOT NULL AUTO_INCREMENT,
  `data_aulas` date NOT NULL,
  `horario_inicio` time DEFAULT NULL,
  `horario_termino` time DEFAULT NULL,
  `id_materia` int(11) DEFAULT NULL,
  `id_turma` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_aula`),
  KEY `id_materia` (`id_materia`),
  KEY `id_turma` (`id_turma`),
  CONSTRAINT `aulas_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id_materia`),
  CONSTRAINT `aulas_ibfk_2` FOREIGN KEY (`id_turma`) REFERENCES `turma` (`id_turma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `faltas`
--

DROP TABLE IF EXISTS `faltas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faltas` (
  `id_faltas` int(11) NOT NULL AUTO_INCREMENT,
  `N_matricula` int(11) DEFAULT NULL,
  `id_aula` int(11) DEFAULT NULL,
  `data_faltas` date DEFAULT NULL,
  `justificativa` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_faltas`),
  KEY `id_aula` (`id_aula`),
  KEY `faltas_ibfk_1` (`N_matricula`),
  CONSTRAINT `faltas_ibfk_1` FOREIGN KEY (`N_matricula`) REFERENCES `aluno` (`N_matricula`),
  CONSTRAINT `faltas_ibfk_4` FOREIGN KEY (`id_aula`) REFERENCES `aulas` (`id_aula`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materia` (
  `id_materia` int(11) NOT NULL AUTO_INCREMENT,
  `id_professor` int(11) DEFAULT NULL,
  `nome_materia` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_materia`),
  KEY `fk_id_professor` (`id_professor`),
  CONSTRAINT `fk_id_professor` FOREIGN KEY (`id_professor`) REFERENCES `professor` (`id_professor`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nota`
--

DROP TABLE IF EXISTS `nota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nota` (
  `id_nota` int(11) NOT NULL AUTO_INCREMENT,
  `N_matricula` int(11) DEFAULT NULL,
  `id_materia` int(11) DEFAULT NULL,
  `nota` float(4,2) DEFAULT NULL,
  `data_nota` date DEFAULT NULL,
  PRIMARY KEY (`id_nota`),
  KEY `id_materia` (`id_materia`),
  KEY `nota_ibfk_1` (`N_matricula`),
  CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`N_matricula`) REFERENCES `aluno` (`N_matricula`),
  CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id_materia`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professor` (
  `id_professor` int(11) NOT NULL AUTO_INCREMENT,
  `nome_professor` varchar(50) DEFAULT NULL,
  `data_nascimento` date NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `rg` varchar(20) DEFAULT NULL,
  `endereco_residencial` varchar(255) DEFAULT NULL,
  `telefone_fixo` varchar(15) DEFAULT NULL,
  `telefone_celular` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nivel_formacao` varchar(50) NOT NULL,
  `instituicao_formacao` varchar(255) NOT NULL,
  `cursos_complementares` text DEFAULT NULL,
  `areas_especializacao` varchar(255) DEFAULT NULL,
  `data_admissao` date NOT NULL,
  `carga_horaria` int(11) NOT NULL,
  `disciplinas_lecionadas` text DEFAULT NULL,
  `horario_trabalho` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_professor`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `turma`
--

DROP TABLE IF EXISTS `turma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turma` (
  `id_turma` int(11) NOT NULL AUTO_INCREMENT,
  `nome_turma` varchar(15) NOT NULL,
  PRIMARY KEY (`id_turma`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `email` varchar(100) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `senha` varchar(25) DEFAULT NULL CHECK (octet_length(`senha`) >= 8),
  `permissao` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-22 23:12:48
