import axios from "axios";


/////////////Get Methods////////////////////

let getIncome = () => {
    return axios.get("http://192.168.1.23:3001/api/allIncome");
}

let getExpenses = () => {
    return axios.get("http://192.168.1.23:3001/api/allExpenses");
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

let editExpense = (id, name, date, amount) => {
    return axios.put('http://192.168.1.23:3001/api/updateExpense', {
       data: {_id: id,
        nameOfExpense: name,
        dateOfExpense: date,
        amountOfExpense: amount}
    });
}


export default {
    getIncome: getIncome,
    getExpenses: getExpenses,
    addIncome: addIncome,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    editExpense: editExpense
}