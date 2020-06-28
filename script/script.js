'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = document.getElementById('start'),
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');
  
// const AppData = function() {
class AppData {
  constructor() {
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
  }

  check() {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    }
  }

  start() {
    if (salaryAmount.value === '' || !isNumber(salaryAmount.value)) {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      // start.setAttribute('disabled', 'true');
      return;
    }

    if (!isNumber(depositPercent.value) || (depositPercent.value < 0 || depositPercent.value > 100)) {
      alert('Введите корректное значение в поле проценты');
      // console.log('depositPercent.value: ', depositPercent.value);
      this.changePercent();
      return;
    }

    const allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach((item) => {
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
    this.getInfoDeposit(); 
    // this.getTargetMonth(); 
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    console.log(this.getStatusIncome());
    this.showResult();
  }

  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value,
          cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value,
          cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });
  
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      // console.log('" ' + key + ' :" ' + this.expenses[key]);
      this.expensesMonth += this.expenses[key];  // суммируем расходы
    }
    // console.log('Перечисляем расходы за месяц: ', this.expenses);
    // console.log('Итого расходы за месяц: ', this.expensesMonth); 
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit *  (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    this.period = Math.ceil(targetAmount.value / this.budgetMonth);
    if (this.period < 0) {
      console.log('Цель не будет достигнута');
    } else {
      console.log('Цель будет достигнута через: ' + this.period + ' месяцев');
    }
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода!');
    } else if ((this.budgetDay < 1200) && (this.budgetDay >= 600)) {
      return ('У вас средний уровень дохода.');
    } else if ((this.budgetDay < 600) && (this.budgetDay >= 0)) {
      return ('К сожалению у вас уровень дохода ниже среднего.');
    } else {
      return ('Что то пошло не так...');
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  reset() {
    const inputData = document.querySelectorAll('.data input[type = text]'),
        resultData = document.querySelectorAll('.result input[type = text]');
  
    inputData.forEach((elem) => {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });
    resultData.forEach((elem) => {
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

    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = '';
    depositPercent.value = '';
    this.deposit = false;
  
    cancel.style.display = 'none';
    start.style.display = 'block';
    expensesPlus.removeAttribute('disabled');
    incomePlus.removeAttribute('disabled');
    depositCheck.checked = false;
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;    
    }
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      
      depositPercent.addEventListener('input', () => {
        depositPercent.value = depositPercent.value;
      });
    } else {
      depositPercent.value = valueSelect;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  
  eventsListeners() {
    start.addEventListener('click', this.start.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
  
    cancel.addEventListener('click', this.reset.bind(this));
  
    periodSelect.addEventListener('input', function() {
      periodAmount.textContent = periodSelect.value;
    });

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }

}

const appData2 = new AppData();

appData2.eventsListeners();

console.log('appData2: ', appData2);