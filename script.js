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
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 200000,
    period: 5,
    asking: function () {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;

            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?');
            }
            while (!isNaN(itemIncome) || itemIncome === '' || itemIncome === null);

            let cashIncome;
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
            }
            while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null);

            appData.income[itemIncome] = cashIncome;
        }


        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {

            let itemExpenses;

            do {
                itemExpenses = prompt('Введите обязательную статью расходов?');
            }
            while (!isNaN(itemExpenses) || itemExpenses === '' || itemExpenses === null);

            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдется?');
            }
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

            appData.expenses[itemExpenses] = +cashExpenses;
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return appData.mission / appData.budgetMonth;
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
    getInfoDeposit: function () {
        if (appData.deposit) {

            do {
                appData.percentDeposit = prompt('Какой годовой процент?');
            }
            while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);
        }
    },
    calcSaveMoney: function () {
        return appData.budgetMonth * appData.period;
    },
};


appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth);

appData.getStatusIncome();
console.log(appData);

if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута через ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + `${key} - ${appData[key]}`);
}

console.log(appData.addExpenses.flatMap(x => (x[0].toUpperCase() + x.slice(1))).join(', '));