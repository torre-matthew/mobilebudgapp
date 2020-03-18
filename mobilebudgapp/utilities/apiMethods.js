import axios from "axios";


/////////////Get Methods////////////////////

let getIncome = () => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/api/allIncome");
}

let getExpenses = () => {
    return axios.get("https://gentle-beyond-46108.herokuapp.com/api/allExpenses");
}

let getAllPlannedExpenses = () => {
    return axios.get("http://192.168.1.23:3001/api/allPlannedExpenses");
}

let getAllUnPlannedExpenses = () => {
    return axios.get("http://192.168.1.23:3001/api/allUnPlannedExpenses");
}

/////////////Post Methods////////////////////

let addIncome = (name, date, amount) => {
    return axios.post('http://192.168.1.23:3001/api/addingIncome', {
        name: name,
        date: date,
        amount: amount,
    });
}

let addExpense = (name, date, amount) => {
    return axios.post('http://192.168.1.23:3001/api/addingExpense', {
        nameOfExpense: name,
        dateOfExpense: date,
        amountOfExpense: amount,
    });
}

/////////////Delete Methods////////////////////

let deleteExpense = (id) => {
    return axios.delete('http://192.168.1.23:3001/api/deleteExpense', {
       data: {_id: id,}
    });
}

let deleteIncome = (id) => {
    return axios.delete('http://192.168.1.23:3001/api/deleteIncome', {
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
    return axios.put('http://192.168.1.23:3001/api/updateExpense', {
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
    addIncome: addIncome,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    deleteIncome: deleteIncome,
    editExpense: editExpense
}