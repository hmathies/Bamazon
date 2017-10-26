DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100)NUll,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY(item_id)

);

SELECT * FROM products;

/*--------created this index because item_id will be called the most from the table-------------*/

CREATE INDEX by_item_id ON products (item_id);