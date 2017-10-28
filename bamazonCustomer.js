
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require('colors');


/*-------------------connecting to mysql database-----------------------*/

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});


connection.connect(function(err) {

    if (err) throw err;

    console.log('\n Welcome to Bamazon!'.cyan);

    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";

    connection.query(query, function (err, result, fields) {
        if (err) throw err;
    /*------passing the results from the mysql query to display the info from the database
    and make it availble to the user------*/
        displayTable(result);
        userInput(result);
    });

});
//makes an error message red
colors.setTheme({
    error: 'red',
    prompt: 'blue',
    data: 'green'
});

/*------------cli-table which is loaded after the connection is made to mysql-----------*/

function displayTable(listing) {
    var table = new Table

    table.push(
        [ 'ID', 'Name', 'Cost']

    );

    for(i in listing){
        table.push([listing[i].item_id,listing[i].product_name, listing[i].price]);
    }

    console.log(table.toString());
}
/*------------this prompts the user for 2-inputs:  product Id and quantity-------------------- */

function userInput(listing) {
    var questions = [{
        type: 'input',
        name: 'productId',
        message: 'Type the ID of the product you\'d like to buy.',
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || colors.error('Please enter a number');
        },
        filter: Number
    }, {
        type: 'input',
        name: 'quantity',
        message: 'How many units would you like to buy?',
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || colors.error('Please enter a number');
        },
        filter: Number
    }, ];

    inquirer.prompt(questions).then(function(answers) {

        if(listing[answers.productId-1].stock_quantity >= answers.quantity){
            var query = "UPDATE products SET stock_quantity = stock_quantity - " + answers.quantity + " WHERE item_id = " + answers.productId;
            connection.query(query,
                function (err, result, fields) {if (err) throw err;
                   console.log(colors.cyan('\nTotal cost: '+ listing[answers.productId-1].price*answers.quantity));
                   displayTable(listing);
                   userInput(listing);
               });
        }else{
            console.log('Insufficient quantitiy!'.red);
        }


    });
}
