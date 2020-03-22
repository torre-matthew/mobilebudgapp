import axios from "axios";
const devURL = "http://localhost:3001/";
const prodURL ="";


/////////////Get Methods////////////////////

let getIncome = () => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/api/allIncome");
}

let getExpenses = () => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/api/allExpenses");
}

let getAllPlannedExpenses = () => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/allPlannedExpenses");
}

let getAllUnPlannedExpenses = () => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/api/allUnPlannedExpenses");
}

let getExpenseByID = (expenseID) => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/api/getExpenseByID/" + expenseID, {
        params: {expenseID: expenseID}
    });
}

let getIncomeByID = (incomeID) => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/api/getIncomeByID/" + incomeID, {
      params: {incomeID: incomeID}
    });
}

let getUpdatedCheckAfterSpendingAmount = (incomeID) => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/api/getUpdatedCheckAfterSpendingAmount/" + incomeID, {
      params: {incomeID: incomeID}
    });
}

/////////////Post Methods////////////////////

let addIncome = (name, date, amount) => {
    return axios.post('https://gentle-beyond-46108.herokuapp.com/api/addingIncome', {
        name: name,
        date: date,
        amount: amount,
    });
}

let addExpense = (name, date, amount) => {
    return axios.post('https://gentle-beyond-46108.herokuapp.com/api/addingExpense', {
        nameOfExpense: name,
        dateOfExpense: date,
        amountOfExpense: amount,
    });
}

/////////////Delete Methods////////////////////

let deleteExpense = (id) => {
    return axios.delete('https://gentle-beyond-46108.herokuapp.com/api/deleteExpense', {
       data: {_id: id,}
    });
}

let deleteIncome = (id) => {
    return axios.delete('https://gentle-beyond-46108.herokuapp.com/api/deleteIncome', {
       data: {_id: id,}
    });
}

let editExpense = (id, name, date, amount, isPlanned, fundingSource) => {
    return axios.put('https://gentle-beyond-46108.herokuapp.com/api/updateExpense', {
       data: {_id: id,
        nameOfExpense: name,
        dateOfExpense: date,
        amountOfExpense: amount,
        isPlanned: isPlanned,
        fundingSource: fundingSource}
    });
}

let editIncome = (id, name, date, amount) => {
    return axios.put('https://gentle-beyond-46108.herokuapp.com/api/updateIncome', {
       data: {_id: id,
        name: name,
        date: date,
        amount: amount
        }
    });
}


export default {
    getIncome: getIncome,
    getExpenses: getExpenses,
    getAllPlannedExpenses: getAllPlannedExpenses,
    getAllUnPlannedExpenses: getAllUnPlannedExpenses,
    getExpenseByID: getExpenseByID,
    getIncomeByID: getIncomeByID,
    getUpdatedCheckAfterSpendingAmount: getUpdatedCheckAfterSpendingAmount,
    addIncome: addIncome,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    deleteIncome: deleteIncome,
    editExpense: editExpense,
    editIncome: editIncome
}