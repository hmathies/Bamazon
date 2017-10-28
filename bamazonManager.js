var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
      runSearch();
  });



function runSearch(result) {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Find data within a specific range",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          productSearch();
          break;
//need to add more switch statements

      }
    });
  }

    function productSearch() {
      console.log('\n Welcome to Bamazon!'.cyan);

      var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";

      connection.query(query, function (err, result, fields) {
          if (err) throw err;
      displayTable(result);

  });
};


function displayTable(listing) {
    var table = new Table

    table.push(
        [ 'ID', 'Name', 'Cost']
    );

    for(i in listing){
        table.push([listing[i].item_id,listing[i].product_name, listing[i].price]);
    }
    console.log(table.toString());
    runSearch();
}

// * Create a new Node application called `bamazonManager.js`. Running this application will:
//
//   * List a set of menu options:
//
//     * View Products for Sale
//
//     * View Low Inventory
//
//     * Add to Inventory
//
//     * Add New Product
//
//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
//
//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
//
//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//
//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
