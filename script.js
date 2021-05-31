'use strict';

let money = 70000;
let income = 'фриланс';
let addExpenses = 'Интернет, Коммуналка';
let deposit = true;
let mission = 200000;
let period = 5;

console.log(money);
console.log(income);
console.log(deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

let budgetDay = money / 30;
console.log(budgetDay);

money = prompt('Ваш месячный доход');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = +prompt('Введите обязательную статью расходов?');
let expenses2 = +prompt('Введите обязательную статью расходов?');

let amount1 = prompt('Во сколько это обойдется?');
let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
console.log('бюджет на месяц: ' + budgetMonth);

period = mission / budgetMonth;
console.log('Цель будет достигнута через ' + Math.ceil(period) + ' месяцев');

budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так');
}
