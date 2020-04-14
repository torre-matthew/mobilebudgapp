import axios from "axios";
const dev = "http://localhost:3001/";
const prod ="https://gentle-beyond-46108.herokuapp.com/";
const URL = prod;

// exp://192.168.1.23:19000

/////////////Get Methods////////////////////

let getIncome = () => {
    return axios.get(URL + "api/allIncome");
}

let getExpenses = () => {
    return axios.get(URL + "api/allExpenses");
}

let getAllPlannedExpenses = () => {
    return axios.get(URL + "api/allPlannedExpenses");
}

let getAllUnPlannedExpenses = () => {
    return axios.get(URL + "api/allUnPlannedExpenses");
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

let getAfterSpendingAmount = (incomeID) => {
    return axios.get(URL + "api/getAfterSpendingAmount/" + incomeID, {
      params: {incomeID: incomeID}
    });
}



/////////////Post Methods////////////////////

let addIncome = (name, date, amount) => {
    return axios.post(URL + 'api/addingIncome', {
        name: name,
        date: date,
        amount: amount,
    });
}

let addExpense = (name, date, amount) => {
    return axios.post(URL + "api/addingExpense", {
        nameOfExpense: name,
        dateOfExpense: date,
        amountOfExpense: amount,
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

let editExpense = (id, name, date, amount, isPlanned, fundingSource) => {
    return axios.put(URL + "api/updateExpense", {
       data: {_id: id,
        nameOfExpense: name,
        dateOfExpense: date,
        amountOfExpense: amount,
        isPlanned: isPlanned,
        fundingSource: fundingSource}
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

let updateAfterSpendingAmount = (incomeID) => {
    return axios.get(URL + "api/updateAfterSpendingAmount/" + incomeID, {
      params: {incomeID: incomeID}
    });
}


export default {
    getIncome: getIncome,
    getExpenses: getExpenses,
    getAllPlannedExpenses: getAllPlannedExpenses,
    getAllUnPlannedExpenses: getAllUnPlannedExpenses,
    getExpenseByID: getExpenseByID,
    getIncomeByID: getIncomeByID,
    getUserByID: getUserByID,
    getAfterSpendingAmount: getAfterSpendingAmount,
    updateAfterSpendingAmount: updateAfterSpendingAmount,
    addIncome: addIncome,
    addExpense: addExpense,
    addUser: addUser,
    deleteExpense: deleteExpense,
    deleteIncome: deleteIncome,
    editExpense: editExpense,
    editIncome: editIncome
}