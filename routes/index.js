const router = require("express").Router();
const controllers = require("../controllers");

router.route("/addingIncome").post(controllers.addIncome);
router.route("/addingExpense").post(controllers.addExpense);

router.route("/allIncome").get(controllers.getAllIncome);
router.route("/allExpenses").get(controllers.getAllExpenses);
router.route("/allPlannedExpenses").get(controllers.getAllPlannedExpenses);
router.route("/allUnPlannedExpenses").get(controllers.getAllUnPlannedExpenses);
router.route("/getExpenseByID/:expenseID").get(controllers.getExpenseByID);
router.route("/getIncomeByID/:incomeID").get(controllers.getIncomeByID);



router.route("/deleteExpense").delete(controllers.deleteExpense);
router.route("/deleteIncome").delete(controllers.deleteIncome);
router.route("/updateExpense").put(controllers.editExpense);
router.route("/updateIncome").put(controllers.editIncome);


router.use("/api", router);

module.exports = router;