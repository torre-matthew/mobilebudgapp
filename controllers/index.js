const db = require("../db/models");

////////// Add Data Controllers //////////////////

let addIncomeToDb = (req, res) => {
    db.Income.create({
        date: req.body.date,
        name: req.body.name,
        amount: req.body.amount
    })
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let addExpenseToDb = (req, res) => {
    db.Expenses.create({
        dateOfExpense: req.body.dateOfExpense,
        nameOfExpense: req.body.nameOfExpense,
        amountOfExpense: req.body.amountOfExpense
    })
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

////////// Get Data Controllers //////////////////

let getAllIncome = (req, res) => {
    db.Income.find({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllExpenses = (req, res) => {
    db.Expenses.find({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

////////////// Update/Delete Data ///////////////////////

let deleteExpenseByID = (req, res) => {
    db.Expenses.remove( { _id: req.body._id } )
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

module.exports = {
    addIncome: addIncomeToDb,
    addExpense: addExpenseToDb,
    getAllIncome: getAllIncome,
    getAllExpenses: getAllExpenses,
    deleteExpense: deleteExpenseByID
}