const db = require("../db/models");
require('dotenv').config();

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
            .then(data => {})
            .catch(err => console.log(err));

//then, empty the the income array for the user
      await db.Users
                .updateOne({_id: userID}, { $set: { income: [] } }, { new: true })
                .then(data => {return data})
                .catch(err => console.log(err));

//then find all income with that userID  
      await db.Income
                .find({userID: userID}) 
                .then(userIncomeArrayFromDB => 
                    {
//then repopulate the income array on the user with the latest 
                        userIncomeArrayFromDB.forEach(userIncomeRecordObject => {
                            db.Users.updateOne({_id: userID}, { $push: { income: userIncomeRecordObject._id } }, { new: true })
                            .then(data => {return data})
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
                isPaid: false,
                monthID: req.body.monthID,
                forBillTracker: req.body.forBillTracker,
                fundingSource: req.body.fundingSource,
                isPlanned: req.body.isPlanned
                })
            .then(data => res.json(data))
            .catch(err => console.log(err));

//then empty the the expense arrays for the user
    await db.Users
            .updateOne({_id: req.body.userID}, { $set: { expenses: { planned: [], unPlanned: [] }}}, { new: true }) 
                    .then(data => res.json(data))
                    .catch(err => console.log(err))

//then find all the plannend expenses from the expense table and push them to the arrays above.
    await db.Expenses
            .find({userID: req.body.userID, isPlanned: true})
            .then(arrayOfPlannedExpenses => 
                { 
                    arrayOfPlannedExpenses.forEach(userExpenseRecordObject => {
                        arrayOfPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                            });
                })
            .catch(err => console.log(err))

//then find all the unplannend expenses from the expense table and push them to the arrays above.
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

let addOneMonthToDateWhenCopyingPreviousMonth = (dateString) => {
    let dateMonth = new Date(Date.parse(dateString)).getMonth();
    let dateDay = new Date(Date.parse(dateString)).getDate();
    let dateYear = new Date(Date.parse(dateString)).getFullYear();
    let newDate = '';

    if (dateMonth === 11) {
        newDate = new Date(dateYear + 1, 0, dateDay);
        return newDate;
    } else {
        newDate = new Date(dateYear, dateMonth + 1, dateDay);
        return newDate;
    }
}

let addExpenseWhenCopyingPreviousMonth = async (dateOfExpense, nameOfExpense, amountOfExpense, userID, isPlanned, monthID, fundingSource, isPaid, categoryName, categoryID, forBillTracker) => {
    
    let arrayOfPlannedExpensesToBeSetInDB = [];
    let arrayOfUnPlannedExpensesToBeSetInDB = [];

// Add Expense to the db
    await db.Expenses
            .create({
                dateOfExpense: addOneMonthToDateWhenCopyingPreviousMonth(dateOfExpense),
                nameOfExpense: nameOfExpense,
                amountOfExpense: amountOfExpense,
                userID: userID, 
                isPlanned: false,
                isPaid: false,
                monthID: monthID,
                categoryName: categoryName,
                categoryID: categoryID,
                forBillTracker: forBillTracker
                })
            .then(data => {return data})
            .catch(err => console.log(err));

//then empty the the expense arrays for the user
    await db.Users
            .updateOne({_id: userID}, { $set: { expenses: { planned: [], unPlanned: [] }}}, { new: true }) 
                    .then(data => {return data})
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
            .then(data => {return data})
            .catch(err => console.log(err))
}

let copyPreviousMonthsData = (req, res) => {

    
     db.Income
            .find({monthID: req.body.previousMonthID, userID: req.body.userID})
            .then(incomeDataArray => {
                incomeDataArray.forEach(incomeObject => {
                    addIncomeWhenCopyingPreviousMonth(incomeObject.date, incomeObject.name, incomeObject.amount, incomeObject.userID, incomeObject.amount, req.body.targetMonthID);
                })
            })
            .catch(err => console.log(err));

    
    db.Expenses
            .find({userID: req.body.userID, monthID: req.body.previousMonthID})
            .then(expenseDataArray => {
                expenseDataArray.forEach(expenseObject => {
                    addExpenseWhenCopyingPreviousMonth(expenseObject.dateOfExpense, expenseObject.nameOfExpense, expenseObject.amountOfExpense, expenseObject.userID, false, req.body.targetMonthID, "", false, expenseObject.categoryName, expenseObject.categoryID, expenseObject.forBillTracker);
                })
            })
            .catch(err => console.log(err));
    }

let splitEntry = (req, res) => {

    //find the bill/expense being split
     db.Expenses 
        .find({_id: req.params.billID})
        .then(data => {
     
    //create a new expense that splits the amount of the original one in half       
        db.Expenses
            .create({
                dateOfExpense: data[0].dateOfExpense,
                nameOfExpense: 'Split from ' + data[0].nameOfExpense,
                amountOfExpense: ((parseFloat(data[0].amountOfExpense)/2).toFixed(2)).toString(),
                userID: data[0].userID, 
                isPlanned: false,
                isPaid: false,
                monthID: data[0].monthID,
                categoryName: data[0].categoryName,
                categoryID: data[0].categoryID,
                forBillTracker: data[0].forBillTracker
                })
            .then(data => {return data})
            .catch(err => console.log(err));

    //update the amount of the original bill/expense to be half it's original value. Since it was just split
            editExpenseByIDToUseInOtherMethods(req.params.billID, data[0].nameOfExpense, data[0].dateOfExpense, ((parseFloat(data[0].amountOfExpense)/2).toFixed(2)).toString(), data[0].userID);
        })
        .catch(err => console.log(err));
}

let moveToNextMonth = async (req, res) => {
    let currentMonthInfo = {};
    let nextMonthDateInfo = {};
    let currentMonthID = "";
    let nextMonthID = "";
    let loggedInUserID = "";

// Find the monthID of the bill/expense that's beign moved to the next month
  await db.Expenses
        .find({_id: req.params.billID})
        .then(data => {

        loggedInUserID = data[0].userID;
        currentMonthID = data[0].monthID;

        })
        .catch(err => console.log(err));

// Get the month and year of the month the bill/expense currently exists in 
    await db.Month
        .find({_id: currentMonthID})
        .then(data => {
        // Month and year of current bill/expense
        currentMonthInfo = { month: data[0].monthAsNumber, year: data[0].year }
        if (data[0].monthAsNumber === 11) {
                nextMonthDateInfo = { month: 0, year: data[0].year + 1 }
            } else {
                nextMonthDateInfo = { month: data[0].monthAsNumber + 1, year: data[0].year }
            }
        })
        .catch(err => console.log(err));


        // Get the monthID of the month that the bill/expense is being moved to 
  await db.Month
        .find({monthAsNumber: nextMonthDateInfo.month, year: nextMonthDateInfo.year})
        .then(data => {
            nextMonthID = data[0]._id;
        })
        .catch(err => console.log(err));

// Update the monthID for the expense

await db.Expenses
        .updateOne({_id: req.params.billID},
            {$set: {
                monthID: nextMonthID,
                isPlanned: false,
                isPaid: false,
                fundingSource: ""
                    }
            })
        .then(data => {return data})
        .catch(err => console.log(err));

// then update the expense info on the user record
await updateExpenseInfoOnUserRecordAfterEdit(loggedInUserID);

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

let addCategoryToDb = (req, res) => {
    db.Category
    .create({
        categoryName: req.body.categoryName
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

let getAllCategories = (req, res) => {
    db.Category
    .find().sort({categoryName: 1})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllIncomeByUserID = (req, res) => {
    db.Income
    .find({userID: req.params.userID, monthID: req.params.monthID})
    .sort({date: 1})
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
    db.Expenses
    .find({userID: req.params.userID, monthID: req.params.monthID, isPlanned: true})
    .sort({categoryName: 1, nameOfExpense: 1})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getAllPlannedExpensesByIncomeID = (req, res) => {
    db.Expenses
    .find({userID: req.params.userID, monthID: req.params.monthID, fundingSource: req.params.incomeID, isPlanned: true})
    .sort({categoryName: 1, nameOfExpense: 1})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getBillTrackerItems = (req, res) => {
    db.Expenses
    .find({userID: req.params.userID, monthID: req.params.monthID, forBillTracker: true})
    .sort({dateOfExpense: 1, categoryName: 1, nameOfExpense: 1})
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
    .sort({categoryName: 1, nameOfExpense: 1})
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
    .sort({date: 1})
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
    .sort({year: 1})
    .sort({monthAsNumber: 1})
    .then(data => res.json(data))
    .catch(err => console.log(err));
}

let getCurrentMonth = (req, res) => {
    db.Month
    .find({monthAsNumber: new Date().getMonth(), year: new Date().getFullYear()})
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

let addToBillTracker = (req, res) => {
    db.Expenses
            .updateOne({_id: req.body.data._id},
                {$set: { forBillTracker: true}
                })
            .then(data => res.json(data))
            .catch(err => console.log(err));
}

let removeFromBillTracker = (req, res) => {
    db.Expenses
            .updateOne({_id: req.params.billID},
                {$set: { forBillTracker: false}
                })
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

let editExpenseByIDToUseInOtherMethods = async (expenseID, nameOfExpense, dateOfExpense, amountOfExpense, loggedInUserID) => {

    let arrayOfPlannedExpensesToBeSetInDB = [];
    let arrayOfUnPlannedExpensesToBeSetInDB = [];
    
        await db.Expenses
                .updateOne({_id: expenseID},
                    {$set: {
                            nameOfExpense: nameOfExpense,    
                            dateOfExpense: dateOfExpense, 
                            amountOfExpense: amountOfExpense,
                            }
                    })
                .then(data => {return data})
                .catch(err => console.log(err));
    
    
        //then empty the the expense arrays for the user
        await db.Users
                .updateOne({_id: loggedInUserID}, { $set: { expenses: { planned: [], unPlanned: [] }}}, { new: true }) 
                        .then(data => {return data})
                        .catch(err => console.log(err))
    
    //then find all the unplannend expenses from the expense table and push them to the arrays above.
        await db.Expenses
                .find({userID: loggedInUserID, isPlanned: true})
                .then(arrayOfPlannedExpenses => 
                    { 
                        arrayOfPlannedExpenses.forEach(userExpenseRecordObject => {
                            arrayOfPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                                });
                    })
                .catch(err => console.log(err))
    
    //then find all the plannend expenses from the expense table and push them to the arrays above.
        await db.Expenses
                .find({userID: loggedInUserID, isPlanned: false})
                .then(arrayOfUnPlannedExpenses => 
                    { 
                        arrayOfUnPlannedExpenses.forEach(userExpenseRecordObject => {
                            arrayOfUnPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                                });
                    })
                .catch(err => console.log(err))
    
    //then updated the planned and unplanned expense record for that user in the db.
        await db.Users
                .updateOne({_id: loggedInUserID}, { $set: { expenses: { planned: arrayOfPlannedExpensesToBeSetInDB, unPlanned: arrayOfUnPlannedExpensesToBeSetInDB}} }, { new: true })
                .then(data => {return data})
                .catch(err => console.log(err))
    
                
        await db.Income
                .find({userID: loggedInUserID})
                .then(incomeArray => {
                    incomeArray.forEach(incomeObject => {
                        updateAfterSpendingAmountDuringExpenseORIncomeEdit(incomeObject._id)
                    });
                })
                .catch(err => console.log(err));
    }

let updateExpenseInfoOnUserRecordAfterEdit = async (loggedInUserID) => {

    let arrayOfPlannedExpensesToBeSetInDB = [];
    let arrayOfUnPlannedExpensesToBeSetInDB = [];

    //then empty the the expense arrays for the user
        await db.Users
        .updateOne({_id: loggedInUserID}, { $set: { expenses: { planned: [], unPlanned: [] }}}, { new: true }) 
                .then(data => {return data})
                .catch(err => console.log(err))

        //then find all the unplannend expenses from the expense table and push them to the arrays above.
        await db.Expenses
            .find({userID: loggedInUserID, isPlanned: true})
            .then(arrayOfPlannedExpenses => 
                { 
                    arrayOfPlannedExpenses.forEach(userExpenseRecordObject => {
                        arrayOfPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                            });
                })
            .catch(err => console.log(err))

        //then find all the plannend expenses from the expense table and push them to the arrays above.
        await db.Expenses
            .find({userID: loggedInUserID, isPlanned: false})
            .then(arrayOfUnPlannedExpenses => 
                { 
                    arrayOfUnPlannedExpenses.forEach(userExpenseRecordObject => {
                        arrayOfUnPlannedExpensesToBeSetInDB.push(userExpenseRecordObject._id);
                            });
                })
            .catch(err => console.log(err))

        //then updated the planned and unplanned expense record for that user in the db.
        await db.Users
            .updateOne({_id: loggedInUserID}, { $set: { expenses: { planned: arrayOfPlannedExpensesToBeSetInDB, unPlanned: arrayOfUnPlannedExpensesToBeSetInDB}} }, { new: true })
            .then(data => {return data})
            .catch(err => console.log(err))

            
        await db.Income
            .find({userID: loggedInUserID})
            .then(incomeArray => {
                incomeArray.forEach(incomeObject => {
                    updateAfterSpendingAmountDuringExpenseORIncomeEdit(incomeObject._id)
                });
            })
            .catch(err => console.log(err));
}

let addCategoryToEntryByCategoryID = (req, res) => {
    db.Expenses
            .updateOne({_id: req.body.data._id},
                {$set: {
                        categoryName: req.body.data.categoryName,
                        categoryID: req.body.data.categoryID,    
                        }
                })
            .then(data => res.json(data))
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

let editCategoryByID = (req, res) => {
    db.Category
        .updateOne({_id: req.body._id},
            {$set: {
                    categoryName: req.body.name,    
                    }
            })
        .then(data => res.json(data))
        .catch(err => console.log(err));
}

let bulkUpdate = (req, res) => {
        db.Category
            .create({
                categoryName: req.body.categoryName
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
            db.Income.find({_id: req.params.incomeID}) //then find that income record
            .then(data => {
                    availableIncomeAmount = (parseFloat(data[0].amount) - totalOfExpenses).toFixed(2); //subtract the total expenses from the total for that expense.
                
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
                    availableIncomeAmount = (parseFloat(data[0].amount) - totalOfExpenses).toFixed(2);
                
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

///////////////////////////////////////////////////////////// Plaid ///////////////////////////////////////////////////////////////////////////////////////


let calculateCategoryTotalsPerMonth = (req, res) => {
    let categoryTotal = 0;

    db.Expenses
    .find({userID: req.params.userID, monthID: req.params.monthID, categoryID: req.params.categoryID})
    .then(expenses => {
        expenses.forEach(expenseRecord => {
            categoryTotal += parseFloat(expenseRecord.amountOfExpense)
        })
        
        let total = categoryTotal.toFixed(2);
        res.json(total);
    })
    .catch(err => console.log(err));
}

let getPlannedItemsTotalForLastThreeMonths = (req, res) => {

    let currentMonth = new Date().getMonth(); 
    let currentYear = new Date().getFullYear();
    let monthOne;
    let yearOfMonthOne;
    let monthOneID;
    let monthTwo;
    let yearOfMonthTwo;
    let monthTwoID;
    let monthThree;
    let yearOfMonthThree;
    let monthThreeID;
    let monthIDArray = [];

    class ThreeMonths {
        constructor(userID) {
        this.userID = userID;
        }
        
        stepOneDetermineCorrectMonthsAndYears = () => {
            switch (currentMonth) {
                case 2:
                    monthOne = currentMonth - 1;
                    yearOfMonthOne = currentYear;
                    monthTwo = currentMonth - 2,
                    yearOfMonthTwo = currentYear;
                    monthThree = 11;
                    yearOfMonthThree = currentYear - 1;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree);
                case 1:
                    monthOne = currentMonth - 1;
                    yearOfMonthOne = currentYear;
                    monthTwo = 11,
                    yearOfMonthTwo = currentYear - 1;
                    monthThree = 10;
                    yearOfMonthThree = currentYear - 1;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree);
                case 0:
                    monthOne = 11;
                    yearOfMonthOne = currentYear - 1;
                    monthTwo = 10,
                    yearOfMonthTwo = currentYear - 1;
                    monthThree = 9;
                    yearOfMonthThree = currentYear - 1;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree);
                default:
                    monthOne = currentMonth - 1;
                    yearOfMonthOne = currentYear;
                    monthTwo = currentMonth - 2;
                    yearOfMonthTwo = currentYear;
                    monthThree = currentMonth - 3;
                    yearOfMonthThree = currentYear;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree);
                }

        }
        
        stepTwoGetMonthIDsArray = async (monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree) => {
            await db.Month
                    .find({monthAsNumber: monthOne, year: yearOfMonthOne})
                    .then(data => {
                        monthIDArray.push(data[0]._id);
                        return monthIDArray;
                        })
                    .catch(err => console.log(err));
        
            await  db.Month
                    .find({monthAsNumber: monthTwo, year: yearOfMonthTwo})
                    .then(data => {
                        monthIDArray.push(data[0]._id);
                        return monthIDArray;
                        })
                    .catch(err => console.log(err));
        
            await db.Month
                    .find({monthAsNumber: monthThree, year: yearOfMonthThree})
                    .then(data => {
                        monthIDArray.push(data[0]._id);
                        console.log(monthIDArray);
                        
                        this.stepThreeGetPlannedItems(monthIDArray);

                        })
                    .catch(err => console.log(err));
        }

        stepThreeGetPlannedItems = (arrayOfMonthIDs) => {
                db.Expenses
                    .find({
                        userID: this.userID, 
                        monthID: arrayOfMonthIDs,
                        categoryID: {$nin: ["5eee765ec9306a0017b70fed", "5eee735cd0da5700175fd6ad", "5fc07d71df69b9001704ccb1"]},
                        isPlanned: true
                    })
                    .sort({categoryName: 1, nameOfExpense: 1})
                    .then(arrayOfItems => {
                        console.log(arrayOfItems);
                        this.stepFourCalculateTotal(arrayOfItems);
                    })
                    .catch(err => console.log(err));
        }

        stepFourCalculateTotal = (arrayOfItems) => {
            let itemTotal = 0;
                arrayOfItems.forEach(itemRecords => {
                    itemTotal += parseFloat(itemRecords.amountOfExpense)
                })
                
                let averageTotal = (itemTotal/3).toFixed(2);
                res.json(averageTotal);
                return averageTotal;
        }
    }

    let lastthreeMonthTrend = new ThreeMonths(req.params.userID);
    lastthreeMonthTrend.stepOneDetermineCorrectMonthsAndYears();

}

let getPlannedItemsTotalForLastSixMonths = (req, res) => {

    let currentMonth = new Date().getMonth(); 
    let currentYear = new Date().getFullYear();
    let monthOne;
    let yearOfMonthOne;
    let monthTwo;
    let yearOfMonthTwo;
    let monthThree;
    let yearOfMonthThree;
    let monthFour;
    let yearOfMonthFour;
    let monthFive;
    let yearOfMonthFive;
    let monthSix;
    let yearOfMonthSix;
    let monthIDArray = [];

    class SixMonths {
        constructor(userID) {
        this.userID = userID;
        }
        
        stepOneDetermineCorrectMonthsAndYears = () => {
            switch (currentMonth) {
                case 5:
                    monthOne = currentMonth - 1;
                    yearOfMonthOne = currentYear;
                    monthTwo = currentMonth - 2,
                    yearOfMonthTwo = currentYear;
                    monthThree = currentMonth - 3,
                    yearOfMonthThree = currentYear;
                    monthFour = currentMonth - 4,
                    yearOfMonthFour = currentYear;
                    monthFive = currentMonth - 5,
                    yearOfMonthFive = currentYear;
                    monthSix = 11;
                    yearOfMonthSix = currentYear - 1;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree, monthFour, yearOfMonthFour, monthFive, yearOfMonthFive, monthSix, yearOfMonthSix);
                
                case 4:
                    monthOne = currentMonth - 1;
                    yearOfMonthOne = currentYear;
                    monthTwo = currentMonth - 2,
                    yearOfMonthTwo = currentYear;
                    monthThree = currentMonth - 3,
                    yearOfMonthThree = currentYear;
                    monthFour = currentMonth - 4,
                    yearOfMonthFour = currentYear;
                    monthFive = 11,
                    yearOfMonthFive = currentYear - 1;
                    monthSix = 10;
                    yearOfMonthSix = currentYear - 1;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree, monthFour, yearOfMonthFour, monthFive, yearOfMonthFive, monthSix, yearOfMonthSix);
                
                case 3:
                    monthOne = currentMonth - 1;
                    yearOfMonthOne = currentYear;
                    monthTwo = currentMonth - 2,
                    yearOfMonthTwo = currentYear;
                    monthThree = currentMonth - 3,
                    yearOfMonthThree = currentYear;
                    monthFour = 11,
                    yearOfMonthFour = currentYear - 1;
                    monthFive = 10,
                    yearOfMonthFive = currentYear - 1;
                    monthSix = 9;
                    yearOfMonthSix = currentYear - 1;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree, monthFour, yearOfMonthFour, monthFive, yearOfMonthFive, monthSix, yearOfMonthSix);
            

                case 2:
                    monthOne = currentMonth - 1;
                    yearOfMonthOne = currentYear;
                    monthTwo = currentMonth - 2,
                    yearOfMonthTwo = currentYear;
                    monthThree = 11,
                    yearOfMonthThree = currentYear - 1;
                    monthFour = 10,
                    yearOfMonthFour = currentYear - 1;
                    monthFive = 9,
                    yearOfMonthFive = currentYear - 1;
                    monthSix = 8;
                    yearOfMonthSix = currentYear - 1;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree, monthFour, yearOfMonthFour, monthFive, yearOfMonthFive, monthSix, yearOfMonthSix);

                case 1:
                    monthOne = currentMonth - 1;
                    yearOfMonthOne = currentYear;
                    monthTwo = 11,
                    yearOfMonthTwo = currentYear - 1;
                    monthThree = 10,
                    yearOfMonthThree = currentYear - 1;
                    monthFour = 9,
                    yearOfMonthFour = currentYear - 1;
                    monthFive = 8,
                    yearOfMonthFive = currentYear - 1;
                    monthSix = 7;
                    yearOfMonthSix = currentYear - 1;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree, monthFour, yearOfMonthFour, monthFive, yearOfMonthFive, monthSix, yearOfMonthSix);
                case 0:
                    monthOne = 11;
                    yearOfMonthOne = currentYear - 1;
                    monthTwo = 10,
                    yearOfMonthTwo = currentYear - 1;
                    monthThree = 9,
                    yearOfMonthThree = currentYear - 1;
                    monthFour = 8,
                    yearOfMonthFour = currentYear - 1;
                    monthFive = 7,
                    yearOfMonthFive = currentYear - 1;
                    monthSix = 6;
                    yearOfMonthSix = currentYear - 1;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree, monthFour, yearOfMonthFour, monthFive, yearOfMonthFive, monthSix, yearOfMonthSix);
                default:
                    monthOne = currentMonth - 1;
                    yearOfMonthOne = currentYear;
                    monthTwo = currentMonth - 2,
                    yearOfMonthTwo = currentYear;
                    monthThree = currentMonth - 3,
                    yearOfMonthThree = currentYear;
                    monthFour = currentMonth - 4,
                    yearOfMonthFour = currentYear;
                    monthFive = currentMonth - 5,
                    yearOfMonthFive = currentYear;
                    monthSix = currentMonth - 6;
                    yearOfMonthSix = currentYear;

                    this.stepTwoGetMonthIDsArray(monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree, monthFour, yearOfMonthFour, monthFive, yearOfMonthFive, monthSix, yearOfMonthSix);
                }

        }
        
        stepTwoGetMonthIDsArray = async (monthOne, yearOfMonthOne, monthTwo, yearOfMonthTwo, monthThree, yearOfMonthThree, monthFour, yearOfMonthFour, monthFive, yearOfMonthFive, monthSix, yearOfMonthSix) => {
            await db.Month
                    .find({monthAsNumber: monthOne, year: yearOfMonthOne})
                    .then(data => {
                        monthIDArray.push(data[0]._id);
                        return monthIDArray;
                        })
                    .catch(err => console.log(err));
        
            await  db.Month
                    .find({monthAsNumber: monthTwo, year: yearOfMonthTwo})
                    .then(data => {
                        monthIDArray.push(data[0]._id);
                        return monthIDArray;
                        })
                    .catch(err => console.log(err));

            await  db.Month
                    .find({monthAsNumber: monthThree, year: yearOfMonthThree})
                    .then(data => {
                        monthIDArray.push(data[0]._id);
                        return monthIDArray;
                        })
                    .catch(err => console.log(err));

            await  db.Month
                    .find({monthAsNumber: monthFour, year: yearOfMonthFour})
                    .then(data => {
                        monthIDArray.push(data[0]._id);
                        return monthIDArray;
                        })
                    .catch(err => console.log(err));
            
            await  db.Month
                    .find({monthAsNumber: monthFive, year: yearOfMonthFive})
                    .then(data => {
                        monthIDArray.push(data[0]._id);
                        return monthIDArray;
                        })
                    .catch(err => console.log(err));

            await db.Month
                    .find({monthAsNumber: monthSix, year: yearOfMonthSix})
                    .then(data => {
                        monthIDArray.push(data[0]._id);
                        console.log(monthIDArray);
                        
                        this.stepThreeGetPlannedItems(monthIDArray);

                        })
                    .catch(err => console.log(err));
        }

        // , "5eee735cd0da5700175fd6ad", "5fc07d71df69b9001704ccb1"

        stepThreeGetPlannedItems = (arrayOfMonthIDs) => {
                db.Expenses
                    .find({
                        userID: this.userID, 
                        monthID: arrayOfMonthIDs,
                        categoryID: {$nin: ["5eee765ec9306a0017b70fed", "5eee735cd0da5700175fd6ad", "5fc07d71df69b9001704ccb1"]},
                        isPlanned: true
                    })
                    .then(arrayOfItems => {
                        console.log(arrayOfItems);
                        this.stepFourCalculateTotal(arrayOfItems);
                    })
                    .catch(err => console.log(err));
        }

        stepFourCalculateTotal = (arrayOfItems) => {
            let itemTotal = 0;
                arrayOfItems.forEach(itemRecords => {
                    itemTotal += parseFloat(itemRecords.amountOfExpense)
                })
                
                let averageTotal = (itemTotal/6).toFixed(2);
                res.json(averageTotal);
                return averageTotal;
        }
    }
    
    let lastthreeMonthTrend = new SixMonths(req.params.userID);
    lastthreeMonthTrend.stepOneDetermineCorrectMonthsAndYears();

}

module.exports = {
    addIncome: addIncomeToDb,
    addExpense: addExpenseToDb,
    addCategoryToDb, addCategoryToDb,
    addUser: addUserToDb,
    addMonthToDb: addMonthToDb,
    addCategoryToEntryByCategoryID: addCategoryToEntryByCategoryID,
    getAllIncome: getAllIncome,
    fetchData: fetchData,
    getAllExpenses: getAllExpenses,
    getAllCategories: getAllCategories,
    getAllUsers: getAllUsers,
    getMonthData: getMonthData,
    getExpenseByID: getExpenseByID,
    getIncomeByID: getIncomeByID,
    getAllIncomeByUserID: getAllIncomeByUserID,
    getUserByID: getUserByID,
    getUserByEmail: getUserByEmail,
    getAllPlannedExpenses: getAllPlannedExpenses,
    getAllPlannedExpensesByIncomeID: getAllPlannedExpensesByIncomeID,
    getAllUnPlannedExpenses: getAllUnPlannedExpenses,
    getBillTrackerItems: getBillTrackerItems,
    getAfterSpendingAmount: getAfterSpendingAmount,
    getCurrentMonth: getCurrentMonth,
    getPlannedItemsTotalForLastThreeMonths: getPlannedItemsTotalForLastThreeMonths,
    getPlannedItemsTotalForLastSixMonths: getPlannedItemsTotalForLastSixMonths,
    deleteExpense: deleteExpenseByID,
    deleteIncome: deleteIncomeByID,
    deleteAllMonthData: deleteAllMonthData,
    editExpense: editExpenseByID,
    editIncome: editIncomeByID,
    editCategoryByID: editCategoryByID,
    addToBillTracker: addToBillTracker,
    removeFromBillTracker: removeFromBillTracker,
    markExpenseAsPaid: markExpenseAsPaid,
    bulkUpdate:bulkUpdate,
    updateAfterSpendingAmount: updateAfterSpendingAmount,
    updateIncomeOnUserRecord: updateIncomeOnUserRecord,
    updateExpensesOnUserRecord: updateExpensesOnUserRecord,
    copyPreviousMonthsData: copyPreviousMonthsData,
    splitEntry: splitEntry,
    moveToNextMonth: moveToNextMonth,
    calculateCategoryTotalsPerMonth: calculateCategoryTotalsPerMonth

}