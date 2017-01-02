create database bamazon_DB;

USE bamazon_db;

CREATE TABLE Products(
	Item_ID INT(4) NOT NULL AUTO_INCREMENT,
	Product_name VARCHAR(40) NOT NULL,
	Department_name VARCHAR(40) NOT NULL,
	Price DECIMAL(10, 2) NOT NULL,
	Stock_quantity INT(10) NULL,
	PRIMARY KEY (Item_ID)
);

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Solo Drone', 'Electronics', 299.99, 5);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Google Chromecast', 'Electronics', 30.00, 50);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Dead Rising', 'Game', 39.99, 85);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Grand theft auto', 'Games', 29.99, 12);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('The Weekend', 'Music', 19.99, 55);

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Sia', 'Music', 19.99, 57);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Call of Duty', 'Games', 59.99, 25);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Lana DelRay', 'Music', 9.99, 25);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Byonce', 'Music', 29.99, 99);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Iphone 7', 'Electronics', 899.99, 5);
    
    
SELECT * FROM Products;