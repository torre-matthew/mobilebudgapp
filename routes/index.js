const router = require("express").Router();
const contollers = require("../controllers");

router.route("/addingIncome").post(contollers.addIncome);
router.route("/addingExpense").post(contollers.addExpense);

router.route("/allIncome").get(contollers.getAllIncome);
router.route("/allExpenses").get(contollers.getAllExpenses);



router.route("/deleteExpense").delete(contollers.deleteExpense);


router.use("/api", router);

module.exports = router;