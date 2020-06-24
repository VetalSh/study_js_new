'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],

    budgetMonthValue = document.querySelector('.budget_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    // incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    // expensesAmount = document.querySelector('.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items');
  

const AppData = function() {

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;

};

AppData.prototype.check = function() {
  if (salaryAmount.value !== '') {
    start.removeAttribute('disabled');
  }
};

AppData.prototype.start = function() {
  if (salaryAmount.value === '' || !isNumber(salaryAmount.value)) {
    alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
    // start.setAttribute('disabled', 'true');
    return;
  }
  let allInput = document.querySelectorAll('.data input[type = text]');
  allInput.forEach(function(item) {
    item.setAttribute('disabled', 'true');
  });
  incomePlus.setAttribute('disabled', 'true');
  expensesPlus.setAttribute('disabled', 'true');
  start.style.display = 'none';
  cancel.style.display = 'block';

  this.budget = +salaryAmount.value;

  this.getExpenses();
  this.getIncome();  
  this.getExpensesMonth();
  // this.getInfoDeposit(); 
  // this.getTargetMonth(); 
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  console.log(this.getStatusIncome());
  this.showResult();
};
AppData.prototype.showResult = function(){
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('input', function() {
    incomePeriodValue.value = _this.calcPeriod();
  });
};
AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
};
AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function() {
  const _this = this;
  expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function() {
  const _this = this;
  incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = +cashIncome;
    }
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function() {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach( function(item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function() {
  const _this = this;
  additionalIncomeItem.forEach( function(item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function() {
  for (let key in this.expenses) {
    // console.log('" ' + key + ' :" ' + this.expenses[key]);
    this.expensesMonth += this.expenses[key];  // суммируем расходы
  }
  // console.log('Перечисляем расходы за месяц: ', this.expenses);
  // console.log('Итого расходы за месяц: ', this.expensesMonth); 
};
AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
  this.period = Math.ceil(targetAmount.value / this.budgetMonth);
  if (this.period < 0) {
    console.log('Цель не будет достигнута');
  } else {
    console.log('Цель будет достигнута через: ' + this.period + ' месяцев');
  }
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function() {
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода!');
  } else if ((this.budgetDay < 1200) && (this.budgetDay >= 600)) {
    return ('У вас средний уровень дохода.');
  } else if ((this.budgetDay < 600) && (this.budgetDay >= 0)) {
    return ('К сожалению у вас уровень дохода ниже среднего.');
  } else {
    return ('Что то пошло не так...');
  }
};
AppData.prototype.getInfoDeposit = function() {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой  процент?', 10);
    } while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);      
  }
};
AppData.prototype.calcPeriod = function() {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function() {
  let inputData = document.querySelectorAll('.data input[type = text]'),
      resultData = document.querySelectorAll('.result input[type = text]');

  inputData.forEach(function(elem) {
    elem.value = '';
    elem.removeAttribute('disabled');
    periodSelect.value = '0';
    periodAmount.innerHTML = periodSelect.value;
  });
  resultData.forEach(function(elem) {
    elem.value = '';
  });

  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].parentNode.removeChild(incomeItems[i]);
    incomePlus.style.display = 'block';
  }

  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].parentNode.removeChild(expensesItems[i]);
    expensesPlus.style.display = 'block';
  }

  this.budget = 0,
  this.budgetDay = 0,
  this.budgetMonth = 0,
  this.income = {},
  this.incomeMonth = 0,
  this.addIncome = [],
  this.expenses = {},
  this.expensesMonth = 0,
  this.addExpenses = [],
  this.deposit = false,
  this.percentDeposit = 0,
  this.moneyDeposit = 0;

  cancel.style.display = 'none';
  start.style.display = 'block';
  expensesPlus.removeAttribute('disabled');
  incomePlus.removeAttribute('disabled');
  depositCheck.checked = false;
};

AppData.prototype.eventsListeners = function() {
  start.addEventListener('click', this.start.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);

  cancel.addEventListener('click', this.reset.bind(this));

  periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
  });
};

const appData2 = new AppData();

AppData.prototype.eventsListeners.call(appData2);

console.log('appData2: ', appData2);