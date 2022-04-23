-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2022 at 06:27 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freshnripe`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `name` varchar(100) NOT NULL,
  `subcategories` text NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`name`, `subcategories`) VALUES
('fruits', '[{\"name\":\"berries\", \"image\": \"https://www.kindpng.com/picc/b/191-1916400_berries-png.png\"}, {\"name\":\"melons\", \"image\": \"https://www.kindpng.com/picc/b/539-5390578_water-melon-png.png\"}, {\"name\":\"citrus\", \"image\": \"https://www.kindpng.com/picc/b/273-2732247_citrus-png.png\"},\r\n{\"name\":\"drupes\", \"image\": \"https://www.kindpng.com/picc/b/101-1016952_poison-apple-png.png\"},\r\n{\"name\":\"pomes\", \"image\": \"https://www.kindpng.com/picc/b/134-1343443_pomegranate-png.png\"},\r\n{\"name\":\"tropical\", \"image\": \"https://www.kindpng.com/picc/b/85-853558_tropical-fruit-png.png\"}]'),
('vegetables', '[{\"name\":\"leafy\", \"image\": \"https://www.kindpng.com/picc/b/89-898172_spinach-leaf-png.png\"}, {\"name\":\"cruciferous\", \"image\": \"https://www.kindpng.com/picc/b/137-1372081_kale-png.png\"}, {\"name\":\"marrows\", \"image\": \"https://www.kindpng.com/picc/b/51-515541_cucumber-slices-png.png\"},\r\n{\"name\":\"roots\", \"image\": \"https://www.kindpng.com/picc/b/135-1359985_carrots-png.png\"},\r\n{\"name\":\"stems\", \"image\": \"https://www.kindpng.com/picc/b/93-931161_shiitake-mushroom-png.png\"},\r\n{\"name\":\"allium\", \"image\": \"https://www.kindpng.com/picc/b/390-3907341_onion-clipart-png.png\"}]'),
('proteins', '[{\"name\":\"red meat\", \"image\": \"https://www.kindpng.com/picc/b/114-1146154_steak-png.png\"}, {\"name\":\"poultry\", \"image\": \"https://www.kindpng.com/picc/b/408-4084630_chicken-meat-png.png\"}, {\"name\":\"sea foods\", \"image\": \"https://www.kindpng.com/picc/b/84-849512_crab-claw-png.png\"}]'),
('distilleries', '[{\"name\":\"whiskey\", \"image\": \"https://www.kindpng.com/picc/b/162-1622956_whiskey-bottle-png.png\"}, {\"name\":\"tequila\", \"image\": \"https://www.kindpng.com/picc/b/55-552318_tequila-shot-glass-png.png\"}, {\"name\":\"gin\", \"image\": \"https://www.kindpng.com/picc/b/462-4623938_gin-png.png\"},\r\n{\"name\":\"vodka\", \"image\": \"https://www.kindpng.com/picc/b/5-59431_vodka-glass-png.png\"},\r\n{\"name\":\"rum\", \"image\": \"https://www.kindpng.com/picc/b/269-2694074_rum-png.png\"},\r\n{\"name\":\"champagne\", \"image\": \"https://www.kindpng.com/picc/b/2-25159_champagne-bottle-pop-png.png\"}]'),
('organics', '[{\"name\":\"fruits\", \"image\": \"https://www.kindpng.com/picc/b/158-1587523_fruits-and-vegetables-png.png\"}, {\"name\":\"vegetables\", \"image\": \"https://www.kindpng.com/picc/b/194-1942654_green-vegetables-png.png\"}]'),
('exotics', '[{\"name\":\"fruits\", \"image\": \"https://www.kindpng.com/picc/b/381-3818501_dragon-fruit-png.png\"}, {\"name\":\"vegetables\", \"image\": \"https://www.kindpng.com/picc/b/168-1688610_asparagus-png.png\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` char(36) NOT NULL,
  `cart` text NOT NULL DEFAULT '[]',
  `deliverymethod` varchar(15) NOT NULL,
  `protection` varchar(20) NOT NULL,
  `userid` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `cart`, `deliverymethod`, `protection`, `userid`) VALUES
('126f252a-be58-11ec-b53d-f430b9d7842d', '[{\"productid\":\"ff8e5c6e-b9b0-11ec-823a-f430b9d7842d\",\"count\":0},{\"productid\":\"fd53bf62-b9b1-11ec-823a-f430b9d7842d\",\"count\":0},{\"productid\":\"76a34d96-b993-11ec-823a-f430b9d7842d\",\"count\":3},{\"productid\":\"b909a532-ba01-11ec-9d1a-f430b9d7842d\",\"count\":2}]', 'upsair', 'true', '109d034d-baec-11ec-b1e8-f430b9d7842d');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `name` varchar(200) NOT NULL,
  `image` text NOT NULL,
  `mrp` int(5) NOT NULL,
  `price` int(5) NOT NULL,
  `category` varchar(100) NOT NULL,
  `subcategory` varchar(100) NOT NULL,
  `rating` int(2) NOT NULL,
  `reviews` text NOT NULL DEFAULT '[]',
  `description` text NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `id` char(36) NOT NULL,
  `quantity` char(2) NOT NULL DEFAULT 'pe'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`name`, `image`, `mrp`, `price`, `category`, `subcategory`, `rating`, `reviews`, `description`, `isFeatured`, `id`, `quantity`) VALUES
('Strawberries Imported', 'https://www.kindpng.com/picc/b/22-220596_strawberry-slice-png.png', 630, 450, 'fruits', 'berries', 5, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\",\"rating\":8,\"description\":\"Amazing product. Must Buy!\"},{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/296-2968827_mlg-doge-png.png\",\"description\":\"Sweetest straws\",\"rating\":2}]', 'A strawberry is both a low-growing, flowering plant and also the name of the fruit that it produces. Strawberries are soft, sweet, bright red berries. They\'re also delicious. Strawberries have tiny edible seeds, which grow all over their surface. When ripe, strawberries smell wonderful and taste even better.', 1, '76a34d96-b993-11ec-823a-f430b9d7842d', 'dz'),
('Lisbon Lemon', 'https://www.kindpng.com/picc/b/6-64991_green-lemon-png.png', 65, 58, 'fruits', 'citrus', 7, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\",\"rating\":8,\"description\":\"Amazing product. Must Buy!\"},{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/296-2968827_mlg-doge-png.png\",\"description\":\"Good but.....too sour!\",\"rating\":6}]', 'The lemon is rounded and slightly elongated, it belongs to the family of citrus fruit and therefore it shares many of the characteristics of other species of citruses, as for instance the thick skin. The pulp is pale yellow, juicy and with an acid flavour; it is divided in gores.', 1, '2b2d418e-b998-11ec-823a-f430b9d7842d', 'pe'),
('Watermelon Jumbo', 'https://www.kindpng.com/picc/b/153-1534937_melon-png.png', 40, 30, 'fruits', 'melons', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'It has an oval or spherical shape and a dark green and smooth rind, sometimes showing irregular areas of a pale green colour. It has a sweet, juicy, refreshing flesh of yellowish or reddish colour, containing multiple black, brown or white pips.', 1, 'ff8e5c6e-b9b0-11ec-823a-f430b9d7842d', 'pe'),
('Morello Cherries', 'https://www.kindpng.com/picc/b/13-134929_black-cherry-png.png', 60, 58, 'fruits', 'drupes', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'The fruit is a fleshy drupe (stone fruit) that is generally heart-shaped to nearly globular, about 2 cm (1 inch) in diameter, and varies in colour from yellow through red to nearly black. The acid content of the sweet cherry is low. The higher acid content of the sour cherry produces its characteristic tart flavour.', 1, 'fd53bf62-b9b1-11ec-823a-f430b9d7842d', 'dz'),
('Kazake Pomegranates', 'https://www.kindpng.com/picc/b/134-1343443_pomegranate-png.png', 260, 200, 'fruits', 'pomes', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'The pomegranate plant is a large shrub or small tree that has smooth, evergreen leaves and showy orange to red flowers. It has rounded fruit with a dry outer covering (husk) made up of two layers.', 1, 'fc932f56-b9b2-11ec-823a-f430b9d7842d', 'kg'),
('Abacaxi Pineapple', 'https://www.kindpng.com/picc/b/32-321594_abacaxi-png.png', 156, 132, 'fruits', 'tropical', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'A pineapple is a sweet tropical fruit with a tough leathery skin and spiky leaves on top. Pineapple is excellent, whether eaten as a snack, in a sweet dessert, in savory dishes like fried rice, or even on pizza.', 1, '4b7d24c6-b9b3-11ec-823a-f430b9d7842d', 'pe'),
('Baby Kale Spinach', 'https://www.kindpng.com/picc/b/137-1372147_kale-png.png', 120, 80, 'vegetables', 'leafy', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Spinach is a herbaceous plant whose leaves, green and arranged in rosette, are eaten raw or cooked. The leaves have an oval shape and are wrinkled; they can be whole or sawed. It is a very nutritious, tasteful and easy-to-digest plant. The Arabs regarded it as the queen of vegetables.', 1, 'b2ec767a-b9b3-11ec-823a-f430b9d7842d', 'pe'),
('Brussels Sprouts', 'https://www.kindpng.com/picc/b/467-4670012_brussel-sprouts-png.png', 180, 160, 'vegetables', 'cruciferous', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'A plant (Brassica oleracea gemmifera) related to the cabbage and cauliflower that is cultivated for its edible small roundish green buds which are borne on its stem and resemble miniature cabbages.', 1, '4c661fbd-b9b4-11ec-823a-f430b9d7842d', 'kg'),
('Parisian Heirloom Carrot', 'https://www.kindpng.com/picc/b/135-1359985_carrots-png.png', 180, 160, 'vegetables', 'roots', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Carrot, (Daucus carota), herbaceous, generally biennial plant of the Apiaceae family that produces an edible taproot. Among common varieties root shapes range from globular to long, with lower ends blunt to pointed. Besides the orange-coloured roots, white-, yellow-, and purple-fleshed varieties are known.', 1, '14da2cf7-b9b5-11ec-823a-f430b9d7842d', 'kg'),
('Belstar Broccoli', 'https://www.kindpng.com/picc/b/122-1223296_broccoli-png.png', 100, 95, 'vegetables', 'stems', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Broccoli is a fast-growing annual plant that grows 60–90 cm (24–35 inches) tall. Upright and branching with leathery leaves, broccoli bears dense green clusters of flower buds at the ends of the central axis and the branches.', 1, '728ff21b-b9b5-11ec-823a-f430b9d7842d', 'kg'),
('Italian Torpedo Onion', 'https://www.kindpng.com/picc/b/5-52735_onion-slice-png.png', 380, 355, 'vegetables', 'allium', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'An onion is a round vegetable with a brown skin that grows underground. It has many white layers on its inside which have a strong, sharp smell and taste.', 1, 'cb61a587-b9b5-11ec-823a-f430b9d7842d', 'kg'),
('Ribeye Steak', 'https://www.kindpng.com/picc/b/89-898438_cartoon-meat-png.png', 860, 800, 'proteins', 'red meat', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'The rib-eye is cut from the roast—known as a prime rib or standing rib roast—that sits at the top of the rib primal, the part of the cow between the chuck and the loin. The rib-eye is basically the meat between each of the ribs, which makes it a boneless cut; it is best grilled or broiled.', 1, '20bffc4e-b9b6-11ec-823a-f430b9d7842d', 'pe'),
('Cornish Cross Chicken', 'https://www.kindpng.com/picc/b/408-4084630_chicken-meat-png.png', 680, 629, 'proteins', 'poultry', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Cornish hens are a popular breed of chickens that hail from the English county of Cornwall. They are about 2 pounds as opposed to a regular chicken that weighs in at 4 or more pounds. Cornish hens are fully matured at the smaller weight and the meat is super tender.', 1, '75e85c6f-b9b6-11ec-823a-f430b9d7842d', 'kg'),
('Wild Caught Salmon', 'https://www.kindpng.com/picc/b/126-1265615_salmon-png.png', 650, 599, 'proteins', 'sea foods', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Wild-caught fish are caught by fishermen in their natural habitats — rivers, lakes, oceans, etc. The main benefit of wild salmon is that the fish just eat organisms found in their existing environment, which by nature, is far more diverse than what farmed fish get to eat on a regular basis.', 1, 'cd4810a5-b9b6-11ec-823a-f430b9d7842d', 'kg'),
('Jack Daniels Tennessee ', 'https://www.kindpng.com/picc/b/162-1622840_whiskey-bottle-png.png', 1250, 1160, 'distilleries', 'whiskey', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Jack Daniel\'s Tennessee Honey is a blend of Jack Daniel\'s Tennessee Whiskey and a unique honey liqueur of our own making, for a taste that\'s one-of-a-kind and unmistakably Jack. With hints of honey and a finish that\'s naturally smooth, Jack Daniel\'s Tennessee Honey is something special.', 1, '20fe1f24-b9b7-11ec-823a-f430b9d7842d', 'pe'),
('Hornitos Lime Shot', 'https://www.kindpng.com/picc/b/55-552318_tequila-shot-glass-png.png', 1300, 999, 'distilleries', 'tequila', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'When looking for a premium alternative to traditional tequila shots, our Lime Shot tequila is the perfect go-to. We\'ve taken 100% blue agave tequila and infused it with a hint of natural lime and salt for a refreshing, crowd-pleasing experience.', 0, '7d56b797-ba01-11ec-9d1a-f430b9d7842d', 'pe'),
('Kopparberg Strawberry Gin', 'https://www.kindpng.com/picc/b/462-4624021_gin-png.png', 650, 599, 'distilleries', 'gin', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Infused with botanicals of juniper, lemon zest and coriander, Strawberry & Lime combines the sweet taste of strawberry with tangy lime to create a refreshingly light drink -Perfect for those warm summer nights.', 1, 'b909a532-ba01-11ec-9d1a-f430b9d7842d', 'pe'),
('Smirnoff Fluffed Marshmallow', 'https://www.kindpng.com/picc/b/678-6789265_smirnoff-vodka-png.png', 900, 859, 'distilleries', 'vodka', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Smirnoff Fluffed Marshmallow Vodka is something novel when it comes to vodka flavours, offering a sweetness in the alcohol. This triple distilled and ten times filtered vodka now creates an exclusive aura through the caramel notes that takes you back to campfire smokes with a smooth vanilla start.', 1, 'f66c8018-ba01-11ec-9d1a-f430b9d7842d', 'pe'),
('630 Expedition Rum', 'https://www.kindpng.com/picc/b/269-2694050_rum-png.png', 700, 599, 'distilleries', 'rum', 9, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\",\"rating\":8,\"description\":\"Amazing product. Must Buy!\"},{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/296-2968827_mlg-doge-png.png\",\"description\":\"Where am I? In the mars??\",\"rating\":10}]', 'A purely American rum in the Jamaican pot still vein, big molasses flavors. Sweet molasses with oak hints and subtle tropical fruit notes on the nose, deep rich molasses on the palate, clean finish highlighted by vanilla and oak.', 1, '365b7378-ba02-11ec-9d1a-f430b9d7842d', 'pe'),
('Moet & Chandon Imperial', 'https://www.kindpng.com/picc/b/2-26302_champagne-bottle-pop-png.png', 800, 769, 'distilleries', 'champagne', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'The Moet & Chandon Imperial Brut NV is characterized by bright fruitiness and elegant maturity. The color is an elegant golden straw yellow with amber highlights. Radiant aromas reveal notes of apple, pear, yellow peach, honey, and floral nuances along with elegant blond notes of brioche and fresh nuts.', 1, '7a019114-ba02-11ec-9d1a-f430b9d7842d', 'pe'),
('Durian Imported', 'https://www.kindpng.com/picc/b/242-2421252_durian-png.png', 599, 499, 'exotics', 'fruits', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Durian is a tropical fruit distinguished by its large size and spiky, hard outer shell. It has a pungent smell, custard-like flesh with large seeds. There are several varieties, but the most common one is Durio zibethinus. The fruit\'s flesh can range in color.', 0, 'cf50409e-ba0c-11ec-9d1a-f430b9d7842d', 'kg'),
('Rambutan Imported', 'https://www.kindpng.com/picc/b/58-588189_lychee-png.png', 260, 199, 'exotics', 'fruits', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Related to lychee and longan fruits, rambutan is a Southeast Asian fruit with a hairy shell and sweet, cream-flavored, edible flesh. It\'s nutritious yet low in calories and may aid your digestion, immune system and weight loss. Though some people eat the peel and seed, they\'re generally considered inedible.', 0, '21f774f4-ba0d-11ec-9d1a-f430b9d7842d', 'kg'),
('Mangosteen Imported', 'https://www.kindpng.com/picc/b/486-4860431_apple-png.png', 150, 139, 'exotics', 'fruits', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'A dark reddish-purple fruit of southeastern Asia with a thick rind and juicy flesh having a flavor suggestive of both peach and pineapple also : a tree (Garcinia mangostana) of the Saint-John\'s-wort family that bears mangosteens.', 0, '6491d779-ba0d-11ec-9d1a-f430b9d7842d', 'pe'),
('Longan Imported', 'https://www.kindpng.com/picc/b/609-6092015_fresh-fruits-png.png', 240, 229, 'exotics', 'fruits', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Dimocarpus longan, commonly known as the longan, is a tropical tree species that produces edible fruit. It is one of the better-known tropical members of the soapberry family Sapindaceae, to which the lychee and rambutan also belong. The fruit of the longan is similar to that of the lychee, but less aromatic in taste.', 0, 'a56389d1-ba0d-11ec-9d1a-f430b9d7842d', 'kg'),
('Persimmon Imported', 'https://www.kindpng.com/picc/b/432-4325397_persimmon-png.png', 150, 129, 'exotics', 'fruits', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'A good persimmon at its peak will taste sweet, mild, and rich. Many people have described its flavor as “honey-like.” Its texture is similar to that of an apricot and its skin is a bit tougher than an apple\'s.', 0, 'da4b2eb9-ba0d-11ec-9d1a-f430b9d7842d', 'pe'),
('Dragon Fruit Imported', 'https://www.kindpng.com/picc/b/381-3818277_dragon-fruit-png.png', 80, 69, 'exotics', 'fruits', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Dragon fruit may look exotic, but its flavors are similar to other fruits. Its taste has been described as a slightly sweet cross between a kiwi and a pear. Dragon fruit is a tropical fruit native to Mexico and Central America. Its taste is like a combination of a kiwi and a pear.', 0, '3e28f6c8-ba0e-11ec-9d1a-f430b9d7842d', 'pe'),
('Passion Fruit Imported', 'https://www.kindpng.com/picc/b/264-2641766_passion-fruit-png.png', 160, 155, 'exotics', 'fruits', 8, '[{\"name\":\"Yashwanth\",\"image\":\"https://www.kindpng.com/picc/b/22-223941_no-avatar-png.png\", \"rating\": 8,\"description\":\"Amazing product. Must Buy!\"}]', 'Passion fruit is the fruit of the Passiflora vine, a type of passion flower. It has a tough outer rind and juicy, seed-filled center. There are several types that vary in size and color. Purple and yellow varieties are the most commonly available ones, including: Passiflora edulis.', 0, '79496d8c-ba0e-11ec-9d1a-f430b9d7842d', 'pe');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `picture` text NOT NULL,
  `password` text NOT NULL,
  `doorno` varchar(30) NOT NULL,
  `street` varchar(100) NOT NULL,
  `locality` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `cart` text NOT NULL DEFAULT '[]',
  `id` char(36) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`name`, `phone`, `picture`, `password`, `doorno`, `street`, `locality`, `city`, `state`, `pincode`, `cart`, `id`, `email`) VALUES
('Arivazhagan', '9940147134', 'sdf', '$2b$12$tdWBE8PKVSwI7YBPnlh7YeU8UYJXaM9Fu4gzo4CBICvqU6cmmJJa.', '394', 'balaji nagar', 'padappai', 'kancheepuram', 'tamil nadu', '601301', '[{\"productid\":\"2b2d418e-b998-11ec-823a-f430b9d7842d\",\"count\":3}]', '023d1ab0-bcad-11ec-a684-f430b9d7842d', 'ari@gmail.com'),
('Yashwanth', '8825489563', 'https://www.kindpng.com/picc/b/296-2968827_mlg-doge-png.png', '$2b$12$aa5gKEqTijCjWFRTg6gQOey.zTszTWkrHIURdOe6xH9Ak.atvh1Bm', '394', 'balaji nagar', 'Padappai', 'kanchi', 'Tamilnady', '601301', '[]', '109d034d-baec-11ec-b1e8-f430b9d7842d', 'yash.codereaper@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
