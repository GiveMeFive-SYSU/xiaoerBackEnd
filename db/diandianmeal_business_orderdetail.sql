-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: diandianmeal
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
-- Table structure for table `business_orderdetail`
--

DROP TABLE IF EXISTS `business_orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business_orderdetail` (
  `Username` char(100) NOT NULL,
  `Ordernumber` varchar(20) NOT NULL,
  `Dishname` char(50) NOT NULL,
  `Count` int(11) NOT NULL,
  `Tastenote` varchar(45) DEFAULT NULL,
  `Dishprice` double NOT NULL,
  KEY `ODOrdernumber_idx` (`Ordernumber`),
  KEY `BDDishname_idx` (`Dishname`),
  KEY `BDDishprice_idx` (`Dishprice`),
  KEY `ODUsername_idx` (`Username`),
  CONSTRAINT `BDDishname` FOREIGN KEY (`Dishname`) REFERENCES `business_dish` (`Dishname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BDDishprice` FOREIGN KEY (`Dishprice`) REFERENCES `business_dish` (`Dishprice`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ODOrdernumber` FOREIGN KEY (`Ordernumber`) REFERENCES `business_order` (`Ordernumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ODUsername` FOREIGN KEY (`Username`) REFERENCES `business_order` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_orderdetail`
--

LOCK TABLES `business_orderdetail` WRITE;
/*!40000 ALTER TABLE `business_orderdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `business_orderdetail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-26 19:41:55
