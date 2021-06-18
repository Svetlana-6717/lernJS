'use strict';

const btnStart = document.getElementById('start');
const btnCancel = document.getElementById('cancel');
const btnIncomePlus = document.getElementsByTagName('button')[0];
const btnExpensesPlus = document.getElementsByTagName('button')[1];
const checkBox = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let incomeItems = document.querySelectorAll('.income-items');


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
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.addExpenses = [];
    }

    check() {
        if (salaryAmount.value !== '') {
            btnStart.removeAttribute('disabled');
        }
    }
    start() {
        if (salaryAmount.value === '') {
            btnStart.setAttribute('disabled', true);
            return;
        }
        const allInput = document.querySelectorAll('.data input');
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
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = this.calcPeriod();
        });

    }
    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnExpensesPlus.style.display = 'none';
        }
    }
    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnIncomePlus.style.display = 'none';
        }
    }
    getIncome() {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
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
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome() {
        if (this.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    }
    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?');
            } while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);

            do {
                this.moneyDeposit = prompt('Какая сумма заложена?');
            } while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
        }
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    reset() {

        const inputTextData = document.querySelectorAll('.data input');
        const resultInputAll = document.querySelectorAll('.result input[type = text]');

        inputTextData.forEach((elem) => {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = '0';
            periodAmount.innerHTML = periodSelect.value;
        });
        resultInputAll.forEach((elem) => {
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
    }
    eventsListeners() {
        btnStart.setAttribute('disabled', true);

        btnStart.addEventListener('click', this.start.bind(this));
        btnExpensesPlus.addEventListener('click', this.addExpensesBlock);
        btnIncomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('keyup', this.check);
        btnCancel.addEventListener('click', this.reset.bind(this));

        periodSelect.addEventListener('change', () => {
            periodAmount.innerHTML = periodSelect.value;
        });

        const addExp = [];

        for (let i = 0; i < this.addExpenses.length; i++) {
            let element = this.addExpenses[i].trim();
            element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
            addExp.push(element);
        }
    }
}

const appData = new AppData();

appData.eventsListeners();
