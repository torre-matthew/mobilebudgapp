const db = require("../db/models");

////////// Add Data Controllers //////////////////

let addIncomeToDb = async (req, res) => {
    await db.Income
            .create({
                date: req.body.date,
                name: req.body.name,
                amount: req.body.amount,
                userID: req.body.userID,
                afterSpendingAmount: req.body.amount,
                monthID: req.body.monthID
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

let addIncomeWhenCopyingPreviousMonth = async (date, name, amount, userID, afterSpendingAmount, monthID) => {
    await db.Income
            .create({
                date: date,
                name: name,
                amount: amount,
                userID: userID,
                afterSpendingAmount: afterSpendingAmount,
                monthID: monthID
                })
            .then(data => console.log("Income record successfully created"))
            .catch(err => console.log(err));

//then, empty the the income array for the user
      await db.Users
                .updateOne({_id: userID}, { $set: { income: [] } }, { new: true })
                .then(data => console.log("Income Array Emptied"))
                .catch(err => console.log(err));

//then find all income with that userID  
      await db.Income
                .find({userID: userID}) 
                .then(userIncomeArrayFromDB => 
                    {
//then repopulate the income array on the user with the latest 
                        userIncomeArrayFromDB.forEach(userIncomeRecordObject => {
                            db.Users.updateOne({_id: userID}, { $push: { income: userIncomeRecordObject._id } }, { new: true })
                            .then(data => console.log("Income Array Repopulated"))
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
                isPlanned: false,
                isPaid: false,
                monthID: req.body.monthID
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

let addExpenseWhenCopyingPreviousMonth = async (dateOfExpense, nameOfExpense, amountOfExpense, userID, isPlanned, monthID, fundingSource, isPaid) => {
    
    let arrayOfPlannedExpensesToBeSetInDB = [];
    let arrayOfUnPlannedExpensesToBeSetInDB = [];

// Add Expense to the db
    await db.Expenses
            .create({
                dateOfExpense: dateOfExpense,
                nameOfExpense: nameOfExpense,
                amountOfExpense: amountOfExpense,
                userID: userID, 
                isPlanned: false,
                isPaid: false,
                monthID: monthID
                })
            .then(data => {})
            .catch(err => console.log(err));

//then empty the the expense arrays for the user
    await db.Users
            .updateOne({_id: userID}, { $set: { expenses: { planned: [], unPlanned: [] }}}, { new: true }) 
                    .then(data => {})
                    .catch(err => console.log(err))

//then find all the unplannend expenses from the expense table and push them to the arrays above.
    await db.Expenses
            .find({userID: userID, isPlanned: true})
            .then(arrayOfPlannedExpenses => 
                { 
                    arrayOfPlannedExpenses.forEach(userExpenseRecordObject => {
                        arrayOfPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                            });
                })
            .catch(err => console.log(err))

//then find all the plannend expenses from the expense table and push them to the arrays above.
    await db.Expenses
            .find({userID: userID, isPlanned: false})
            .then(arrayOfUnPlannedExpenses => 
                {
                    arrayOfUnPlannedExpenses.forEach(userExpenseRecordObject => {
                        arrayOfUnPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                            });
                })
            .catch(err => console.log(err))

//then updated the planned and unplanned expense record for that user in the db.
    await db.Users
            .updateOne({_id: userID}, { $set: { expenses: { planned: arrayOfPlannedExpensesToBeSetInDB, unPlanned: arrayOfUnPlannedExpensesToBeSetInDB}} }, { new: true })
            .then(data => {})
            .catch(err => console.log(err))
}

let copyPreviousMonthsData = async (req, res) => {

    // ID of previous month
    //ID of target month
    //ID of user
    // addIncomeWhenCopyingPreviousMonth = async (date, name, amount, userID, afterSpendingAmount, monthID)
    
    await db.Income
            .find({monthID: req.body.previousMonthID, userID: req.body.userID})
            .then(incomeDataArray => {
                incomeDataArray.forEach(incomeObject => {
                    addIncomeWhenCopyingPreviousMonth(incomeObject.date, incomeObject.name, incomeObject.amount, incomeObject.userID, incomeObject.amount, req.body.targetMonthID);
                })
            })
            .catch(err => console.log(err));
    // addExpenseWhenCopyingPreviousMonth = async (dateOfExpense, nameOfExpense, amountOfExpense, userID, isPlanned, monthID, fundingSource, isPaid)
     await db.Expenses
            .find({userID: req.body.userID, monthID: req.body.previousMonthID})
            .then(expenseDataArray => {
                expenseDataArray.forEach(expenseObject => {
                    addExpenseWhenCopyingPreviousMonth(expenseObject.dateOfExpense, expenseObject.nameOfExpense, expenseObject.amountOfExpense, expenseObject.userID, false, req.body.targetMonthID, "", false);
                })
            })
            .catch(err => console.log(err));
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
        monthAsNumber: req.body.monthAsNumber,
        year: req.body.year,
        month: req.body.month
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
    // db.Users
    // .find({_id: req.params.userID})
    // .populate('income')
    // .then(data => res.json(data[0].income))
    // .catch(err => console.log(err));

    // db.Users
    // .find({_id: req.params.userID}, {income: {$elemMatch: {monthID: req.params.monthID}}})
    // // .populate('income')
    // .then(data => res.json(data))
    // .catch(err => console.log(err));

    db.Income
    .find({userID: req.params.userID, monthID: req.params.monthID})
    .then(data => res.json(data))
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
    // db.Users
    //     .find({_id: req.params.userID})
    //     .populate('expenses.planned')
    //     .then(data => res.json(data[0].expenses.planned))
    //     .catch(err => console.log(err));

    db.Expenses
    .find({userID: req.params.userID, monthID: req.params.monthID, isPlanned: true})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllUnPlannedExpenses = (req, res) => {
    // db.Users
    //     .find({_id: req.params.userID})
    //     .populate('expenses.unPlanned')
    //     .then(data => res.json(data[0].expenses.unPlanned))
    //     .catch(err => console.log(err));


    db.Expenses
    .find({userID: req.params.userID, monthID: req.params.monthID, isPlanned: false})
    .then(data => res.json(data))
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

let getMonthData = (req, res) => {
    db.Month
    .find({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getCurrentMonth = (req, res) => {
    db.Month
    .find({monthAsNumber: new Date().getMonth()})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

////////////// Update/Delete Data ///////////////////////

let deleteExpenseByID = (req, res) => {
    db.Expenses
    .deleteOne( { _id: req.body._id } )
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let deleteIncomeByID = async (req, res) => {
    
    await db.Expenses //first find the expenses that were funded with that income and marke unpaid, unplanned, and clear fundingsource
            .updateMany({fundingSource: req.body._id},
                {$set: {
                        isPaid: false,
                        isPlanned: false,
                        fundingSource: ""    
                        }
                })
            .then(data => res.json(data))
            .catch(err => console.log(err));
    
    await db.Income
            .deleteOne( { _id: req.body._id } )
            .then(data => res.json(data))
            .catch(err => console.log(err));
}

let deleteAllMonthData = () => {
    db.Month
    .deleteMany({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let markExpenseAsPaid = (req, res) => {
    db.Expenses
            .updateOne({_id: req.body.data._id},
                {$set: { isPaid: req.body.data.isPaid}
                })
            .then(data => res.json(data))
            .catch(err => console.log(err));
}

let editExpenseByID = async (req, res) => {

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
                    updateAfterSpendingAmountDuringExpenseORIncomeEdit(incomeObject._id)
                });
            })
            .catch(err => console.log(err));
}

let editIncomeByID = async (req, res) => {
    await db.Income
            .updateOne({_id: req.body.data._id},
                {$set: {
                        name: req.body.data.name,    
                        date: req.body.data.date, 
                        amount: req.body.data.amount
                        }
                })
            .then(data => res.json(data))
            .catch(err => console.log(err));

    await updateAfterSpendingAmountDuringExpenseORIncomeEdit(req.body.data._id);
}

let bulkUpdate = async(req, res) => {
    await db.Expenses
            .updateMany({},
                {$set: {
                        isPaid: false,    
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

let updateAfterSpendingAmountDuringExpenseORIncomeEdit = (fundingSource) => {
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
    getMonthData: getMonthData,
    getExpenseByID: getExpenseByID,
    getIncomeByID: getIncomeByID,
    getAllIncomeByUserID: getAllIncomeByUserID,
    getUserByID: getUserByID,
    getUserByEmail: getUserByEmail,
    getAllPlannedExpenses: getAllPlannedExpenses,
    getAllUnPlannedExpenses: getAllUnPlannedExpenses,
    getAfterSpendingAmount: getAfterSpendingAmount,
    getCurrentMonth: getCurrentMonth,
    deleteExpense: deleteExpenseByID,
    deleteIncome: deleteIncomeByID,
    deleteAllMonthData: deleteAllMonthData,
    editExpense: editExpenseByID,
    editIncome: editIncomeByID,
    markExpenseAsPaid: markExpenseAsPaid,
    bulkUpdate:bulkUpdate,
    updateAfterSpendingAmount: updateAfterSpendingAmount,
    updateIncomeOnUserRecord: updateIncomeOnUserRecord,
    updateExpensesOnUserRecord: updateExpensesOnUserRecord,
    copyPreviousMonthsData: copyPreviousMonthsData

}