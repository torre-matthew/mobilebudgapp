const router = require("express").Router();
const contollers = require("../controllers");

router.route("/addingIncome").post(contollers.addIncome);
router.route("/addingExpense").post(contollers.addExpense);

router.route("/allIncome").get(contollers.getAllIncome);
router.route("/allExpenses").get(contollers.getAllExpenses);
router.route("/allPlannedExpenses").get(contollers.getAllPlannedExpenses);
router.route("/allUnPlannedExpenses").get(contollers.getAllUnPlannedExpenses);
router.route("/getExpenseByID/:expenseID").get(contollers.getExpenseByID);
router.route("/getIncomeByID/:incomeID").get(contollers.getIncomeByID);



router.route("/deleteExpense").delete(contollers.deleteExpense);
router.route("/deleteIncome").delete(contollers.deleteIncome);
router.route("/updateExpense").put(contollers.editExpense);


router.use("/api", router);

module.exports = router;