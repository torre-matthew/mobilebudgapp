const router = require("express").Router();
const controllers = require("../controllers");

router.route("/addingIncome").post(controllers.addIncome);
router.route("/addingExpense").post(controllers.addExpense);
router.route("/addingUser").post(controllers.addUser);

router.route("/allIncome").get(controllers.getAllIncome);
router.route("/allExpenses").get(controllers.getAllExpenses);
router.route("/allUsers").get(controllers.getAllUsers);
router.route("/allPlannedExpenses").get(controllers.getAllPlannedExpenses);
router.route("/allUnPlannedExpenses").get(controllers.getAllUnPlannedExpenses);
router.route("/getExpenseByID/:expenseID").get(controllers.getExpenseByID);
router.route("/getIncomeByID/:incomeID").get(controllers.getIncomeByID);
router.route("/getUserByID/:userID").get(controllers.getUserByID);
router.route("/getUserByEmail/:email").get(controllers.getUserByEmail);
router.route("/getAfterSpendingAmount/:incomeID").get(controllers.getAfterSpendingAmount);


router.route("/deleteExpense").delete(controllers.deleteExpense);
router.route("/deleteIncome").delete(controllers.deleteIncome);
router.route("/updateExpense").put(controllers.editExpense);
router.route("/updateIncome").put(controllers.editIncome);
router.route("/updateAfterSpendingAmount/:incomeID").get(controllers.updateAfterSpendingAmount);


router.use("/api", router);

module.exports = router;