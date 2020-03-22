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

let getExpenseByID = (req, res) => {
    db.Expenses.find({_id: req.params.expenseID})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getIncomeByID = (req, res) => {
    db.Income.find({_id: req.params.incomeID})
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

let editIncomeByID = (req, res) => {
    db.Income.updateOne({_id: req.body.data._id},
        {$set: {
                name: req.body.data.name,    
                date: req.body.data.date, 
                amount: req.body.data.amount
                }
        })
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getUpdatedCheckAfterSpendingAmount = (req, res) => {
    let totalOfExpenses = 0;
    let availableIncomeAmount = 0;
    
    db.Expenses.find({fundingSource: req.params.incomeID})
    .then(data => {
        data.forEach(element => {
            totalOfExpenses += parseFloat(element.amountOfExpense);
        });
            db.Income.find({_id: req.params.incomeID})
            .then(data => {
                    availableIncomeAmount = parseFloat(data[0].amount) - totalOfExpenses;
                    console.log(availableIncomeAmount);
                    return availableIncomeAmount;
                })
            .catch(err => console.log(err));
        })
    .catch(err => console.log(err));
}

module.exports = {
    addIncome: addIncomeToDb,
    addExpense: addExpenseToDb,
    getAllIncome: getAllIncome,
    getAllExpenses: getAllExpenses,
    getExpenseByID: getExpenseByID,
    getIncomeByID: getIncomeByID,
    getAllPlannedExpenses: getAllPlannedExpenses,
    getAllUnPlannedExpenses: getAllUnPlannedExpenses,
    deleteExpense: deleteExpenseByID,
    deleteIncome: deleteIncomeByID,
    editExpense: editExpenseByID,
    editIncome: editIncomeByID,
    getUpdatedCheckAfterSpendingAmount: getUpdatedCheckAfterSpendingAmount
}