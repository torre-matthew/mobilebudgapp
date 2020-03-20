import axios from "axios";


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

let getFundingSourceDataByExpenseID = () => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/api/getFundingSourceDataByExpenseID");
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
    console.log(id);
    console.log(name);
    console.log(date);
    console.log(amount);
    console.log(isPlanned);
    console.log(fundingSource);
    return axios.put('https://gentle-beyond-46108.herokuapp.com/api/updateExpense', {
       data: {_id: id,
        nameOfExpense: name,
        dateOfExpense: date,
        amountOfExpense: amount,
        isPlanned: isPlanned,
        fundingSource: fundingSource}
    });
}


export default {
    getIncome: getIncome,
    getExpenses: getExpenses,
    getAllPlannedExpenses: getAllPlannedExpenses,
    getAllUnPlannedExpenses: getAllUnPlannedExpenses,
    getFundingSourceDataByExpenseID: getFundingSourceDataByExpenseID,
    addIncome: addIncome,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    deleteIncome: deleteIncome,
    editExpense: editExpense
}