'use strict';

let btnStart = document.getElementById('start');
let btnCancel = document.getElementById('cancel');
let btnIncomePlus = document.getElementsByTagName('button')[0];
let btnExpensesPlus = document.getElementsByTagName('button')[1];
let checkBox = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetDayValue = document.querySelector('result-budget_day input');
let expensesMonthValue = document.querySelector('result-expenses_month input');
let additionalIncomeValue = document.querySelector('result-additional_income input');
let additionalExpensesValue = document.querySelector('result-additional_expenses input');
let incomePeriodValue = document.querySelector('result-income_period input');
let targetMonthValue = document.querySelector('result-target_month input');
let salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let budgetMonthValue = document.querySelector('result-budget_month input');
let incomeItems = document.querySelectorAll('.income-items');


const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];
};
AppData.prototype.check = function () {
    if (salaryAmount.value !== '') {
        btnStart.removeAttribute('disabled');
    }
};
AppData.prototype.start = function () {
    if (salaryAmount.value === '') {
        btnStart.setAttribute('disabled', true);
        return;
    }
    let allInput = document.querySelectorAll('.data input');
    allInput.forEach(function (item) {
        item.setAttribute('disabled', true);
    });
    btnIncomePlus.setAttribute('disabled', true);
    btnExpensesPlus.setAttribute('disabled', true);
    btnStart.style.display = 'none';
    btnCancel.style.display = 'block';

    this.budget = +salaryAmount.value;

    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome();
    this.showResult();
};
AppData.prototype.showResult = function () {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function () {
        incomePeriodValue.value = _this.calcPeriod();
    });

};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        btnExpensesPlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        btnIncomePlus.style.display = 'none';
    }
};
AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay > 600) {
        return ('У вас средний уровень дохода');
    } else if (this.budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?');
        } while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);

        do {
            this.moneyDeposit = prompt('Какая сумма заложена?');
        } while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function () {

    let inputTextData = document.querySelectorAll('.data input');
    let resultInputAll = document.querySelectorAll('.result input[type = text]');

    inputTextData.forEach(function (elem) {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach(function (elem) {
        elem.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        btnIncomePlus.style.display = 'block';
    }
    for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        btnExpensesPlus.style.display = 'block';
    }

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];

    btnCancel.style.display = 'none';
    btnStart.style.display = 'block';
    btnExpensesPlus.removeAttribute('disabled');
    btnIncomePlus.removeAttribute('disabled');
    checkBox.checked = false;
};
AppData.prototype.eventsListeners = function () {
    btnStart.setAttribute('disabled', true);

    btnStart.addEventListener('click', this.start.bind(this));
    btnExpensesPlus.addEventListener('click', this.addExpensesBlock);
    btnIncomePlus.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('keyup', this.check);
    btnCancel.addEventListener('click', this.reset.bind(this));

    periodSelect.addEventListener('change', function () {
        periodAmount.innerHTML = periodSelect.value;
    });

    let addExp = [];

    for (let i = 0; i < this.addExpenses.length; i++) {
        let element = this.addExpenses[i].trim();
        element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
        addExp.push(element);
    }
};

const appData = new AppData();

appData.eventsListeners();

