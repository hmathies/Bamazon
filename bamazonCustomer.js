'use strict';
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require('colors');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: 'root',
	password:'',
	database: 'bamazon'
});

connection.connect(function(err){
	if (err) throw err;
	console.log('you\'re connected');
	runSearch();

});

var table = new Table({
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

table.push(
    ['foo', 'bar', 'baz']
  , ['frob', 'bar', 'quuz']
);

console.log(table.toString());

function runSearch() {
	var questions = [
	  {
	    type: 'input',
	    name: 'productId',
	    message: 'Type the ID of the product you\'d like to buy.'

	  },
	  {
	    type: 'input',
	    name: 'quantity',
	    message: 'How many units would you like to buy?',
	   
	  },
	];

	inquirer.prompt(questions).then(function (answers) {
	  console.log(JSON.stringify(answers, null, '  '));
	});
}