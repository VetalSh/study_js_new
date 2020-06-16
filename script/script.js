const start = document.getElementById('start'),
      incomeButton = document.getElementsByTagName('button')[0],
      expensesButton = document.getElementsByTagName('button')[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetDayValue = document.getElementsByClassName('budget_day-value'),      
      expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
      additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
      incomePeriodValue = document.getElementsByClassName('income_period-value'),
      targetMonthValue = document.getElementsByClassName('target_month-value'),
      budgetMonthValue = document.querySelector('.budget_month-value'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select');
      
start.addEventListener('click', () => {
  console.log('Button start pressed');
});

incomeButton.addEventListener('click', () => {
  console.log('Button income pressed');
});

expensesButton.addEventListener('click', () => {
  console.log('Button expenses pressed');
});

depositCheck.addEventListener('click', () => {
  console.log('Checkbox deposit pressed');
});

// Поля для ввода возможных доходов
console.log(additionalIncomeItem);

console.log('budgetDayValue: ', budgetDayValue);
console.log('expensesMonthValue: ', expensesMonthValue);
console.log('additionalIncomeValue: ', additionalIncomeValue);
console.log('additionalExpensesValue: ', additionalExpensesValue);
console.log('incomePeriodValue: ', incomePeriodValue);
console.log('targetMonthValue: ', targetMonthValue);

console.log('budgetMonthValue: ', budgetMonthValue);
console.log('salaryAmount: ', salaryAmount);
console.log('incomeTitle: ', incomeTitle);
console.log('incomeAmount: ', incomeAmount);
console.log('expensesTitle: ', expensesTitle);
console.log('expensesAmount: ', expensesAmount);
console.log('additionalExpensesItem: ', additionalExpensesItem);
console.log('depositAmount: ', depositAmount);
console.log('depositPercent: ', depositPercent);
console.log('targetAmount: ', targetAmount);
console.log('periodSelect: ', periodSelect);