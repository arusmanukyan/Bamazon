
var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
//this will add a table to the terminal with the product list 
var Table = require('cli-table');

//connection to mysql Bamazon_db;

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root", 
	password:"password",
	database: "bamazon_db"
})


  connection.connect(function(err) {
        if (err) throw err;
        console.log('connected as id' + connection.threadId + '\n\n');
        start();
    });



 // this will connect to mysql and look for all products and add a table with product in it
 var start = function() {
        connection.query('SELECT * FROM Products', function(err, res) {
            console.log('---------------------------------');
            console.log('Available Bamazon Products');
            console.log('---------------------------------');

            //this will return the data from Bamazon_db and put  sql data in a table
            var table = new Table({
                head: ['Item_ID', 'Product_name', 'Price', 'Stock_quantity'],
                colWidths: [10, 40, 10, 10]
            });
          	// for loop created to cycle through product list id's
            for (var i=0; i < res.length; i++) {
                var productArray = [res[i].Item_ID, res[i].Product_name, res[i].Price, res[i].Stock_quantity];
                table.push(productArray);
            }
            console.log(table.toString());
            buyItem();
        });
    };

      //this is where the user will be prompted to pick an item by id
    var buyItem = function() {
        inquirer.prompt([{
            name: "Item",
            type: "input",
            message: "Pick the ID of the Item you would like to buy",
            validate: function(value) {

                //this will check the answer 
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("\nEnter the item ID\n");
                    return false;
                }
            }
        },

            //here it will ask for the quantity that is needed 
            {
            name: "Qty",
            type: "input",
            message: "What is the number of units you want to buy?",
            validate: function(value) {
                //this will check the answer 
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("\nEnter number of units\n");
                    return false;
                }
            }
        }]).then(function(answer) {
            var ItemInt = parseInt(answer.Qty);

            //this will query the database
            connection.query("SELECT * FROM Products WHERE ?", [{Item_ID: answer.Item}], function(err, data) {
                if (err) throw err;

                //Checks if sufficient quantity exists
                if (data[0].Stock_quantity < ItemInt) {
                    console.log("Insufficient quantity!\n");
                    console.log("Please choose another product\n");
                    start();
                } else {

                //updates database if product exist and not out of stock
                var updateQty = data[0].Stock_quantity - ItemInt;
                var totalPrice = data[0].Price * ItemInt;
                connection.query('UPDATE products SET Stock_quantity = ? WHERE Item_ID = ?', [updateQty, answer.Item], function(err, results) {
                    if(err) {
                        throw err;
                    } else {
                        console.log("Purchase complete!\n");
                        console.log("Your total is: $ " + totalPrice);

               	//if the buyer wants to continue
                // the buyer will be able to buy more if they would like to continue
                inquirer.prompt({
                    name: "buyMore",
                    type: "confirm",
                    message: "Would you like to buy another product?",
                }).then(function(answer) {
                    if (answer.buyMore === true) {
                        start();
                    } else {
                        console.log("Thanks for shopping Bamazon!");
                        connection.end();
                    }
                });
            }
        });
    }
});
});
};