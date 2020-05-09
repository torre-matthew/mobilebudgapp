const router = require("express").Router();
const controllers = require("../controllers");

router.route("/addingIncome").post(controllers.addIncome);
router.route("/addingExpense").post(controllers.addExpense);
router.route("/addingUser").post(controllers.addUser);
router.route("/addingMonth").post(controllers.addMonthToDb);
router.route("/copyPreviousMonth").post(controllers.copyPreviousMonthsData);

router.route("/allIncome").get(controllers.getAllIncome);
router.route("/allIncome/:userID/:monthID").get(controllers.getAllIncomeByUserID);
router.route("/allExpenses").get(controllers.getAllExpenses);
router.route("/allUsers").get(controllers.getAllUsers);
router.route("/monthData").get(controllers.getMonthData);
router.route("/allPlannedExpenses/:userID/:monthID").get(controllers.getAllPlannedExpenses);
router.route("/fetchData/:userID").get(controllers.fetchData);
router.route("/allUnPlannedExpenses/:userID/:monthID").get(controllers.getAllUnPlannedExpenses);
router.route("/getExpenseByID/:expenseID").get(controllers.getExpenseByID);
router.route("/getIncomeByID/:incomeID").get(controllers.getIncomeByID);
router.route("/getCurrentMonth").get(controllers.getCurrentMonth);
router.route("/getUserByID/:userID").get(controllers.getUserByID);
router.route("/getUserByEmail/:email").get(controllers.getUserByEmail);
router.route("/getAfterSpendingAmount/:incomeID").get(controllers.getAfterSpendingAmount);


router.route("/deleteExpense").delete(controllers.deleteExpense);
router.route("/deleteIncome").delete(controllers.deleteIncome);
router.route("/deleteAllMonthData").delete(controllers.deleteAllMonthData);
router.route("/updateExpense").put(controllers.editExpense);
router.route("/updateIncome").put(controllers.editIncome);
router.route("/markExpenseAsPaid").put(controllers.markExpenseAsPaid);
router.route("/bulkUpdate").put(controllers.bulkUpdate);
router.route("/updateAfterSpendingAmount/:incomeID").put(controllers.updateAfterSpendingAmount);
router.route("/updateIncomeOnUserRecord/:userID").put(controllers.updateIncomeOnUserRecord);
router.route("/updateExpensesOnUserRecord/:userID").put(controllers.updateExpensesOnUserRecord);

router.use("/api", router);

module.exports = router;