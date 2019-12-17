DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

-- was going to make a seeds file but it didnt say to in the driections explicitly and i guess its not that necesary since this will only be used once.

SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES 
  ("Football", "Sports Equipment", 19.99, 50),
  ("Basketball", "Sports Equipment", 18.99, 75),
  ("Chicken Soup", "Food and Drink", 1.50, 200),
  ("Frozen Pizza", "Food and Drink", 7.00, 200),
  ("Egg", "Food and Drink", 0.99, 250),
  ("Momento", "Movies", 20.00, 15),
  ("Inception", "Movies", 20.00, 20),
  ("Black Swan", "Movies", 12.50, 5),
  ("Gold Fork", "Misc", 500.00, 1),
  ("Silver Spoon", "Misc", 300.00, 2),
  ("Signed Fergie Autographed Poster", "Misc", 12.99, 1),
  ("Dirt", "Misc", 0.50, 1000),
  ("White T-Shirt", "Clothing", 8.00, 25),
  ("Corduroy jacket", "Clothing", 98.99, 2),
  ("Black Duster", "Clothing", 100, 1),
  ("Screwdriver", "Tools", 8.00, 35),
  ("Wrench", "Tools", 11.99, 20);
