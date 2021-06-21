window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    //Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');

        function getTimerRemaining() {
            let dateStop = new Date(deadline).getTime();
            let dateNow = new Date().getTime();
            let timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        let addZero = function (num) {
            if (num <= 9) {
                return '0' + num;
            } else {
                return num;
            }
        };

        function updateClock() {
            let timer = getTimerRemaining();
            let idInterval = setInterval(updateClock, 1000);

            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';

                clearInterval(idInterval);
            }
        }
        updateClock();
    }

    countTimer('22 june 2021');


    //меню
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');
        const menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));


    };

    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = `block`;
            });
        });

        //animation popup
        popupClose.addEventListener('click', () => {
            popup.style.display = `none`;
        });

        let popupContent = document.querySelector('.popup-content');
        let width = document.documentElement.clientWidth;
        let count = 0;
        let animateInterval;

        const popupOpen = () => {

            if (width <= 768) {
                popup.style.display = `none`;
                cancelAnimationFrame(animateInterval);
            } else {
                popup.style.display = `block`;
                animateInterval = requestAnimationFrame(popupOpen);
                count++;
                if (count < 450) {
                    popupContent.style.left = count + 'px';
                }
                else {
                    cancelAnimationFrame(animateInterval);
                }
            }
        };

        animateInterval = requestAnimationFrame(popupOpen);

    };

    togglePopup();


});

