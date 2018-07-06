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
-- Table structure for table `business_info`
--

DROP TABLE IF EXISTS `business_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business_info` (
  `Username` char(100) NOT NULL,
  `Password` varchar(120) NOT NULL,
  `Shopname` char(50) NOT NULL,
  `Phonenum` char(20) NOT NULL,
  `accessKey` varchar(120) NOT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_info`
--

LOCK TABLES `business_info` WRITE;
/*!40000 ALTER TABLE `business_info` DISABLE KEYS */;
INSERT INTO `business_info` VALUES ('\"abc\"','$2a$10$8qf./bQB.KNChbs6JS5OiOGL7xIN6zbd2SzlKmF6bEqxylDIxR5/m','\"helloworld\"','\"123\"',''),('123','$2a$10$jRRTcHp6/fzGh5G9cg3.q.UVXS87OlW4U/80XSRSBIiopeFaoPBDS','123','123','$2a$04$djiGkIiCUz/X0/Kgnh87...KqMorKtlqlhClQYSwkVavKPyS7X2Sq'),('ojxf_0AsqbzLf7RAJRncnIGopDbw','$2a$10$EFG6NP34/dv7FiFDA.GyVeAtL4ZD0i3xcIu6EThZyIDasNrQzG1va','ljl','18918918918','$2a$04$ItvKoCe0nXlsDMS/yZ01Vuq3pn.7ZAucs3CZLDPzx08g5ezrzpcZu'),('ojxf_0GFPn4WMjQJ87snxD0lXV-8','$2a$10$vhdu38xuZS0H5GDzvdboI.JeJzsL0Pd4Ciwj9t4AqPEw/WfxxsWmC','618','13719175883','$2a$04$jyiDGUPgI3HS0USQbY4rZubTEWLNBa03HGqxykr6DkECNlCQFmmnS'),('ojxf_0HeOwRJXWcSB1KkMnlaKVhI','$2a$10$Y9WXfgBX5aXbYB5fSXKz4.Ja/NfFgPsEK3.cGFvVo7UPFNdbqoXpK','小二点餐','18802519963','$2a$04$gb8aU1pR58cVVDmPIIMLaefHviUbKOwZWLTyzNzglUU31zFQXbW3u'),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','$2a$10$fwJsBCIqsrFJW8C66axH/.xMzQJrRRMKMWSIsT4H9Cz8trl5R81xK','高品位','18802519963','$2a$04$mF9kT370H3.Y1aZzd3af7u2vvlHB5wmOU3uMDRnuDBDLbVAaeJVoy'),('sysu_duang','123456','卢家妈妈餐厅','19902519963','sadsdasdasdsadsa'),('undefined','$2a$10$HYW36yjrYAjSjtnX3fu4AOs/Ux03Vpc3JGQDQKRiq.9z.oPHGGEWC','lgx-shop','13719342739','$2a$04$c6rYYwlBJQDXW1TaEQTfY.M/J2rUTvN8aIYMm.KkKDe6kByQLjGW6'),('YoshiPark','123456','Yoshi','18802519963','');
/*!40000 ALTER TABLE `business_info` ENABLE KEYS */;
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
