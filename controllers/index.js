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
        amountOfExpense: req.body.amountOfExpense,
        isPlanned: false
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

let getAllPlannedExpenses = (req, res) => {
    db.Expenses.find({isPlanned: true})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllUnPlannedExpenses = (req, res) => {
    db.Expenses.find({isPlanned: false})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

////////////// Update/Delete Data ///////////////////////

let deleteExpenseByID = (req, res) => {
    db.Expenses.deleteOne( { _id: req.body._id } )
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let deleteIncomeByID = (req, res) => {
    db.Income.deleteOne( { _id: req.body._id } )
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let editExpenseByID = (req, res) => {
    db.Expenses.updateOne({_id: req.body.data._id},
        {$set: {
                nameOfExpense: req.body.data.nameOfExpense,    
                dateOfExpense: req.body.data.dateOfExpense, 
                amountOfExpense: req.body.data.amountOfExpense,
                isPlanned: req.body.data.isPlanned,
                fundingSource: req.body.data.fundingSource
                }
        })
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

module.exports = {
    addIncome: addIncomeToDb,
    addExpense: addExpenseToDb,
    getAllIncome: getAllIncome,
    getAllExpenses: getAllExpenses,
    getAllPlannedExpenses: getAllPlannedExpenses,
    getAllUnPlannedExpenses: getAllUnPlannedExpenses,
    deleteExpense: deleteExpenseByID,
    deleteIncome: deleteIncomeByID,
    editExpense: editExpenseByID
}