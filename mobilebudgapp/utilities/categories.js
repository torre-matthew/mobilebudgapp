  // #8C1184 Pinkish Purple
  // #4036F5 blue
  // #7DBF7A shade of green 
  // #F20544 kind of red
  // #F26B6B kind of salmon
  // #B0BFFF kind of lavender
  // #F2872E kind of orange



let lahriCategories = {
    billsAndUtilities: {
        icon: "plug",
        iconColor: "#8C1184"
    },
    debt: {
        icon: "file-invoice-dollar",
        iconColor: "#4036F5"
    }, 
    housing: {
        icon: "home",
        iconColor: "#7DBF7A"
    },
    nonRecurringExpense: {
        icon: "money-check-alt",
        iconColor: "#F20544"
    },
    personalSpending: {
        icon: "hand-holding-usd",
        iconColor: "#F26B6B"
    },
    savings: {
        icon: "piggy-bank",
        iconColor: "#B0BFFF"
    },
    subscriptionsAndMemberships: {
        icon: "funnel-dollar",
        iconColor: "#F2872E"
    },
    edAndTuition: {
        icon: "user-graduate",
        iconColor: "#F2872E"
    },
    kidsActivities: {
        icon: "child",
        iconColor: "#F2872E"
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
          }
      }

}

export default lahriCategories
