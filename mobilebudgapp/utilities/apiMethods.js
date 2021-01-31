import axios from "axios";
const dev = "http://localhost:3001/";
const prod = "https://gentle-beyond-46108.herokuapp.com/";
const URL = prod;

// exp://192.168.1.23:19000

/////////////Get Methods////////////////////

let getIncome = () => {
    return axios.get(URL + "api/allIncome");
}

let getIncomeByUserID = (userID, monthID) => {
    return axios.get(URL + "api/allIncome/" + userID + "/" + monthID);
}

let getExpenses = () => {
    return axios.get(URL + "api/allExpenses");
}

let getBillTrackerItems = (userID, monthID) => {
    return axios.get(URL + "api/allBillTrackerItems/" + userID + "/" + monthID);
}

let getMonthData = () => {
    return axios.get(URL + "api/monthData");
}

let getCurrentMonth = () => {
    return axios.get(URL + "api/getCurrentMonth");
}

let getAllPlannedExpenses = (userID, monthID) => {
    return axios.get(URL + "api/allPlannedExpenses/" + userID  + "/" + monthID);
}

let getAllCategories = () => {
    return axios.get(URL + "api/allCategories");
}

let fetchData = (userID) => {
    return axios.get(URL + "api/fetchData/" + userID);
}

let getAllUnPlannedExpenses = (userID, monthID) => {
    return axios.get(URL + "api/allUnPlannedExpenses/" + userID  + "/" + monthID);
}

let getExpenseByID = (expenseID) => {
    return axios.get(URL + "api/getExpenseByID/" + expenseID, {
        params: {expenseID: expenseID}
    });
}

let getIncomeByID = (incomeID) => {
    return axios.get(URL + "api/getIncomeByID/" + incomeID, {
      params: {incomeID: incomeID}
    });
}

let getUserByID = (userID) => {
    return axios.get(URL + "api/getUserByID/" + userID, {
      params: {userID: userID}
    });
}

let getUserByEmail = (email) => {
    return axios.get(URL + "api/getUserByEmail/" + email, {
      params: {email: email}
    });
}

let getAfterSpendingAmount = (incomeID) => {
    return axios.get(URL + "api/getAfterSpendingAmount/" + incomeID, {
      params: {incomeID: incomeID}
    });
}

let getCategoryTotalByMonth = (userID, monthID, categoryID) => {
    return axios.get(URL + "api/calculateCategoryTotalsPerMonth/" + userID + "/" + monthID + "/" + categoryID, {
      params:  { userID: userID,
                monthID: monthID,
                categoryID: categoryID}
    });
}

let getAveragePlannedItemsTotalForLastThreeMonths = (userID) => {
    return axios.get(URL + "api/getPlannedItemsTotalForLastThreeMonths/" + userID, {
      params:  { userID: userID}
    });
}

let getAveragePlannedItemsTotalForLastSixMonths = (userID) => {
    return axios.get(URL + "api/getPlannedItemsTotalForLastSixMonths/" + userID, {
      params:  { userID: userID}
    });
}



/////////////Post Methods////////////////////

let addIncome = (name, date, amount, userID, monthID) => {
    return axios.post(URL + 'api/addingIncome', {
        name: name,
        date: date,
        amount: amount,
        userID: userID,
        monthID: monthID
    });
}

let addExpense = (name, date, amount, userID, monthID, forBillTracker) => {
    return axios.post(URL + "api/addingExpense", {
        nameOfExpense: name,
        dateOfExpense: date,
        amountOfExpense: amount,
        userID: userID,
        monthID: monthID,
        forBillTracker: forBillTracker
    });
}

let copyPreviousMonthData = (previousMonthID, userID, targetMonthID) => {
    return axios.post(URL + "api/copyPreviousMonth", {
        previousMonthID: previousMonthID,
        userID: userID,
        targetMonthID: targetMonthID
    });
}

let addUser = (email, profilePic, lastName, firstName) => {
    return axios.post(URL + "api/addingUser", {
        email: email,
        profilePic: profilePic,
        lastName: lastName,
        firstName: firstName
    });
}

let getPlaidAccessToken = (public_token) => {
    return axios.post(URL + "api/getAccessToken", {
        public_token: public_token
    });
}

/////////////Delete Methods////////////////////

let deleteExpense = (id) => {
    return axios.delete(URL + "api/deleteExpense", {
       data: {_id: id,}
    });
}

let deleteIncome = (id) => {
    return axios.delete(URL + "api/deleteIncome", {
       data: {_id: id,}
    });
}

/////////////Update Methods////////////////////

let editExpense = (id, name, date, amount, isPlanned, fundingSource, loggedInUserID) => {
    return axios.put(URL + "api/updateExpense", {
       data: {_id: id,
        nameOfExpense: name,
        dateOfExpense: date,
        amountOfExpense: amount,
        isPlanned: isPlanned,
        fundingSource: fundingSource,
        loggedInUserID: loggedInUserID}
    });
}

let editIncome = (id, name, date, amount) => {
    return axios.put(URL + "api/updateIncome", {
       data: {_id: id,
        name: name,
        date: date,
        amount: amount
        }
    });
}

let addToBillTracker = (id) => {
    return axios.put(URL + "api/addToBillTracker", {
        data: {_id: id}
     });
}

let markExpenseAsPaid = (id, bool) => {
    return axios.put(URL + "api/markExpenseAsPaid", {
        data: {_id: id, isPaid: bool}
     });
}

let addCategoryToEntry = (expenseID, categoryID, categoryName) => {
    return axios.put(URL + "api/addCategoryToEntryByCategoryID", {
        data: {_id: expenseID, categoryID: categoryID, categoryName: categoryName}
     });
}

let updateAfterSpendingAmount = (incomeID) => {
    return axios.put(URL + "api/updateAfterSpendingAmount/" + incomeID , {
      params: {incomeID: incomeID}
    });
}

let updateIncomeOnUserRecord = (userID) => {
    return axios.put(URL + "api/updateIncomeOnUserRecord/" + userID, {
        params: {userID: userID}
      });
}

let updateExpensesOnUserRecord = (userID) => {
    return axios.put(URL + "api/updateExpensesOnUserRecord/" + userID, {
        params: {userID: userID}
      });
}

let splitEntry = (billID) => {
    return axios.put(URL + "api/splitEntry/" + billID, {
        params: {billID: billID}
      });
}

let moveToNextMonth = (billID) => {
    return axios.put(URL + "api/moveToNextMonth/" + billID, {
        params: {billID: billID}
      });
}

let removeFromBillTracker = (billID) => {
    return axios.put(URL + "api/removeFromBillTracker/" + billID, {
        params: {billID: billID}
      });
}


export default {
    getIncome: getIncome,
    getIncomeByUserID: getIncomeByUserID,
    getExpenses: getExpenses,
    getMonthData: getMonthData,
    getCurrentMonth: getCurrentMonth,
    fetchData: fetchData,
    getAllPlannedExpenses: getAllPlannedExpenses,
    getAllUnPlannedExpenses: getAllUnPlannedExpenses,
    getAllCategories: getAllCategories,
    getExpenseByID: getExpenseByID,
    getIncomeByID: getIncomeByID,
    getUserByID: getUserByID,
    getUserByEmail: getUserByEmail,
    getAfterSpendingAmount: getAfterSpendingAmount,
    getPlaidAccessToken: getPlaidAccessToken,
    getCategoryTotalByMonth: getCategoryTotalByMonth,
    getBillTrackerItems: getBillTrackerItems,
    getAveragePlannedItemsTotalForLastThreeMonths: getAveragePlannedItemsTotalForLastThreeMonths,
    getAveragePlannedItemsTotalForLastSixMonths: getAveragePlannedItemsTotalForLastSixMonths,
    updateAfterSpendingAmount: updateAfterSpendingAmount,
    updateExpensesOnUserRecord, updateExpensesOnUserRecord,
    updateIncomeOnUserRecord: updateIncomeOnUserRecord,
    addIncome: addIncome,
    addExpense: addExpense,
    addUser: addUser,
    addCategoryToEntry: addCategoryToEntry,
    deleteExpense: deleteExpense,
    deleteIncome: deleteIncome,
    editExpense: editExpense,
    editIncome: editIncome,
    addToBillTracker: addToBillTracker,
    markExpenseAsPaid: markExpenseAsPaid,
    copyPreviousMonthData: copyPreviousMonthData,
    splitEntry: splitEntry,
    moveToNextMonth: moveToNextMonth,
    removeFromBillTracker: removeFromBillTracker,
    
}