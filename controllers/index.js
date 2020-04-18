const db = require("../db/models");

////////// Add Data Controllers //////////////////

let addIncomeToDb = (req, res) => {
    db.Income.create({
        date: req.body.date,
        name: req.body.name,
        amount: req.body.amount,
        userID: req.body.userID,
        afterSpendingAmount: req.body.amount
    })
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let addExpenseToDb = (req, res) => {
    db.Expenses.create({
        dateOfExpense: req.body.dateOfExpense,
        nameOfExpense: req.body.nameOfExpense,
        amountOfExpense: req.body.amountOfExpense,
        userID: req.body.userID, 
        isPlanned: false
    })
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let addUserToDb = (req, res) => {
    db.Users.create({
        email: req.body.email,
        profilePic: req.body.profilePic,
        firstName: req.body.firstName,
        lastName: req.body.lastName
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

let getAllIncomeByUserID = (req, res) => {
    //first, empty the the income array for the user
    // db.Users.updateOne({_id: req.params.userID}, { $set: { income: [] } }, { new: true })
    //     .then(data => {

    //             db.Income.find({userID: req.params.userID}) //find all income by userID
    //             .then(userIncomeArrayFromDB => {

    //                 userIncomeArrayFromDB.forEach(userIncomeRecordObject => {
    //                         db.Users.updateOne({_id: req.params.userID}, { $push: { income: userIncomeRecordObject._id } }, { new: true })
    //                         .then(data => console.log(data))
    //                         .catch(err => console.log(err))
    //                     });

    //                 })
    //             .catch(err => console.log(err));

    //         })
    //     .catch(err => console.log(err))

    db.Users.find({_id: req.params.userID})
    .populate('income')
    .then(data => console.log(data))
    .catch(err => console.log(err));
    
    
}

let getAllExpenses = (req, res) => {
    db.Expenses.find({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllUsers = (req, res) => {
    db.Users.find({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllPlannedExpenses = (req, res) => {
    db.Expenses.find({userID: req.params.userID, isPlanned: true})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllUnPlannedExpenses = (req, res) => {
    db.Expenses.find({userID: req.params.userID, isPlanned: false})
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

let getUserByID = (req, res) => {
    db.Users.find({_id: req.params.userID})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getUserByEmail = (req, res) => {
    db.Users.find({email: req.params.email})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAfterSpendingAmount = (req, res) => {
    db.Income.find({_id: req.params.incomeID})
    .then(data => res.json(data[0].afterSpendingAmount))
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

let updateAfterSpendingAmount = (req, res) => {
    let totalOfExpenses = 0;
    let availableIncomeAmount = 0;
    db.Expenses.find({fundingSource: req.params.incomeID}) //find expenses by funding source
    .then(data => {
        if (data[0] === undefined) { // if there are no expeses for a given funding source
            totalOfExpenses = 0;    // set the total of expenses to 0
        }else {                         //if there are expenses with that funding source id
            data.forEach(element => { // add all the amounts of those expenses together then..
                totalOfExpenses += parseFloat(element.amountOfExpense); // set set total of expenses to that number
            });
        }        
            db.Income.find({_id: req.params.incomeID})
            .then(data => {
                    availableIncomeAmount = parseFloat(data[0].amount) - totalOfExpenses;
                
                    db.Income.updateOne({_id: req.params.incomeID},
                        {$set: {
                                afterSpendingAmount: availableIncomeAmount
                                }
                        })
                    .then(data => res.json(data))
                    .catch(err => console.log(err));
                })
            .catch(err => console.log(err));
        })
    .catch(err => console.log(err));
}

module.exports = {
    addIncome: addIncomeToDb,
    addExpense: addExpenseToDb,
    addUser: addUserToDb,
    getAllIncome: getAllIncome,
    getAllExpenses: getAllExpenses,
    getAllUsers: getAllUsers,
    getExpenseByID: getExpenseByID,
    getIncomeByID: getIncomeByID,
    getAllIncomeByUserID: getAllIncomeByUserID,
    getUserByID: getUserByID,
    getUserByEmail: getUserByEmail,
    getAllPlannedExpenses: getAllPlannedExpenses,
    getAllUnPlannedExpenses: getAllUnPlannedExpenses,
    getAfterSpendingAmount: getAfterSpendingAmount,
    deleteExpense: deleteExpenseByID,
    deleteIncome: deleteIncomeByID,
    editExpense: editExpenseByID,
    editIncome: editIncomeByID,
    updateAfterSpendingAmount: updateAfterSpendingAmount
}