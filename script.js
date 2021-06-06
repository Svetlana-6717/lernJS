'use strict';

let money;
let start = function () {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (isNaN(money) || money === '' || money === null);
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 200000,
    period: 5,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let question;
            let expenses1 = prompt('Введите обязательную статью расходов?');

            do {
                question = prompt('Во сколько это обойдется?');
            }
            while (isNaN(question) || question === '' || question === null);

            appData.expenses[expenses1] = +question;
        }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        let getTarget = appData.mission / appData.budgetMonth;
        if (getTarget > 0) {
            return ('Цель будет достигнута через ' + Math.ceil(getTarget) + ' месяцев');
        } else {
            return ('Цель не будет достигнута');
        }
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    },
};


appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
console.log(appData);

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + `${key} : ${appData[key]}`);
}