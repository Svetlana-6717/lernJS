'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 200000;
let period = 5;

let start = function () {
    money = prompt('Ваш месячный доход?');

    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};

start();

let showTypeOf = function (item) {
    console.log(typeof (item));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(','));

let getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?');

        do {
            sum = prompt('Во сколько это обойдется?');
        }
        while (!isNumber(sum));

    }

    console.log(expenses);
    return sum;
};


let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function () {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
    return mission / accumulatedMonth;
};

if (getTargetMonth > 0) {
    console.log('Цель будет достигнута через ' + Math.ceil(getTargetMonth()) + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

let budgetDay = accumulatedMonth / 30;


let getStatusIncome = function () {
    if (budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay > 600) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }
};
console.log(getStatusIncome());
