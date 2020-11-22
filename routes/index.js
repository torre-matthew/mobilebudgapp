const router = require("express").Router();
const controllers = require("../controllers");

router.route("/addingIncome").post(controllers.addIncome);
router.route("/addingExpense").post(controllers.addExpense);
router.route("/addingCategory").post(controllers.addCategoryToDb);
router.route("/addingUser").post(controllers.addUser);
router.route("/addingMonth").post(controllers.addMonthToDb);
router.route("/copyPreviousMonth").post(controllers.copyPreviousMonthsData);
router.route("/getAccessToken").post(controllers.acceptPublicTokenSentByLink);
router.route("/bulkUpdate").post(controllers.bulkUpdate);

router.route("/allIncome").get(controllers.getAllIncome);
router.route("/allCategories").get(controllers.getAllCategories);
router.route("/allIncome/:userID/:monthID").get(controllers.getAllIncomeByUserID);
router.route("/allExpenses").get(controllers.getAllExpenses);
router.route("/allBillTrackerItems/:userID/:monthID").get(controllers.getBillTrackerItems);
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
router.route("/calculateCategoryTotalsPerMonth/:userID/:monthID/:categoryID").get(controllers.calculateCategoryTotalsPerMonth);


router.route("/deleteExpense").delete(controllers.deleteExpense);
router.route("/deleteIncome").delete(controllers.deleteIncome);
router.route("/deleteAllMonthData").delete(controllers.deleteAllMonthData);
router.route("/updateExpense").put(controllers.editExpense);
router.route("/updateIncome").put(controllers.editIncome);
router.route("/updateCategory").put(controllers.editCategoryByID);
router.route("/addCategoryToEntryByCategoryID").put(controllers.addCategoryToEntryByCategoryID);
router.route("/addToBillTracker").put(controllers.addToBillTracker);
router.route("/markExpenseAsPaid").put(controllers.markExpenseAsPaid);
router.route("/updateAfterSpendingAmount/:incomeID").put(controllers.updateAfterSpendingAmount);
router.route("/updateIncomeOnUserRecord/:userID").put(controllers.updateIncomeOnUserRecord);
router.route("/updateExpensesOnUserRecord/:userID").put(controllers.updateExpensesOnUserRecord);
router.route("/splitEntry/:billID").put(controllers.splitEntry);
router.route("/moveToNextMonth/:billID").put(controllers.moveToNextMonth);

router.use("/api", router);

module.exports = router;