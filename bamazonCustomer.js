var mysql = require("mysql");        // npm packages
var inquirer = require("inquirer");  // Seriously took me 30 min to realize i spelled "inquirer" wrong...
var colors = require('colors');
require("console.table");            //  !The coveted npm package!

//-------------------------------------------->
//Create the connection vairable for MySQL
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "your new password",
    database: "bamazon"
});

//-------------------------------------------->
// Connecting to bamazon and loading the products
connection.connect(function(err) {
    if (err) {
        console.error("error with connection: " + err.stack); // ...NOT..console.log...
    }
    showProducts();
});

//-------------------------------------------->
// Query for * ALL * the items and show them in the table
function showProducts() {
    connection.query("SELECT * FROM products", function(error, res) {
        if (error) throw error;
        console.log("--------------------------------------------------------------".yellow);
        console.log("--------------------------------------------------------------".yellow);
        console.log("\n ITEMS FOR SALE \n".rainbow)
        console.table(res);
        promptForPurchase(res);
    });
};

//-------------------------------------------->
// this prompts the customer which item they want to buy by ID 
function promptForPurchase(inventory) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "choice",
                message: "ID of the item for purchase?".green
            }
        ])
        .then(function(num) {
            var userChoice = Number(num.choice);
            var product = checkInventory(userChoice, inventory);
      
            if (product) {     // if product exists then promtQuantity
              promptQuantity(product);
            }
            else {
              console.log("--------------------------------------------------------------".yellow);
              console.log("--------------------------------------------------------------".yellow);
              console.log("\nThat item is not in the inventory. \n\n Please Try Again".brightRed);
              showProducts();
            }
        });
}

//-------------------------------------------->
// Make sure we have enough
function checkInventory(userChoice, inventory) {
    for (var i = 0; i < inventory.length; i++) { // inventory length
      if (inventory[i].item_id === userChoice) { // if inventory id is equal to chosen id..
        return inventory[i];  // return that product
      }
    }
    return null;  // if not return null
  };

//-------------------------------------------->
// Ask how many they want to purchase
  function promptQuantity(product) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "How many would you like to purchase".green,
        }
      ])
      .then(function(num) {
        var quantity = Number(num.quantity);
  
        if (quantity > product.stock_quantity) {
          console.log("--------------------------------------------------------------".yellow);
          console.log("--------------------------------------------------------------".yellow);
          console.log("\n\n\n Sorry we dont have that many :( \n\n Please try again!".brightRed);
          showProducts(); // start over
        }
        else {
          Purchase(product, quantity);
        }
      });
  }

//-------------------------------------------->
// Making Purchase
  function Purchase(product, quantity) {
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
      [quantity, product.item_id],
      function(error, res) {
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n")
        console.log("--------------------------------------------------------------".yellow);
        console.log("--------------------------------------------------------------".yellow);
        console.log("\n Congratulations, you purchased ".green + quantity + " " + product.product_name + "s!" + "\n for a total of $".green + total( quantity, product.price) + "\n\n would you like to make another purchase? \n".rainbow);
        showProducts();
        console.log("\n TO EXIT, press (Ctrl + c) \n".yellow); // lolol
      }
    );
  }
  var total = function(a, b) {
     return (a * b).toFixed(2);
  }