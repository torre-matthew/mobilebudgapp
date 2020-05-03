const db = require("../db/models");

////////// Add Data Controllers //////////////////

let addIncomeToDb = async (req, res) => {
    await db.Income
            .create({
                date: req.body.date,
                name: req.body.name,
                amount: req.body.amount,
                userID: req.body.userID,
                afterSpendingAmount: req.body.amount
                })
            .then(data => res.json(data))
            .catch(err => console.log(err));

//then, empty the the income array for the user
      await db.Users
                .updateOne({_id: req.body.userID}, { $set: { income: [] } }, { new: true })
                .then(data => res.json(data))
                .catch(err => console.log(err));

//then find all income with that userID  
      await db.Income
                .find({userID: req.body.userID}) 
                .then(userIncomeArrayFromDB => 
                    {
//then repopulate the income array on the user with the latest 
                        userIncomeArrayFromDB.forEach(userIncomeRecordObject => {
                            db.Users.updateOne({_id: req.body.userID}, { $push: { income: userIncomeRecordObject._id } }, { new: true })
                            .then(data => res.json(data))
                            .catch(err => console.log(err))
                            });
                    })
                .catch(err => console.log(err));
}

let addExpenseToDb = async (req, res) => {
    
    let arrayOfPlannedExpensesToBeSetInDB = [];
    let arrayOfUnPlannedExpensesToBeSetInDB = [];

// Add Expense to the db
    await db.Expenses
            .create({
                dateOfExpense: req.body.dateOfExpense,
                nameOfExpense: req.body.nameOfExpense,
                amountOfExpense: req.body.amountOfExpense,
                userID: req.body.userID, 
                isPlanned: false
                })
            .then(data => res.json(data))
            .catch(err => console.log(err));

//then empty the the expense arrays for the user
    await db.Users
            .updateOne({_id: req.body.userID}, { $set: { expenses: { planned: [], unPlanned: [] }}}, { new: true }) 
                    .then(data => res.json(data))
                    .catch(err => console.log(err))

//then find all the unplannend expenses from the expense table and push them to the arrays above.
    await db.Expenses
            .find({userID: req.body.userID, isPlanned: true})
            .then(arrayOfPlannedExpenses => 
                { 
                    arrayOfPlannedExpenses.forEach(userExpenseRecordObject => {
                        arrayOfPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                            });
                })
            .catch(err => console.log(err))

//then find all the plannend expenses from the expense table and push them to the arrays above.
    await db.Expenses
            .find({userID: req.body.userID, isPlanned: false})
            .then(arrayOfUnPlannedExpenses => 
                {
                    arrayOfUnPlannedExpenses.forEach(userExpenseRecordObject => {
                        arrayOfUnPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                            });
                })
            .catch(err => console.log(err))

//then updated the planned and unplanned expense record for that user in the db.
    await db.Users
            .updateOne({_id: req.body.userID}, { $set: { expenses: { planned: arrayOfPlannedExpensesToBeSetInDB, unPlanned: arrayOfUnPlannedExpensesToBeSetInDB}} }, { new: true })
            .then(data => res.json(data))
            .catch(err => console.log(err))
}

let addUserToDb = (req, res) => {
    db.Users
    .create({
        email: req.body.email,
        profilePic: req.body.profilePic,
        firstName: req.body.firstName,
        lastName: req.body.lastName
        })
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let addMonthToDb = (req, res) => {
    db.Month
    .create({
        month: req.body.month,
        year: req.body.year
        })
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

////////// Get Data Controllers //////////////////

let getAllIncome = (req, res) => {
    db.Income
    .find({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllIncomeByUserID = (req, res) => {
    db.Users
    .find({_id: req.params.userID})
    .populate('income')
    .then(data => res.json(data[0].income))
    .catch(err => console.log(err));
}

let getAllExpenses = (req, res) => {
    db.Expenses
    .find({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllUsers = (req, res) => {
    db.Users
    .find({})
    .populate('expenses')
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllPlannedExpenses = (req, res) => {
    db.Users
        .find({_id: req.params.userID})
        .populate('expenses.planned')
        .then(data => res.json(data[0].expenses.planned))
        .catch(err => console.log(err));
}

let getAllUnPlannedExpenses = (req, res) => {
    db.Users
        .find({_id: req.params.userID})
        .populate('expenses.unPlanned')
        .then(data => res.json(data[0].expenses.unPlanned))
        .catch(err => console.log(err));
}

let getExpenseByID = (req, res) => {
    db.Expenses
    .find({_id: req.params.expenseID})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getIncomeByID = (req, res) => {
    db.Income
    .find({_id: req.params.incomeID})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getUserByID = (req, res) => {
    db.Users
    .find({_id: req.params.userID})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getUserByEmail = (req, res) => {
    db.Users
    .find({email: req.params.email})
    .populate('income')
    .populate('expenses.planned')
    .populate('expenses.unPlanned')
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAfterSpendingAmount = (req, res) => {
    db.Income
    .find({_id: req.params.incomeID})
    .then(data => res.json(data[0].afterSpendingAmount))
    .catch(err => console.log(err));
}

let fetchData = async (req, res) => {

    let fetchedDataObject = {
        plannedExpenseDataArray: [],
        unPlannedExpenseDataArray: [],
        incomeDataArray: []
    }
    await db.Users
            .find({_id: req.params.userID})
            .populate('expenses.planned')
            .then(data => {fetchedDataObject.plannedExpenseDataArray.push(data[0].expenses.planned)})
            .catch(err => console.log(err));

    await db.Users
            .find({_id: req.params.userID})
            .populate('expenses.unPlanned')
            .then(data => {fetchedDataObject.unPlannedExpenseDataArray.push(data[0].expenses.unPlanned)})
            .catch(err => console.log(err));
    await db.Users
            .find({_id: req.params.userID})
            .populate('income')
            .then(data => {fetchedDataObject.incomeDataArray.push(data[0].income)})
            .catch(err => console.log(err));

    console.log(fetchedDataObject);
}

////////////// Update/Delete Data ///////////////////////

let deleteExpenseByID = (req, res) => {
    db.Expenses
    .deleteOne( { _id: req.body._id } )
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let deleteIncomeByID = (req, res) => {
    db.Income
    .deleteOne( { _id: req.body._id } )
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let editExpenseByID = async (req, res) => {
//editExpense
//updateExpenseOnUserRecord
//getIncome
//updateAfterSpendingAmount

let arrayOfPlannedExpensesToBeSetInDB = [];
let arrayOfUnPlannedExpensesToBeSetInDB = [];

    await db.Expenses
            .updateOne({_id: req.body.data._id},
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


    //then empty the the expense arrays for the user
    await db.Users
            .updateOne({_id: req.body.data.loggedInUserID}, { $set: { expenses: { planned: [], unPlanned: [] }}}, { new: true }) 
                    .then(data => res.json(data))
                    .catch(err => console.log(err))

//then find all the unplannend expenses from the expense table and push them to the arrays above.
    await db.Expenses
            .find({userID: req.body.data.loggedInUserID, isPlanned: true})
            .then(arrayOfPlannedExpenses => 
                { 
                    arrayOfPlannedExpenses.forEach(userExpenseRecordObject => {
                        arrayOfPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                            });
                })
            .catch(err => console.log(err))

//then find all the plannend expenses from the expense table and push them to the arrays above.
    await db.Expenses
            .find({userID: req.body.data.loggedInUserID, isPlanned: false})
            .then(arrayOfUnPlannedExpenses => 
                { 
                    arrayOfUnPlannedExpenses.forEach(userExpenseRecordObject => {
                        arrayOfUnPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                            });
                })
            .catch(err => console.log(err))

//then updated the planned and unplanned expense record for that user in the db.
    await db.Users
            .updateOne({_id: req.body.data.loggedInUserID}, { $set: { expenses: { planned: arrayOfPlannedExpensesToBeSetInDB, unPlanned: arrayOfUnPlannedExpensesToBeSetInDB}} }, { new: true })
            .then(data => res.json(data))
            .catch(err => console.log(err))

            
    await db.Income
            .find({userID: req.body.data.loggedInUserID})
            .then(incomeArray => {
                incomeArray.forEach(incomeObject => {
                    updateAfterSpendingAmountDuringExpenseEdit(incomeObject._id)
                    console.log("updateAfterSpending promise returned after editing expense")
                });
            })
            .catch(err => console.log(err));
}

let editIncomeByID = (req, res) => {
    db.Income
    .updateOne({_id: req.body.data._id},
        {$set: {
                name: req.body.data.name,    
                date: req.body.data.date, 
                amount: req.body.data.amount
                }
        })
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let updateIncomeOnUserRecord = (req, res) => {
    //first, empty the the income array for the user
    db.Users
        .updateOne({_id: req.params.userID}, { $set: { income: [] } }, { new: true })
            .then(data => {
        //then find all income with that userID
                db.Income.find({userID: req.params.userID}) 
                .then(userIncomeArrayFromDB => {
    //then repopulate the income array on the user with the latest 
                    userIncomeArrayFromDB.forEach(userIncomeRecordObject => {
                            db.Users.updateOne({_id: req.params.userID}, { $push: { income: userIncomeRecordObject._id } }, { new: true })
                            .then(data => res.json(data))
                            .catch(err => console.log(err))
                        });

                    })
                .catch(err => console.log(err));
                })
            .catch(err => console.log(err))
}

let updateExpensesOnUserRecord = (req, res) => {

    let arrayOfPlannedExpensesToBeSetInDB = [];
    let arrayOfUnPlannedExpensesToBeSetInDB = [];
    //first, empty the the expense arrays for the user
    db.Users
    .updateOne({_id: req.params.userID}, { $set: { expenses: { planned: [], unPlanned: [] }}}, { new: true }) 
                    .then(userExpensesArrayFromDB => {
    //then find all the unplannend and planned expenses from the expense table and push them to the arrays above.
                        db.Expenses
                            .find({userID: req.params.userID, isPlanned: true})
                            .then(arrayOfPlannedExpenses => 
                                { 
                                    arrayOfPlannedExpenses.forEach(userExpenseRecordObject => {
                                        arrayOfPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                                            });
                                })
                            .catch(err => console.log(err))

                        db.Expenses
                        .find({userID: req.params.userID, isPlanned: false})
                        .then(arrayOfUnPlannedExpenses => { 
                                arrayOfUnPlannedExpenses.forEach(userExpenseRecordObject => {
                                    arrayOfUnPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                                        });

//then updated the planned and unplanned expense record for that user in the db.
                                db.Users
                                .updateOne({_id: req.params.userID}, { $set: { expenses: { planned: arrayOfPlannedExpensesToBeSetInDB, unPlanned: arrayOfUnPlannedExpensesToBeSetInDB}} }, { new: true })
                                .then(data => res.json(data))
                                .catch(err => console.log(err))
                            
                            })
                        .catch(err => console.log(err))
                    })
                .catch(err => console.log(err));

}

let updateAfterSpendingAmount = (req, res) => {
    let totalOfExpenses = 0;
    let availableIncomeAmount = 0;
    db.Expenses
    .find({fundingSource: req.params.incomeID}) //find expenses by funding source
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
                    .then(data => {res.json(data)})
                    .catch(err => console.log(err));
                })
            .catch(err => console.log(err));
        })
    .catch(err => console.log(err));
}

let updateAfterSpendingAmountDuringExpenseEdit = (fundingSource) => {
    let totalOfExpenses = 0;
    let availableIncomeAmount = 0;
    db.Expenses
    .find({fundingSource: fundingSource}) //find expenses by funding source
    .then(data => {
        
        if (data[0] === undefined) { // if there are no expeses for a given funding source
            totalOfExpenses = 0;    // set the total of expenses to 0
        }else {                         //if there are expenses with that funding source id
            data.forEach(element => { // add all the amounts of those expenses together then..
                totalOfExpenses += parseFloat(element.amountOfExpense); // set set total of expenses to that number
            });
        }        
            db.Income.find({_id: fundingSource})
            .then(data => {
                    availableIncomeAmount = parseFloat(data[0].amount) - totalOfExpenses;
                
                    db.Income.updateOne({_id: fundingSource},
                        {$set: {
                                afterSpendingAmount: availableIncomeAmount
                                }
                        })
                    .then(data => {})
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
    addMonthToDb: addMonthToDb,
    getAllIncome: getAllIncome,
    fetchData: fetchData,
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
    updateAfterSpendingAmount: updateAfterSpendingAmount,
    updateIncomeOnUserRecord: updateIncomeOnUserRecord,
    updateExpensesOnUserRecord: updateExpensesOnUserRecord
}