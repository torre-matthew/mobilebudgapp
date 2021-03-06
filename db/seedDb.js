const mongoose = require("mongoose");
const db = require("./models");

// Connect to the Mongo DB
// This enables the db to be seeded without having to start the server
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budgetAppDB", { useNewUrlParser: true });

const incomeData = [
    {
        "date": "10/1",
        "name": "Paycheck 1 from DB",
        "amount": "1000"
    },
    {
        "date": "10/15",
        "name": "Paycheck 2 from DB",
        "amount": "3000"
    },
];

const expenseData = [
    {
        "dateOfExpense": "10/13",
        "nameOfExpense": "Spectrum from DB",
        "amountOfExpense": "101.97",
        "isPlanned": false,
    },
    {
        "dateOfExpense": "10/1",
        "nameOfExpense": "Mortgage from DB",
        "amountOfExpense": "1836",
        "isPlanned": false,
    },
    {
        "dateOfExpense": "10/15",
        "nameOfExpense": "Car Payment from DB",
        "amountOfExpense": "450",
        "isPlanned": false,
    },
    {
        "dateOfExpense": "10/26",
        "nameOfExpense": "Duke Engergy Progress from DB",
        "amountOfExpense": "183",
        "isPlanned": false,
    },
];

let seedIncomeData = (callback) => {
    db.Income
    .deleteMany({})
    .then(() => db.Income.insertMany(incomeData))
    .then(data => {
        console.log(data.length + " income records added to DB!!!");
        callback();
    })
    .catch(err => {
        console.error(err);
    });


}

let seedExpenseData = () => {
    db.Expenses
    .deleteMany({})
    .then(() => db.Expenses.insertMany(expenseData))
    .then(data => {
        console.log(data.length + " expense records added to DB!!!");
    })
    .catch(err => {
        console.error(err);
    });
}

let getFundingSourceID = () => {
    db.Income
    .findOne({name:"Paycheck 1 from DB"})
    .then(data => {
        console.log(data._id);
        associateFundingSource(String(data._id))
    })
    .catch(err => {
        console.error(err);
    });
}

let associateFundingSource = (id) => {
    db.Expenses
    .findOneAndUpdate(
        {nameOfExpense: "Mortgage from DB"},
        {$set: {fundingSource: id, isPlanned: true}},
        {new: true}
    )
    .then(data => {
        console.log(data);
    })
    .then()
    .catch(err => {
        console.error(err);
    });
}

seedIncomeData(getFundingSourceID);
seedExpenseData();