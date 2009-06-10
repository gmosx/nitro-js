-- MySQL dump 10.11
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	5.0.75-0ubuntu10.2-log

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
-- Create schema blog
--

CREATE DATABASE IF NOT EXISTS blog;
USE blog;

--
-- Table structure for table `Article`
--

DROP TABLE IF EXISTS `Article`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `Article` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `title` varchar(128) NOT NULL,
  `content` text NOT NULL,
  `categoryId` int(10) unsigned default NULL,
  `created` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `authorId` int(10) unsigned default NULL,
  `tagstring` varchar(128) default NULL,
  `summary` varchar(256) default NULL,
  `live` tinyint(1) default NULL,
  `updated` timestamp NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`id`),
  KEY `created` (`created`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='The blog articles';
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `Article`
--

LOCK TABLES `Article` WRITE;
/*!40000 ALTER TABLE `Article` DISABLE KEYS */;
INSERT INTO `Article` VALUES (1,'Wise words','<blockquote>\r\nThe truth points to itself...\r\n<br><br>\r\n<em><a title=\"Kosh Naranek is a character in the fictional universe of Babylon 5\" target=\"_blank\" href=\"http://en.wikipedia.org/wiki/Kosh_Naranek\">Kosh Naranek</a>, Vorlon ambassador\r\n</em></blockquote>',5,'2008-09-29 21:00:00',1,'dogma,SF','',1,'2008-09-29 21:00:00'),(2,'Apple Keyboard','Apple Design is a <a target=\"_blank\" href=\"http://en.wikipedia.org/wiki/Tautology_%28rhetoric%29\">tautology</a>. Over the years, Jonathan Ive\'s team introduced a series of iconic, ever more desirable gadgets. The pinnacle of this evolutionary process is arguably the <a title=\"Apple Keyboard\" href=\"http://www.apple.com/keyboard\">Apple Wireless Keyboard</a>. Here comes a birds-eye view:<br><br><a href=\"http://www.apple.com/keyboard\"><img  alt=\"Apple wireless keyboard\" title=\"Apple wireless keyboard\" style=\"width: 800px; height: 501px;\" src=\"http://farm4.static.flickr.com/3073/2904688101_0767f61932_o.jpg\"></a><br><br>The side view is even more impressive:<br><br><a href=\"http://www.apple.com/keyboard\"><img  alt=\"Apple wireless keyboard\" title=\"Apple wireless keyboard\" style=\"width: 800px; height: 501px;\" src=\"http://farm4.static.flickr.com/3293/2904688259_4ba3b32b81_o.jpg\"></a><br><br>One can only stand in awe in front of the elusive simplicity, the futuristic curves, the tactile feel of the keys. <strong>Function truly meets form here</strong>.',1,'2008-09-30 21:00:00',1,'Apple,design,gadget','',1,'2008-09-30 21:00:00'),(4,'Finance and Haskell','Lately, I feel more and more interested in finance. I mean the whole\r\nstory: reading articles and books about investment science, math for\r\nfinance, trading systems, portfolio optimization, the stock market,\r\naccounting etc. Very fascinating stuff.<br><br>At the same time I am experimenting with <a href=\"http://www.haskell.org/\">Haskell</a>, the canonical pure functional programming language. Thanks to the beta chapters of the <a href=\"http://book.realworldhaskell.org/\">Real World Haskell book</a> I was able to finally \'get it\'. Haskell is elegant, powerful and surprisingly pragmatic.<br><br>I am working on a hobby project that combines these new passions of mine. The codename of the project is \'Greed\' ;-)',4,'2008-06-14 19:56:22',1,'finance,programming,haskell,software','',1,'2008-06-14 19:56:22'),(5,'New cut of Nitro','As you may know, I am the main developer behind the <a href=\"http://www.nitroproject.org/\">Nitro Web Application Framework</a>.\r\nNitro is almost a 3 year project now, and sadly it seems to have\r\nreached a dead end. The code base is unnecessarily complex and not\r\ndocumented while former active developers have switched to competitive\r\nframeworks due to my pathetic efforts to nurture the community.<br><br>For\r\nquite some time now, I am evaluating the situation and the limited\r\nsuccess of the project. I have compiled a list of reasons of \'what went\r\nwrong\'. This list, will be the topic of a future post, a ...postmortem\r\nif you will. That\'s right, <span style=\"font-weight: bold;\">the forthcoming Nitro/Og 0.50.0 release will be the last release</span> of the project as it is.<br><br>I \'ll still use 0.50.0 for <a href=\"http://me.gr/\">my</a> <a href=\"http://cull.gr/\">current</a> <a href=\"http://www.joyerz.com/\">projects</a>, after all it\'s a <a href=\"http://www.nitroproject.org/\">flexible and robust framework</a>\r\nthat works great for me. In parallel, I am designing a prototype for a\r\nnew cut of Nitro, this time implemented on JavaScript (and a little bit\r\nof Java) with <span style=\"font-weight: bold;\">quite different design decisions and methodology</span>.\r\nThe new Nitro (tentatively called N2) will incorporate everything I\r\nlearned about programming for the Web and the management of open source\r\ncommunities over the last 3 years.<br><br>More details on this new project will be the topic of yet another post, so stay tuned ;-)',3,'2008-02-23 10:23:18',1,'nitro,ruby,programming,software','',1,'2008-02-23 10:23:18'),(6,'Friday\'s Links #2','OK, this time the theme is <strong>Graphics</strong>:<br><br><ul>\r\n\r\n\r\n<li><a target=\"_blank\" href=\"http://screencasters.heathenx.org/\">http://screencasters.heathenx.org</a> A great collection of Inkscape video tutorials. Inkscape is the best damn vector graphics editor, period!</li>\r\n<li><a target=\"_blank\" href=\"http://www.youtube.com/view_play_list?p=D19BCF9D57320E03\">http://www.youtube.com/view_play_list?p=D19BCF9D57320E03</a> If raster graphics is your thing have a look at these great video tutorials. They will teach you a thing (or two).</li>\r\n<li><a target=\"_blank\" href=\"http://naldzgraphics.com/category/tutorials/\">http://naldzgraphics.com/category/tutorials</a> Another great collection of tutorials. Enrich your designer arsenal with new techniques.</li>\r\n</ul></li>',1,'2008-10-10 16:27:32',1,'links,graphics,software,tutorial,vector,raster','',1,'2008-10-10 16:27:32'),(7,'One picture, a thousand words...','<img  alt=\"Bailout\" title=\"Bailout\" style=\"width: 800px; height: 467px;\" src=\"http://farm4.static.flickr.com/3135/2947560372_040be50f6e_o.jpg\"><br><br>This picture was taken after the first \"agreement\" on the Paulson bailout plan. The secretary assures us that everything is OK. At the time I was struck by the obvious mismatch of the announcement and the expression on the faces. So, I kept the photo. You know the rest of the story...<br>',4,'2008-10-16 14:25:57',1,'finance,dogma,crisis','',1,'2008-10-16 14:25:57'),(8,'Software\'s Law','<blockquote>Software is not subject to Moore\'s Law<br>Software is subject to Murphy\'s Law<br><br><em><a target=\"_blank\" href=\"http://www.crockford.com/\">Douglas Crockford</a>, 2008</em></blockquote>',5,'2008-10-20 17:36:14',1,'quote,programming,dogma','',1,'2008-10-20 17:36:14'),(9,'The engine behind this Blog','<img  alt=\"Nitro\" title=\"Nitro\" src=\"http://farm4.static.flickr.com/3246/2985090420_3840a940da_o.png\" align=\"right\">\r\nA few of my friends where curious about the engine that powers this blog, so I decided to shed some light on this issue by writing this post.<br><br>As already revealed in the <a href=\"http://rubyforge.org/pipermail/nitro-general/\" target=\"_blank\">Nitro mailing list</a>, this site runs on the experimental web application framework I am playing with <a href=\"http://www.gmosx.com/*New-cut-of-Nitro-5\">for quite some time</a>. Even though <strong>I still call it Nitro</strong>, this is really <strong>a quite different beast</strong>.<br><br>It incorporates the results of my research on web application development over the last 3 years. A few hard lessons where learned during the life cycle of the original version so I tried to fix my mistakes this time.<br><br>The original plan was to implement the new version using JavaScript or Haskell. On the way I decided it was more practical to concentrate on the high level design first and validate it with a Ruby prototype. When I am happy with the new API, and the new framework is successfully used on a few personal projects <strong>I may convert the minimal Ruby code base to JavaScript</strong>. A release of mod_v8 and/or mod_tracemonkey will most certainly be a great motivation ;-)',3,'2008-10-29 17:56:52',1,'nitro,ruby,javascript,web,software,programming','',1,'2008-10-29 17:56:52'),(10,'Ubuntu 8.10 (Intrepid Ibex)','For the last 4 years I am using <a href=\"http://www.ubuntu.com\" target=\"_blank\">Ubuntu</a> as the main Operating System on all my laptops and desktop computers. It \'s true that I faced my share of problems and annoyances, but generally I am happy with the evolution of this fine Linux distribution (and I dig the <a href=\"https://shipit.ubuntu.com/\" target=\"_blank\">free CD\'s</a> ;-))\r\n\r\n<br><br>Following a long standing ritual, some days ago, I backed up my home directory and installed a fresh copy of the new version, <a href=\"#\">Ubuntu 8.10</a>, aka Intrepid Ibex. After a quick customization session, here I am, up and running:\r\n\r\n\r\n\r\n<br><br><a target=\"_blank\" href=\"http://www.ubuntu.com\"><img  alt=\"Ubuntu 8.10\" title=\"Ubuntu 8.10\" style=\"width: 800px; height: 500px;\" src=\"http://farm4.static.flickr.com/3020/3006210218_476da21db4_o.png\"></a><br><strong><br>Positive impressions</strong>:\r\n\r\n<br><br><ul>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<li>For the first time, Compiz Fusion runs, without crashing, for more than 30 minutes.\r\n I have enabled the default special-FX options, yay! The desktop feels much smoother, albeit a bit slower.</li>\r\n<li>The 1440x900 resolution on my Lenovo monitor at work is supported.</li>\r\n<li>A few small improvements here and there make life easier (service command, the\r\n new user menu, nautilus tabs and eject, etc).</li>\r\n<li>I like the encrypted directory.</li>\r\n<li>It generally feels more robust.</li>\r\n<li>I like the dark skin, check out the screenshot.</li>\r\n</ul>\r\n<strong><br>Negative impressions</strong>:\r\n<br><br><ul>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<li>Firefox still crashes from time to time, especially when I open tabs\r\nwith flash content.</li>\r\n<li>Some long awaited improvements are still not here\r\n(search in selection in gedit, create directory / thumbnail view in\r\nfile selector).</li>\r\n<li>The dark skin has problems even after extensive customization. The dark buttons and different colors render many web pages\r\nunusable (or just plain ugly). </li>\r\n<li>No <a target=\"_blank\" href=\"http://openoffice.org\">Open Office 3</a> by default </li>\r\n</ul>\r\n<br>\r\nThe conclusion? One more step towards Open Source computing nirvana. Even though\r\nI would prefer a bolder step I still feel more productive (and happy)\r\nusing Ubuntu 8.10. What more is there to say ;-)',3,'2008-11-05 17:29:49',1,'linux,software,os,ubuntu','',1,'2008-11-05 17:29:49'),(13,'Aggregates','Inspired by a recent <a href=\"http://www.wired.com\" target=\"_blank\">Wired</a> article (<a href=\"http://www.wired.com/entertainment/theweb/magazine/16-11/st_essay\" target=\"blank\">Kill your Blog</a>) and given the fact that my hectic daily schedule prohibits such leisures as free time, I decided to experiment with a new blogging format, which I call \'Aggregates\': collections of 2-3 short and succinct stories in a single article combo. Without further ado let me continue with the first such \'Aggregate\'.<br><br>--\r\n\r\n<br><br>Don\'t get me wrong, I truly admire Google\'s technical achievements. However, I am afraid that Google\'s \'<a href=\"http://googleblog.blogspot.com/2006/05/googles-20-percent-time-in-action.html\">20 percent time</a>\' scheme may have negative side-effects. Different teams work in isolation without a solid engineering framework. Their output is often convoluted and incompatible: multiple VM\'s (V8, Dalvik), inconsistent coding conventions and different implementation languages, overly complex specifications (OpenSocial), non standard approaches to common problems, <a href=\"http://en.wikipedia.org/wiki/Not_Invented_Here\">NIH</a> syndrome, etc. Have a look at Amazon\'s (<a href=\"http://aws.amazon.com\" target=\"_blank\">AWS</a>) services for a stark contrast: well engineered, standards compliant APIs, \'genetically engineered\' to work together. A developer\'s nirvana.<br><br>--\r\n\r\n<br><br>I was blown away by the <a href=\"http://www.engadget.com/2008/12/02/nokia-n97-video-hands-on/\">first promotional videos of the forthcoming Nokia N97</a>. The hardware looks irresistibly sexy: the screen \'pops open\' with a clever and efficient mechanism, the diagonal button is an ingenious touch, and (being an old hacker) I love the full-size keyboard. But the real surprise is the software: I strongly believe that an iGoogle style (and allow me to say \'Wii channel\'-like) User Interface is the way to go. The old \'desktop\' paradigm used by Android belongs to the 70\'s.',3,'2008-12-14 18:31:00',1,'Google,Nokia,blogs,mobiles,UI,Amazon','',1,'2008-12-14 18:31:00');
/*!40000 ALTER TABLE `Article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `Category` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `label` varchar(128) NOT NULL,
  `term` varchar(32) NOT NULL,
  `scheme` varchar(128) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'Art','art','http://www.nitroframework.org'),(2,'Life','life','http://www.nitroframework.org'),(3,'Technology','technology','http://www.nitroframework.org'),(4,'Business','business','http://www.nitroframework.org'),(5,'Dogma','dogma','http://www.nitroframework.org');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `Comment` (
  `id` int(10) unsigned NOT NULL auto_increment COMMENT 'The primary key',
  `parentId` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `uri` varchar(128) default NULL,
  `content` varchar(256) NOT NULL,
  `created` timestamp NOT NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
INSERT INTO `Comment` VALUES (32,10,'fasdfasfsd','fasdfdsafasd','fasdfa fasdf','fasdfsdafasd','2009-03-15 09:01:37'),(33,10,'George Moschovitis','george.moschovitis@gmail.com','http://www.me.gr','This is a nice little comment ;-)','2009-03-15 09:02:04');
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tag`
--

DROP TABLE IF EXISTS `Tag`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `Tag` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(32) NOT NULL,
  `count` mediumint(8) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `nameIndex` USING BTREE (`name`(16)),
  KEY `count` (`count`)
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `Tag`
--

LOCK TABLES `Tag` WRITE;
/*!40000 ALTER TABLE `Tag` DISABLE KEYS */;
INSERT INTO `Tag` VALUES (1,'dogma',4),(2,'SF',1),(3,'Apple',1),(4,'design',1),(5,'gadget',2),(24,'hacking',1),(25,'retro',1),(26,'demo scene',1),(39,'links',2),(50,'nitro',2),(51,'ruby',2),(52,'programming',4),(53,'software',5),(54,'finance',2),(56,'haskell',1),(69,'graphics',1),(71,'tutorial',1),(72,'vector',1),(73,'raster',1),(79,'crisis',1),(89,'quote',2),(130,'javascript',1),(131,'web',1),(158,'linux',1),(160,'os',1),(161,'ubuntu',1),(196,'Google',2),(197,'G1',1),(198,'Android',1),(200,'mobile',1),(201,'Cloud',1),(215,'Nokia',1),(216,'blogs',1),(217,'mobiles',1),(218,'UI',1),(219,'Amazon',1);
/*!40000 ALTER TABLE `Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TagToArticle`
--

DROP TABLE IF EXISTS `TagToArticle`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `TagToArticle` (
  `parentId` int(10) unsigned default NULL,
  `tagId` int(10) unsigned default NULL,
  UNIQUE KEY `parentTagUnique_index` USING BTREE (`parentId`,`tagId`),
  KEY `tagId_index` USING BTREE (`tagId`),
  KEY `parentId_index` USING BTREE (`parentId`),
  CONSTRAINT `parentId_fk_constraint` FOREIGN KEY (`parentId`) REFERENCES `Article` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `tagId_fk_constraint` FOREIGN KEY (`tagId`) REFERENCES `Tag` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `TagToArticle`
--

LOCK TABLES `TagToArticle` WRITE;
/*!40000 ALTER TABLE `TagToArticle` DISABLE KEYS */;
INSERT INTO `TagToArticle` VALUES (1,1),(1,2),(2,3),(2,4),(2,5),(4,52),(4,53),(4,54),(4,56),(5,50),(5,51),(5,52),(5,53),(6,39),(6,53),(6,69),(6,71),(6,72),(6,73),(7,1),(7,54),(7,79),(8,1),(8,52),(8,89),(9,50),(9,51),(9,52),(9,53),(9,130),(9,131),(10,53),(10,158),(10,160),(10,161),(13,196),(13,215),(13,216),(13,217),(13,218),(13,219);
/*!40000 ALTER TABLE `TagToArticle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2009-06-10 12:38:15
