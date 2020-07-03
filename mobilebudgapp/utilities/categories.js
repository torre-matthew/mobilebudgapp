  // #8C1184 Pinkish Purple
  // #4036F5 blue
  // #7DBF7A shade of green 
  // #F20544 kind of red
  // #F26B6B kind of salmon
  // #B0BFFF kind of lavender
  // #F2872E kind of orange

let iconColors = [
  "#8C1184",
  "#4036F5",
  "#7DBF7A",
  "#F20544",
  "#F26B6B",
  "#B0BFFF",
  "#F2872E",
  "#6E3D15",
  "#5D6587",
  "#873B3B",
  "#870326",
  "#486E46",
  "#1C186E",
  "#038778",
]

let index = Math.floor(Math.random() * iconColors.length)


let lahriCategories = {
    billsAndUtilities: {
        icon: "plug",
        iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    debt: {
        icon: "file-invoice-dollar",
        iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    }, 
    housing: {
        icon: "home",
        iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    nonRecurringExpense: {
        icon: "money-check-alt",
        iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    personalSpending: {
        icon: "hand-holding-usd",
        iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    savings: {
        icon: "piggy-bank",
        iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    subscriptionsAndMemberships: {
        icon: "funnel-dollar",
        iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    edAndTuition: {
        icon: "user-graduate",
        iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    kidsActivities: {
        icon: "child",
        iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    houseHoldExpenses: {
      icon: "toilet-paper",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    insurance: {
      icon: "shield-alt",
      iconColor: iconColors[Math.floor(Math.random() * iconColors.length)]
    },
    default: {
      icon: "question-circle",
      iconColor: "grey"
    },
    categoryIconLogic: (categoryName) => {
        switch (categoryName) {
          case "Bills & Utilities":
            return lahriCategories.billsAndUtilities
          case "Debt":
            return lahriCategories.debt
          case "Housing":
            return lahriCategories.housing
          case "Non Recurring Expense":
            return lahriCategories.nonRecurringExpense
          case "Personal Spending":
            return lahriCategories.personalSpending
          case "Savings":
            return lahriCategories.savings
          case "Subscriptions & Memberships":
            return lahriCategories.subscriptionsAndMemberships
          case "Ed & Tuition":
            return lahriCategories.edAndTuition
          case "Kids Activities":
            return lahriCategories.kidsActivities
          case "Household Expenses":
            return lahriCategories.houseHoldExpenses
          case "Insurance":
            return lahriCategories.insurance
          default:
            return lahriCategories.default
          }
      }

}

export default lahriCategories
