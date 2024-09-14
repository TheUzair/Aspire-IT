-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: aspireit_db
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('8504e4d12407');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1,'2024-07-10','on-time'),(2,2,'2024-07-11','on-time'),(3,3,'2024-07-12','on-time'),(4,4,'2024-07-13','on-time'),(5,5,'2024-07-14','on-time'),(6,6,'2024-07-15','on-time'),(7,7,'2024-07-16','on-time'),(8,8,'2024-07-17','on-time'),(9,9,'2024-07-18','on-time'),(10,10,'2024-07-19','on-time'),(11,1,'2024-07-20','late attendance'),(12,2,'2024-07-21','late attendance'),(13,3,'2024-07-22','late attendance'),(14,4,'2024-07-23','late attendance'),(15,5,'2024-07-24','late attendance'),(16,6,'2024-07-25','late attendance'),(17,7,'2024-07-26','late attendance'),(18,8,'2024-07-27','late attendance'),(19,9,'2024-07-28','late attendance'),(20,10,'2024-07-29','late attendance'),(21,1,'2024-07-30','not-present'),(22,2,'2024-07-31','not-present'),(23,3,'2024-08-01','not-present'),(24,4,'2024-08-02','not-present'),(25,5,'2024-08-03','not-present'),(26,6,'2024-08-04','not-present'),(27,7,'2024-08-05','not-present'),(28,8,'2024-08-06','not-present'),(29,9,'2024-08-07','not-present'),(30,10,'2024-08-08','not-present'),(31,1,'2024-08-09','not-present'),(32,2,'2024-08-10','on-time'),(33,3,'2024-08-11','on-time'),(34,4,'2024-08-12','on-time'),(35,5,'2024-08-13','on-time'),(36,6,'2024-08-14','on-time'),(37,7,'2024-08-15','on-time'),(38,8,'2024-08-16','on-time'),(39,9,'2024-08-17','on-time'),(41,1,'2024-08-19','take day-off'),(42,2,'2024-08-20','on-time'),(43,3,'2024-08-21','on-time'),(44,4,'2024-08-22','on-time'),(45,5,'2024-08-23','on-time'),(46,6,'2024-08-24','on-time'),(47,7,'2024-08-25','on-time'),(48,8,'2024-08-26','on-time'),(49,9,'2024-08-27','on-time'),(51,1,'2024-08-29','take day-off'),(52,2,'2024-08-30','on-time'),(53,3,'2024-08-31','on-time'),(54,4,'2024-09-01','on-time'),(55,5,'2024-09-02','on-time'),(56,6,'2024-09-03','on-time'),(57,7,'2024-09-04','on-time'),(58,8,'2024-09-05','on-time'),(59,9,'2024-09-06','on-time'),(61,1,'2024-09-08','on-time'),(103,2,'2024-10-20','on-time'),(104,3,'2024-10-21','late attendance'),(105,4,'2024-10-22','not-present'),(106,12,'2024-07-11','on-time'),(107,1,'2024-08-29','take day-off'),(108,2,'2024-08-30','on-time'),(109,3,'2024-08-31','on-time'),(110,4,'2024-09-01','on-time'),(111,5,'2024-09-02','on-time'),(112,6,'2024-09-03','on-time'),(113,7,'2024-09-04','on-time'),(114,8,'2024-09-05','on-time'),(115,9,'2024-09-06','on-time'),(116,1,'2024-09-07','late attendance'),(117,2,'2024-09-08','on-time'),(118,3,'2024-09-09','not-present'),(119,4,'2024-09-10','on-time'),(120,5,'2024-09-11','take day-off'),(121,6,'2024-09-12','on-time'),(122,7,'2024-09-12','late attendance'),(123,8,'2024-09-12','not-present'),(124,9,'2024-09-12','on-time');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `caregiver`
--

LOCK TABLES `caregiver` WRITE;
/*!40000 ALTER TABLE `caregiver` DISABLE KEYS */;
INSERT INTO `caregiver` VALUES (1,'Ravi Kumar','active'),(2,'Sita Devi','registered'),(3,'Pooja Sharma','active'),(4,'Rajesh Singh','registered'),(5,'Anjali Patel','inactive'),(6,'Rahul Gupta','active'),(7,'Priya Jain','registered'),(8,'Amit Kumar','active'),(9,'Sonia Singh','registered'),(10,'Rohan Sharma','inactive'),(11,'Neha Patel','active'),(12,'Vikas Gupta','registered'),(13,'Sachin Jain','active'),(14,'Riya Singh','registered'),(15,'Amita Sharma','inactive'),(16,'Raj Kumar','active'),(17,'Suman Devi','registered'),(18,'Preeti Patel','active'),(19,'Rakesh Singh','registered'),(20,'Anita Gupta','inactive'),(21,'Ravina Kumar','registered');
/*!40000 ALTER TABLE `caregiver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `child`
--

LOCK TABLES `child` WRITE;
/*!40000 ALTER TABLE `child` DISABLE KEYS */;
INSERT INTO `child` VALUES (1,'Aarav',5,'active',2024),(2,'Vivaan',6,'inactive',2024),(3,'Ishaan',5,'active',2024),(4,'Aadhya',4,'inactive',2024),(5,'Ananya',5,'active',2024),(6,'Maya',6,'registered',2024),(7,'Arjun',4,'registered',2024),(8,'Saanvi',5,'active',2024),(9,'Kabir',6,'registered',2024),(10,'Nisha',4,'active',2024),(11,'Aryan',5,'active',2023),(12,'Kiara',6,'inactive',2023),(13,'Vihaan',5,'active',2023),(14,'Myra',4,'registered',2023),(15,'Rohan',6,'registered',2023),(16,'Sia',5,'active',2023),(17,'Ishita',4,'active',2023),(18,'Tanmay',6,'inactive',2023),(19,'Aisha',5,'registered',2023),(20,'Kavin',4,'active',2023),(21,'Ranbir',6,'inactive',2023);
/*!40000 ALTER TABLE `child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
INSERT INTO `enrollment` VALUES (1,1,'2024-07-10 00:00:00','Program A'),(2,2,'2024-07-11 00:00:00','Program A'),(3,3,'2024-07-12 00:00:00','Program A'),(4,4,'2024-07-13 00:00:00','Program A'),(5,5,'2024-07-14 00:00:00','Program A'),(6,6,'2024-07-15 00:00:00','Program A'),(7,7,'2024-07-16 00:00:00','Program A'),(8,8,'2024-07-17 00:00:00','Program A'),(9,9,'2024-07-18 00:00:00','Program A'),(10,10,'2024-07-19 00:00:00','Program A'),(11,1,'2024-07-20 00:00:00','Program A'),(12,2,'2024-07-21 00:00:00','Program A'),(13,3,'2024-07-22 00:00:00','Program A'),(14,4,'2024-07-23 00:00:00','Program A'),(15,5,'2024-07-24 00:00:00','Program A'),(16,6,'2024-07-25 00:00:00','Program A'),(17,7,'2024-07-26 00:00:00','Program A'),(18,8,'2024-07-27 00:00:00','Program A'),(19,9,'2024-07-28 00:00:00','Program A'),(20,10,'2024-07-29 00:00:00','Program A'),(21,1,'2024-07-30 00:00:00','Program A'),(22,2,'2024-07-31 00:00:00','Program A'),(23,3,'2024-08-01 00:00:00','Program A'),(24,4,'2024-08-02 00:00:00','Program A'),(25,5,'2024-08-03 00:00:00','Program A'),(26,6,'2024-08-04 00:00:00','Program A'),(27,7,'2024-08-05 00:00:00','Program A'),(28,8,'2024-08-06 00:00:00','Program A'),(29,9,'2024-08-07 00:00:00','Program A'),(30,10,'2024-08-08 00:00:00','Program A'),(31,1,'2024-08-09 00:00:00','Program A'),(32,2,'2024-08-10 00:00:00','Program A'),(33,3,'2024-08-11 00:00:00','Program A'),(34,4,'2024-08-12 00:00:00','Program A'),(35,5,'2024-08-13 00:00:00','Program A'),(36,6,'2024-08-14 00:00:00','Program A'),(37,7,'2024-08-15 00:00:00','Program A'),(38,8,'2024-08-16 00:00:00','Program A'),(39,9,'2024-08-17 00:00:00','Program A'),(40,10,'2024-08-18 00:00:00','Program A'),(41,1,'2024-08-19 00:00:00','Program A'),(42,2,'2024-08-20 00:00:00','Program A'),(43,3,'2024-08-21 00:00:00','Program A'),(44,4,'2024-08-22 00:00:00','Program A'),(45,5,'2024-08-23 00:00:00','Program A'),(46,6,'2024-08-24 00:00:00','Program A'),(47,7,'2024-08-25 00:00:00','Program A'),(48,8,'2024-08-26 00:00:00','Program A'),(49,9,'2024-08-27 00:00:00','Program A'),(50,10,'2024-08-28 00:00:00','Program A'),(51,1,'2024-08-29 00:00:00','Program A'),(52,2,'2024-08-30 00:00:00','Program A'),(53,3,'2024-08-31 00:00:00','Program A'),(54,4,'2024-09-01 00:00:00','Program A'),(55,5,'2024-09-02 00:00:00','Program A'),(56,6,'2024-09-03 00:00:00','Program A'),(57,7,'2024-09-04 00:00:00','Program A'),(58,8,'2024-09-05 00:00:00','Program A'),(59,9,'2024-09-06 00:00:00','Program A'),(60,10,'2024-09-07 00:00:00','Program A'),(61,1,'2024-09-08 00:00:00','Program A'),(64,1,'2024-07-03 00:00:00','Program A');
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `financial`
--

LOCK TABLES `financial` WRITE;
/*!40000 ALTER TABLE `financial` DISABLE KEYS */;
INSERT INTO `financial` VALUES (1,1,898.97,'2024-07-10 00:00:00','Sports activities'),(2,2,605.00,'2024-07-11 00:00:00','Monthly fee'),(3,3,128.02,'2024-07-12 00:00:00','Sports activities'),(4,4,906.71,'2024-07-13 00:00:00','Extra classes'),(5,5,80.42,'2024-07-14 00:00:00','Monthly fee'),(6,6,952.52,'2024-07-15 00:00:00','Medical expenses'),(7,7,30.09,'2024-07-16 00:00:00','Extra classes'),(8,8,689.56,'2024-07-17 00:00:00','Medical expenses'),(9,9,352.18,'2024-07-18 00:00:00','Sports activities'),(10,10,556.57,'2024-07-19 00:00:00','Field trip'),(11,1,16.62,'2024-07-20 00:00:00','Field trip'),(12,2,302.31,'2024-07-21 00:00:00','Field trip'),(13,3,736.40,'2024-07-22 00:00:00','Field trip'),(14,4,749.52,'2024-07-23 00:00:00','Field trip'),(15,5,78.72,'2024-07-24 00:00:00','Field trip'),(16,6,60.69,'2024-07-25 00:00:00','Monthly fee'),(17,7,729.37,'2024-07-26 00:00:00','Extra classes'),(18,8,711.46,'2024-07-27 00:00:00','Monthly fee'),(19,9,223.56,'2024-07-28 00:00:00','Sports activities'),(20,10,675.72,'2024-07-29 00:00:00','Monthly fee'),(21,1,21.07,'2024-07-30 00:00:00','Field trip'),(22,2,441.26,'2024-07-31 00:00:00','Medical expenses'),(23,3,731.55,'2024-08-01 00:00:00','Extra classes'),(24,4,610.16,'2024-08-02 00:00:00','Field trip'),(25,5,60.74,'2024-08-03 00:00:00','Extra classes'),(26,6,385.15,'2024-08-04 00:00:00','Monthly fee'),(27,7,172.27,'2024-08-05 00:00:00','Monthly fee'),(28,8,382.79,'2024-08-06 00:00:00','Sports activities'),(29,9,971.67,'2024-08-07 00:00:00','Medical expenses'),(30,10,398.62,'2024-08-08 00:00:00','Extra classes'),(31,1,654.37,'2024-08-09 00:00:00','Monthly fee'),(32,2,587.01,'2024-08-10 00:00:00','Medical expenses'),(33,3,292.79,'2024-08-11 00:00:00','Sports activities'),(34,4,573.71,'2024-08-12 00:00:00','Medical expenses'),(35,5,991.66,'2024-08-13 00:00:00','Medical expenses'),(36,6,842.88,'2024-08-14 00:00:00','Sports activities'),(37,7,655.60,'2024-08-15 00:00:00','Field trip'),(38,8,690.03,'2024-08-16 00:00:00','Monthly fee'),(39,9,501.62,'2024-08-17 00:00:00','Extra classes'),(40,10,498.86,'2024-08-18 00:00:00','Field trip'),(41,1,365.11,'2024-08-19 00:00:00','Medical expenses'),(42,2,739.54,'2024-08-20 00:00:00','Sports activities'),(43,3,305.43,'2024-08-21 00:00:00','Sports activities'),(44,4,466.45,'2024-08-22 00:00:00','Sports activities'),(45,5,69.36,'2024-08-23 00:00:00','Extra classes'),(46,6,954.36,'2024-08-24 00:00:00','Medical expenses'),(47,7,476.58,'2024-08-25 00:00:00','Sports activities'),(48,8,358.46,'2024-08-26 00:00:00','Monthly fee'),(49,9,808.88,'2024-08-27 00:00:00','Field trip'),(50,10,32.44,'2024-08-28 00:00:00','Extra classes'),(51,1,755.34,'2024-08-29 00:00:00','Medical expenses'),(52,2,551.65,'2024-08-30 00:00:00','Monthly fee'),(53,3,738.09,'2024-08-31 00:00:00','Medical expenses'),(54,4,152.61,'2024-09-01 00:00:00','Field trip'),(55,5,280.44,'2024-09-02 00:00:00','Monthly fee'),(56,6,314.54,'2024-09-03 00:00:00','Extra classes'),(57,7,591.71,'2024-09-04 00:00:00','Medical expenses'),(58,8,843.86,'2024-09-05 00:00:00','Sports activities'),(59,9,532.73,'2024-09-06 00:00:00','Monthly fee'),(60,10,834.26,'2024-09-07 00:00:00','Sports activities'),(61,1,356.80,'2024-09-08 00:00:00','Monthly fee'),(62,12,950.00,'2024-07-10 00:00:00','Tuition Fee');
/*!40000 ALTER TABLE `financial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'testuser','scrypt:32768:8:1$MXyqLR70WfpsUKGp$b90e4ad8a8a78ed9ef28634cdc9d5202349c4d8f8eb04794cf0078cd4d395e8177a04edb8476e7aae6d2888180cbe519ddfb10fa020b30b2b70322ee47719cc6'),(2,'user123@','scrypt:32768:8:1$5wL6Bhv61VT5p15a$ecbe904be5452990f5bc48561ff2e00d2710a2a120ae3d1a1a2bd6a25a5946acd12c9175dc29ca842bda0e77f1cefe7dbcdd08c1470bd4ada7fb77f7d1cd4a8a'),(3,'rohan123@','scrypt:32768:8:1$GUJ71Vo0N0EoO0ut$f0678763b10481ac6ebac6db1a50ebaea49da5b94ea330197b576ab959c78bfb330b65de7f8038448a69a2ee6ac241d7fcdb725254df8780183e5b7b1a07a873'),(4,'user1234@','scrypt:32768:8:1$XlBNvhhF7tsdRcMu$7659e430c1c05d81c0864936eeaf6bb49984f2a86d404491afee778d85bc7963f079d8ea0645155abe940d3b0dcf26c91a2e519269c13c6412d9564a996590b6'),(5,'user12345@','scrypt:32768:8:1$8JTPIhYnXmKYgOKo$60621d562218dde588657c39ba859c36ac8c2265e7f357bf3fddb6dad0dc2d294e4fd8142a4927f0b4080c5ba1af9d4a64db8bc6a5ad455316eafc738ae036f5'),(6,'user123456@','scrypt:32768:8:1$9za9Bm6JykWSuJOW$962d8a7b750a1bc4f0278eabbc733d1c4779427531be10ae8012122ca75af4e2d508f174ef8ed389e2050b186434bf05a5da4b4119b1533635a15c7f00b832c3'),(7,'user12@','scrypt:32768:8:1$nFDOA7RhVFCfKPsp$1ba835941b89b0cbf72684e7d834770a8b41f6cb41bb4a5f16c16886d105d375b44c823b227429ef9c2471d3440dd869cd4cbc8461ca4ef2ec655eae14cfa103'),(8,'user1@','scrypt:32768:8:1$kgcqVtmnJkONpId0$c687da85ccf993a5b616b273be27046bb812920c3421871533b04b7d25d3eca880464f9806380e335257b1d5a13b3a0ab9e7877f889bccc09bee4f199af2b82a'),(9,'user@','scrypt:32768:8:1$TFWpuMuJREPNCaku$0212ebf04a4af50a58f5268a368acf671b16306499c212c778e2f7d0ca5da0dd13f0167359ceeedac9c39ecb1692420fd313f1e8783fc3d7a86779a35bc9aaa5'),(10,'user@@','scrypt:32768:8:1$d3UMZJWYZhd5aAJW$a6ba66c8b66845eb867a6b9ee7f1652fed214788543a9694a83d8576de2fed5b3d7218c03c7d9dfca7bdf15f366c321ba55d4ea57ddcf83fc21cdd613d6990d5'),(11,'userr@','scrypt:32768:8:1$hCqcNOgDqmQwC9tm$7791589ed68a45968985f8579288ff44e0390503280cf7a79b2d9eb11ab69f84e1b6d1b62078cc2ef9f0c4419369116ac9ac14179fc86531eae9086fe86ea7c0'),(12,'qwerty','scrypt:32768:8:1$SzgNU8g6c5JqXDZe$da0cba620898ac2aaf90e0485a0e6ff78fb7b2cec53a64dc53ba19dbb71cf90ee426b71eed0edcac2dbb09376e99a5b6c61b2336c274852159ecd1d1fb168bac'),(13,'poco@','scrypt:32768:8:1$kPMrjNYdONT3G0qK$e0835c66148781c891b6407522abb5a763948148db23c04dbc30a356abc5710447883ab22043256eede341b193429e5d32578ce0706fec786f5298b7a822d367'),(14,'user12344@','scrypt:32768:8:1$Bj4VVU3l5EXBYpUs$e2097de0dedccee666a4de3e3ec3bf39676fffc6cee7dc20b00fba9f9f42a3667d131be4e93bae9fe5c119218c473eaf2bfce97b9361901bc17452248a610a23');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'aspireit_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `generate_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `generate_data`()
BEGIN
    DECLARE start_date DATE;
    DECLARE end_date DATE;
    DECLARE child_id INT DEFAULT 1;
    DECLARE desc_id INT;
    DECLARE total_descriptions INT;

    SET start_date = CURDATE() - INTERVAL 60 DAY;
    SET end_date = CURDATE();

    -- Get the total number of descriptions
    SELECT COUNT(*) INTO total_descriptions FROM temp_descriptions;

    -- Loop to insert attendance data
    WHILE start_date <= end_date DO
        INSERT INTO attendance (child_id, date, status)
        VALUES (child_id, start_date, FLOOR(RAND() * 2));

        -- Randomly select a description
        SET desc_id = FLOOR(RAND() * total_descriptions) + 1;
        INSERT INTO financial (child_id, amount, date, description)
        SELECT child_id, ROUND(RAND() * 1000, 2), start_date, description
        FROM temp_descriptions
        WHERE id = desc_id;

        INSERT INTO enrollment (child_id, date, program)
        VALUES (child_id, start_date, 'Program A');

        SET child_id = child_id + 1;
        IF child_id > 10 THEN
            SET child_id = 1;
        END IF;
        
        SET start_date = start_date + INTERVAL 1 DAY;
    END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-14 11:12:21
