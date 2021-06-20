window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    function getWelcome() {
        let hello = document.querySelector('.text');
        let hello2 = document.querySelector('.text-2');
        let date = new Date();
        let hour = date.getHours();

        if (hour >= 6 && hour < 12) {
            hello.textContent = 'Доброе';
            hello2.textContent = 'утро';
        } else if (hour > 12 && hour < 18) {
            hello.textContent = 'Добрый';
            hello2.textContent = 'день';
        } else if (hour > 18 && hour < 24) {
            hello.textContent = 'Добрый';
            hello2.textContent = 'вечер';
        } else if (hour >= 0 && hour < 6) {
            hello.textContent = 'Доброй';
            hello2.textContent = 'ночи';
        }
    }
    getWelcome();

    function getWeekDay(date) {
        let weekDay = document.querySelector('.weekDay');
        date = date || new Date();
        let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        let day = date.getDay();
        weekDay.textContent = 'Сегодня: ' + days[day];
        return weekDay;
    }
    getWeekDay();

    function getTime() {
        let time = document.querySelector('.time');
        let date = new Date();
        let options = {
            hour: 'numeric',
            hour12: true,
            minute: 'numeric',
            second: 'numeric',
        };

        let timer = date.toLocaleTimeString('en-Us', options);

        time.textContent = 'Текущее время: ' + timer;
        setTimeout(getTime, 1000);
    }
    getTime();

    function getTimeout(deadline) {
        let timeout = document.querySelector('.timeout');
        let dateStop = new Date(deadline).getTime();
        let dateNow = new Date().getTime();
        let timeRemaining = (dateStop - dateNow) / 1000;
        let day = Math.floor(timeRemaining / 60 / 60 / 24);

        timeout.textContent = 'До нового года осталось ' + day + ' дней';

    }

    getTimeout('31 december 2021');


});



