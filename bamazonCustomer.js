'use strict';
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
    console.log('\n Welcome to Bamazon!');
    displayTable();
    runSearch();

});
//makes an error message red
colors.setTheme({
    error: 'red'
});

/*------------cli-table which is loaded after the connection is made to mysql-*/
function displayTable() {
    var table = new Table({
//this is not formatting in the terminal

        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        }
    });

    table.push(
        ['ID', 'Name', 'Cost'], ['1', 'wisk', '$3.50'], ['2', 'shampoo', '$2.75'], ['3', 'conditioner', '$3.00'], ['4', 'spatula', '$6.99'], ['5', 'shaving cream', '$3.95'], ['6', 'olive oil', '$4.99'], ['7', 'perfume', '$39.99'], ['8', 'batteries', '$9.99'], ['9', 'sunscreen', '$2.99'], ['10', 'extension cord', '$5.95']

    );

    console.log(table.toString());
}
/*------------this prompts the user for 2-inputs: what product Id and how many-------------------------------- */
function runSearch() {
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
        console.log('\nTotal cost: ');
        console.log(JSON.stringify(answers, null, '  '));
    });
}