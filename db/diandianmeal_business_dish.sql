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
-- Table structure for table `business_dish`
--

DROP TABLE IF EXISTS `business_dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business_dish` (
  `Username` char(100) NOT NULL,
  `Dishname` char(50) NOT NULL,
  `DishOldprice` double DEFAULT NULL,
  `Dishprice` double NOT NULL,
  `Dishimage` varchar(120) DEFAULT NULL,
  `Dishdescription` varchar(45) NOT NULL,
  `Dishtypename` varchar(20) NOT NULL,
  `Dishtype` int(11) NOT NULL,
  PRIMARY KEY (`Username`,`Dishname`,`Dishtypename`),
  KEY `NameIndex` (`Dishname`),
  KEY `DishpriceIndex` (`Dishprice`),
  CONSTRAINT `BDUsername` FOREIGN KEY (`Username`) REFERENCES `business_info` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_dish`
--

LOCK TABLES `business_dish` WRITE;
/*!40000 ALTER TABLE `business_dish` DISABLE KEYS */;
INSERT INTO `business_dish` VALUES ('ojxf_0AsqbzLf7RAJRncnIGopDbw','粤菜菜品1',10,8,'1530006499506.png','粤菜菜品1介绍','粤菜',0),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','Test',0,0,NULL,'good','新德里',8),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','VC无限橙果汁',10,8,'1502416625877.jpg','好喝','冰爽饮品限时特惠',0),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','八宝酱菜',4,4,'1502416625878.jpg','好吃','热销榜',3),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','加多宝',6,6,'1502416625880.jpg','好喝','果拼果汁',1),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','南瓜粥',9,9,'1502416625881.jpg','好吃','热销榜',3),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','娃娃菜炖豆腐',17,17,'1502416625882.jpg','好吃','精选热菜',4),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','扁豆焖面',14,14,'1502416625884.jpg','好吃','热销榜',3),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','手撕包菜',16,16,'1502416625885.jpg','好吃','精选热菜',4),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','拍黄瓜',9,9,'1502416625886.jpg','好吃','爽口凉菜',2),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','牛肉馅饼',14,14,'1502416625889.jpg','好吃','热销榜',3),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','皮蛋瘦肉粥',12,10,'1502416625890.jpg','好吃','热销榜',3),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','皮蛋瘦肉粥',10,10,'1502416625891.jpg','好喝','特色粥品',5),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','皮蛋瘦肉粥套餐',32,32,'1502416625892.jpg','红豆薏米粥,三鲜干蒸烧卖,拍黄瓜','精选套餐',6),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','糊塌子',10,10,'1502416625894.jpg','好吃','热销榜',3),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','红枣山药粥套餐',36,29,'1502416625895.jpg','红枣山药糙米粥,素材包,爽口莴笋丝,四川泡菜或八宝酱菜,配菜可备注','单人精彩套餐',7),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','红枣山药糙米粥',10,10,'1502416625896.jpg','好吃','热销榜',3),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','红豆薏米粥套餐',37,37,'1502416625897.jpg','红豆薏米粥,三鲜干蒸烧卖,拍黄瓜','精选套餐',6),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','红豆薏米美肤粥',12,12,'1502416625898.jpg','好吃','热销榜',3),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','红豆薏米美肤粥',12,12,'1502416625899.jpg','好喝','特色粥品',5),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','葱花饼',10,10,'1502416625900.jpg','好吃','热销榜',3),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','蜜瓜圣女萝莉杯',6,6,'1502416625901.jpg','好喝','果拼果汁',1),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','香酥黄金鱼/3条',11,11,'1502416625902.jpg','好吃','精选热菜',4),('ol7Ht0DkjzWUMQIH_bT-_I4r5grQ','鲜蔬菌菇粥',11,11,'1502416625903.jpg','好喝','特色粥品',5),('undefined','Test',0,0,NULL,'good','a',0),('undefined','Test',0,0,NULL,'good','av',1),('undefined','Test',0,0,NULL,'good','avc',2);
/*!40000 ALTER TABLE `business_dish` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-26 19:41:56
