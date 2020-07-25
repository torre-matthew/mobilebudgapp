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
  "#6E021F",
  "#F26B6B",
  "#B0BFFF",
  "#F2872E",
  "#6E3D15",
  "#5D6587",
  "#038778",
  "#F23913",
  "#486E46",
  "#1C186E",
]

let index = Math.floor(Math.random() * iconColors.length)


let lahriCategories = {
    billsAndUtilities: {
        icon: "plug",
        iconColor: iconColors[0]
    },
    debt: {
        icon: "file-invoice-dollar",
        iconColor: iconColors[1]
    }, 
    housing: {
        icon: "home",
        iconColor: iconColors[2]
    },
    nonRecurringExpense: {
        icon: "money-check-alt",
        iconColor: iconColors[3]
    },
    personalSpending: {
        icon: "hand-holding-usd",
        iconColor: iconColors[4]
    },
    savings: {
        icon: "piggy-bank",
        iconColor: iconColors[5]
    },
    subscriptionsAndMemberships: {
        icon: "funnel-dollar",
        iconColor: iconColors[6]
    },
    edAndTuition: {
        icon: "user-graduate",
        iconColor: iconColors[7]
    },
    kidsActivities: {
        icon: "child",
        iconColor: iconColors[8]
    },
    houseHoldExpenses: {
      icon: "toilet-paper",
      iconColor: iconColors[9]
    },
    insurance: {
      icon: "shield-alt",
      iconColor: iconColors[10]
    },
    default: {
      icon: "question-circle",
      iconColor: '#454545'
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
