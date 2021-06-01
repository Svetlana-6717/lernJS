'use strict';

let money = 70000;
let income = 'фриланс';
let addExpenses = 'Интернет, Коммуналка';
let deposit = true;
let mission = 200000;
let period = 5;
let amount1;
let amount2;

let showTypeOf = function (data) {
    console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.split(', '));

function getExpensesMonth(amount1, amount2) {
    return amount1 + amount2;
}
console.log(getExpensesMonth(1000, 5000));

function getAccumulatedMonth(money, amount1, amount2) {
    return money - amount1 - amount2;
}

let accumulatedMonth = getAccumulatedMonth(30000, 2000, 500);

function getTargetMonth(mission, accumulatedMonth) {
    return Math.ceil(mission / accumulatedMonth);
}
console.log(getTargetMonth(200000, 27500));

let budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

let getStatusIncome = function () {
    if (budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay > 600) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        console.log('Что то пошло не так');
    }
};
getStatusIncome();
