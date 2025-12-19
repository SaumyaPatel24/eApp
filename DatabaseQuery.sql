-- Insert users
-- Create fresh account for new customers

-- admin/superadmin
INSERT INTO `user` (firstName, lastName, email, password, phone, role)
VALUES
('SP', 'Admin', 'admin@example.com', '$2b$10$bPAwOJ79EebfYh7KXmCDXuZgYr8NDzAlpeyNtOmRUpega5cedXV0u', '1234567890', 'admin');
-- Password: admin123
INSERT INTO `user` (firstName, lastName, email, password, phone, role)
VALUES
('SuperSP', 'Patel', 'super@example.com', '$2b$10$TG2rN2v6DXZh7AVlG3kpnOXg9zs.M3HCXosPaN2mwigbZO2QtWJqq', '987654321', 'superadmin');
-- Password: superadmin123

INSERT INTO products 
(name, brand, category, price, rating, stock, imageUrl, variants, gender)
VALUES 
(
  'Nike Air Force 1',
  'Nike',
  'Lifestyle',
  159.99,
  4.7,
  25,
  'https://media.istockphoto.com/id/471565719/photo/nike-air-force-1.jpg?s=612x612&w=0&k=20&c=EZ5icfxI3ZWmx66equzUYL3AYCNLSt5Ox8AeQU-mfjE=',
  '[
     { "color": "Black", "sizes": [7,8,9] },
     { "color": "White", "sizes": [8,9,10] }
  ]',
  'Men'
);

INSERT INTO products 
(name, brand, category, price, rating, stock, imageUrl, variants, gender)
VALUES 
(
  'Adidas Ultraboost 22',
  'Adidas',
  'Running',
  189.99,
  4.8,
  30,
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9uhqOpz2oNiStUFQXK8iUPDzT4kQew_htag&s',
  '[
     { "color": "Black", "sizes": [6,7,8,9] },
     { "color": "Blue", "sizes": [8,9,10] }
  ]',
  'Men'
);


SELECT *
FROM products
WHERE JSON_SEARCH(variants, 'one', '10', null, '$[*].size') IS NOT NULL;

SELECT id, JSON_PRETTY(variants)
FROM products
LIMIT 3;

SELECT *
FROM products
WHERE JSON_SEARCH(
  JSON_EXTRACT(variants, '$[*].sizes'),
  'one',
  CAST('10' AS JSON)
) IS NOT NULL;

SELECT *
FROM products
WHERE JSON_CONTAINS(
  variants,
  JSON_OBJECT('color', 'Red', 'sizes', JSON_ARRAY(7)),
  '$'
);

INSERT INTO products 
(name, brand, category, price, rating, stock, imageUrl, variants, gender)
VALUES 
(
  'Puma RS-X Reinvent',
  'Puma',
  'Lifestyle',
  129.99,
  4.5,
  18,
  'https://images.stockx.com/360/Puma-RS-X-Reinvention/Images/Puma-RS-X-Reinvention/Lv2/img01.jpg?w=480&q=60&dpr=1&updated_at=1635259131&h=320',
  '[
     { "color": "Red", "sizes": [7,8,9,10] },
     { "color": "Black", "sizes": [6,7,8] }
  ]',
  'Unisex'
  
);

INSERT INTO products 
(name, brand, category, price, rating, stock, imageUrl, variants, gender)
VALUES 
(
  'New Balance 550 White Green',
  'New Balance',
  'Lifestyle',
  149.99,
  4.6,
  20,
  'https://i.ebayimg.com/00/s/NTQ2WDk3MA==/z/rCsAAOSwAOJklS3M/$_57.JPG?set_id=8800005007',
  '[
     { "color": "Grey", "sizes": [7,8,9] },
     { "color": "Navy Blue", "sizes": [8,9,10,11] }
  ]',
  'Unisex'
);


INSERT INTO products 
(name, brand, category, price, rating, stock, imageUrl, variants, gender)
VALUES 
(
  'Converse Chuck Taylor All Star',
  'Converse',
  'Lifestyle',
  69.99,
  4.4,
  40,
  'https://converse.ca/cdn/shop/files/A09221C_A09221C_A_107X1_2d3548e9-8b00-47b3-b604-d409138a582f.jpg?v=1746466753&width=2048',
  '[
     { "color": "White", "sizes": [6,7,8,9] },
     { "color": "Black", "sizes": [7,8,9,10] }
  ]',
  'Unisex'
);

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES
('Asics Gel-Nimbus 25', 'Asics', 'Running', 189.99, 4.9, 20,
'https://i.ebayimg.com/images/g/CY0AAOSwuXllhSu-/s-l1200.png',
'[
  { "color": "Blue", "sizes": [7,8,9,10,11,12] },
  { "color": "Black", "sizes": [6,7,8,9,10] }
]', 'Men');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Reebok Nano X3', 'Reebok', 'Gym', 159.99, 4.6, 22,
'https://workout.eu/img/p/6/3/0/2/6/63026-thickbox_default.jpg',
'[
  { "color": "Grey", "sizes": [6,7,8,9,10] },
  { "color": "Beige", "sizes": [7,8,9,10,11] }
]', 'Women');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Columbia Peakfreak II', 'Columbia', 'Hiking', 169.99, 4.7, 12,
'https://i.sportisimo.com/products/images/1696/1696986/700x700/columbia-peakfreak-ii-outdry_2.jpg',
'[
  { "color": "Brown", "sizes": [8,9,10,11,12] },
  { "color": "Olive", "sizes": [7,8,9,10] }
]', 'Men');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Crocs Classic Clog', 'Crocs', 'Slides', 59.99, 4.4, 35,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxnglXVPwRoPvHupTZ1HhO7LyPtVM5QiYwUw&s',
'[
  { "color": "Pink", "sizes": [5,6,7,8] },
  { "color": "Black", "sizes": [6,7,8,9,10] }
]', 'Women');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Nike ZoomX Vaporfly 3', 'Nike', 'Running', 249.99, 4.9, 10,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpletwVzbSrCPKMgCsaW1uVh3hYvjcpX_pSA&s',
'[
  { "color": "Orange", "sizes": [8,9,10,11] },
  { "color": "White", "sizes": [7,8,9,10] }
]', 'Men');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Adidas Adilette Comfort', 'Adidas', 'Slides', 49.99, 4.3, 40,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO3Rqv_r705qenj2y1r3aCi4GpSZdiOZbfD8XO-r-umCji8Q5fBJky_7iw15NHYEZRvsk&usqp=CAU',
'[
  { "color": "Black", "sizes": [6,7,8,9,10] },
  { "color": "Navy", "sizes": [7,8,9,10,11] }
]', 'Unisex');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Hoka Clifton 9', 'Hoka', 'Running', 189.99, 4.8, 16,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm96aS5M4_cGGA8mq4kbvFcTKgyFmC_38Ezw&s',
'[
  { "color": "Sky Blue", "sizes": [7,8,9,10] },
  { "color": "Grey", "sizes": [8,9,10,11] }
]', 'Women');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Salomon X Ultra 4 GTX', 'Salomon', 'Hiking', 179.99, 4.8, 12,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSRnbWxBir5urL88TbI6avNkWHirttHZGicA&s',
'[
  { "color": "Black", "sizes": [8,9,10,11] },
  { "color": "Green", "sizes": [7,8,9,10] }
]', 'Men');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Vans Old Skool Black White', 'Vans', 'Lifestyle', 89.99, 4.6, 28,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7uL0aFGCzLkZQwOdmsnpzkjslPP5dBLPkVw&s',
'[
  { "color": "Black", "sizes": [6,7,8,9,10] },
  { "color": "White", "sizes": [7,8,9,10] }
]', 'Unisex');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Under Armour Charged Assert 10', 'Under Armour', 'Gym', 99.99, 4.5, 24,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUb9cz56M10GBzBMxoKLtRqU_r3L1ackf2OA&s',
'[
  { "color": "Grey", "sizes": [7,8,9,10,11] },
  { "color": "Blue", "sizes": [8,9,10,11] }
]', 'Men');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Nike Metcon 9', 'Nike', 'Gym', 159.99, 4.7, 18,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB7nHvdmSlC3UP9rk6afWYZ_LWVfX5QmvNrg&s',
'[
  { "color": "Red", "sizes": [7,8,9,10] },
  { "color": "Grey", "sizes": [8,9,10,11] }
]', 'Women');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Merrell Moab 3 Mid Waterproof', 'Merrell', 'Hiking', 169.99, 4.9, 14,
'https://bushtukah.com/cdn/shop/files/J035839W_8.jpg?v=1718731847&width=900',
'[
  { "color": "Brown", "sizes": [8,9,10,11,12] },
  { "color": "Black", "sizes": [7,8,9,10] }
]', 'Men');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('New Balance Fresh Foam 1080v13', 'New Balance', 'Running', 199.99, 4.8, 20,
'https://www.stepaheadfootwear.com/cdn/shop/files/NewBalancewomens1080v13.webp?v=1747503034',
'[
  { "color": "Navy", "sizes": [7,8,9,10] },
  { "color": "White", "sizes": [6,7,8,9,10] }
]', 'Women');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Converse Chuck Taylor All Star', 'Converse', 'Lifestyle', 74.99, 4.7, 32,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZPfOwzhvLIjtX3GdMHC6aWXmLRs9388R9Rg&s',
'[
  { "color": "White", "sizes": [6,7,8,9,10,11] },
  { "color": "Red", "sizes": [7,8,9,10] }
]', 'Unisex');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Birkenstock Arizona Sandals', 'Birkenstock', 'Slides', 99.99, 4.8, 25,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj7mJex2kBsdk9BxgTFw26PxkErMXSy0IhiA&s',
'[
  { "color": "Brown", "sizes": [6,7,8,9,10] },
  { "color": "Black", "sizes": [8,9,10,11] }
]', 'Unisex');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Skechers Go Walk Arch Fit', 'Skechers', 'Lifestyle', 109.99, 4.5, 26,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-iF46BCXbXchDgLhTVZFfac6v75046u5Jmw&s',
'[
  { "color": "Pink", "sizes": [6,7,8,9] },
  { "color": "Grey", "sizes": [7,8,9,10] }
]', 'Women');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('The North Face Vectiv Enduris II', 'The North Face', 'Hiking', 189.99, 4.7, 12,
'https://www.prfo.com/cdn/shop/files/the-north-face-mens-vectiv-enduris-4-shoes-de10-225-hero-blue-sun-fog-right_1200x.jpg?v=1734464920',
'[
  { "color": "Blue", "sizes": [8,9,10,11] },
  { "color": "Green", "sizes": [7,8,9,10] }
]', 'Men');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('On Cloud 5', 'On', 'Running', 169.99, 4.6, 18,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFcxAOUQjiSaHAjcL1RX76oGZKq8metpgRSA&s',
'[
  { "color": "White", "sizes": [6,7,8,9,10] },
  { "color": "Black", "sizes": [7,8,9,10] }
]', 'Unisex');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Reebok Club C 85 Vintage', 'Reebok', 'Lifestyle', 109.99, 4.7, 22,
'https://cdn.etrias.nl/media/cache/product_thumb_md/r/e/reebok-women-club-c-85-vintage-chalk-alabaster-sky-blue-100007798-412.jpg',
'[
  { "color": "White", "sizes": [6,7,8,9,10] },
  { "color": "Beige", "sizes": [7,8,9,10] }
]', 'Women');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Nike Air Zoom Pegasus 41', 'Nike', 'Running', 169.99, 4.8, 15,
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAS2SoOPm2NpRAPncp02nvBieuWKzDVo9enA&s',
'[
  { "color": "Blue", "sizes": [7,8,9,10,11] },
  { "color": "Black", "sizes": [8,9,10,11] }
]', 'Men');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Adidas Terrex Free Hiker 2', 'Adidas', 'Hiking', 229.99, 4.9, 10,
'https://huckberry.imgix.net/spree/products/778910/original/91824_adidas_Terrex_Free_Hiker_2_GTX_Sneaker_bronze_stratasavannahcarbon_01_Product_on_White.jpg?auto=compress%2Cformat&cs=tinysrgb&fit=max&w=500',
'[
  { "color": "Brown", "sizes": [8,9,10,11,12] },
  { "color": "Grey", "sizes": [7,8,9,10] }
]', 'Unisex');

INSERT INTO products (name, brand, category, price, rating, stock, imageUrl, variants, gender) VALUES 
('Champion IPO Slides', 'Champion', 'Slides', 44.99, 4.2, 40,
'https://i.ebayimg.com/00/s/MTA2NlgxNjAw/z/nxkAAOSwMIdjVY98/$_57.JPG?set_id=8800005007',
'[
  { "color": "Black", "sizes": [6,7,8,9,10] },
  { "color": "Red", "sizes": [7,8,9,10,11] }
]', 'Men');


