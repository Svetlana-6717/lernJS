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
        // updateClock();
    }

    countTimer('23 june 2021');


    //меню
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', (event) => {
            let target = event.target;
            if (target.tagName !== 'A') {
                return;
            }
            handlerMenu();
        });

    };

    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = `block`;
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = `none`;
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popup.style.display = `none`;
                }
            }

        });

    };

    togglePopup();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        const btn = document.querySelectorAll('.portfolio-btn');
        const slider = document.querySelector('.portfolio-content');
        let dotList = document.querySelector('.portfolio-dots');

        let currentSlide = 0;
        let interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        //добавление точек, равное количеству слайдов

        for (let i = 0; i < slide.length; i++) {
            let li = document.createElement('li');
            li.classList.add('dot');
            dotList.append(li);
        }
        const dot = document.querySelectorAll('.dot');


        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', () => {

            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', () => {

            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);

    };

    // slider();

    //блок Наша команда
    //смена фотографий через data атрибут

    const image = document.querySelectorAll('.command__photo');
    const command = document.querySelector('.command .row');

    command.addEventListener('mouseover', (event) => {
        let target = event.target;

        image.forEach((elem, i) => {

            if (elem === target) {
                let src = image[i].getAttribute('src');
                let dataSrc = document.createAttribute('data-src');
                dataSrc.value = src;
                image[i].setAttributeNode(dataSrc);
                target.src = target.dataset.img;
                image[i].removeAttribute('data-img');
            }
        });
    });

    command.addEventListener('mouseout', (event) => {
        let target = event.target;

        image.forEach((elem, i) => {
            if (elem === target) {
                let src = image[i].getAttribute('src');
                let dataImg = document.createAttribute('data-img');
                dataImg.value = src;
                image[i].setAttributeNode(dataImg);
                target.src = target.dataset.src;
                image[i].removeAttribute('data-src');
            }
        });
    });

    //валидация форм регулярками

    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');

    calcSquare.addEventListener('input', () => {
        calcSquare.value = calcSquare.value.replace(/\D/, '');
    });

    calcCount.addEventListener('input', () => {
        calcCount.value = calcCount.value.replace(/\D/, '');
    });

    calcDay.addEventListener('input', () => {
        calcDay.value = calcDay.value.replace(/\D/, '');
    });


    const inputName = document.querySelectorAll('input[name = user_name]');
    const inputMessage = document.querySelector('input[name = user_message]');
    const inputEmail = document.querySelectorAll('input[name = user_email]');
    const inputPhone = document.querySelectorAll('input[name = user_phone]');

    let regName = /[А-Яа-яЁё ]/g;
    let regMessage = /[А-Яа-яЁё0-9 -\W]/g;
    let regEmail = /[A-Z-!~'_]+@[A-Z-_]+.+.[A-Z]{2,4}/ig;
    let regPhone = /\+?[78]\d{10}/g;

    let errorText = document.createElement('div');
    errorText.style.cssText = 'font-size: 12px; color: red';

    const validate = (elem) => {

        if (elem.name === 'user_name') {

            if (!regName.test(elem.value) || elem.value === '') {
                elem.parentNode.append(errorText);
                elem.style.border = 'solid red';
                errorText.textContent = 'Недопустимые символы';
                elem.value = '';
            }
            else {
                elem.value = elem.value.match(regName).join('').replace(/^[ \s]+|[ \s]+$/g, '');
                elem.value = elem.value.replace(/\s+/g, ' ');
                elem.value = elem.value.replace(/( |^)[а-яё]/g, (item) => item.toUpperCase());
                elem.style.border = 'none';
                errorText.textContent = '';
            }
        }

        if (elem.name === 'user_email') {
            if (!regEmail.test(elem.value)) {
                elem.parentNode.append(errorText);
                elem.style.border = 'solid red';
                errorText.textContent = 'Неверный формат e-mail';
                elem.value = '';
            } else {
                elem.value = elem.value.match(regEmail).join('');
                elem.style.border = 'none';
                errorText.textContent = '';
            }
        }

        if (elem.name === 'user_phone') {
            if (!regPhone.test(elem.value)) {
                elem.parentNode.append(errorText);
                elem.style.border = 'solid red';
                errorText.textContent = 'Недопустимые символы';
                elem.value = '';
            } else {
                elem.value = elem.value.match(regPhone).join('');
                elem.style.border = 'none';
                errorText.textContent = '';
            }
        }
    };

    inputName.forEach((elem) => {
        elem.addEventListener('blur', () => {
            validate(elem);
        });
    });

    inputEmail.forEach((elem) => {
        elem.addEventListener('blur', () => {
            validate(elem);
        });
    });

    inputPhone.forEach((elem) => {
        elem.addEventListener('blur', () => {
            validate(elem);
        });
    });

    inputMessage.addEventListener('blur', () => {
        if (!regMessage.test(inputMessage.value)) {
            inputMessage.parentNode.append(errorText);
            inputMessage.style.border = 'solid red';
            errorText.textContent = 'Недопустимые символы';
            inputMessage.value = '';
        } else {
            inputMessage.value = inputMessage.value.match(regMessage).join('').replace(/^[- \s]+|[- \s]+$/g, '');
            inputMessage.value = inputMessage.value.replace(/\s+/g, ' ');
            inputMessage.value = inputMessage.value.replace(/-{2,}/g, '-');
            inputMessage.style.border = 'none';
            errorText.textContent = '';
        }
    });

    //калькулятор

    const calc = () => {

        const calcBlock = document.querySelector('.calc-block');
        const calcType = document.querySelector('.calc-type');
        const calcSquare = document.querySelector('.calc-square');
        const calcDay = document.querySelector('.calc-day');
        const calcCount = document.querySelector('.calc-count');
        const totalValue = document.getElementById('total');

        const countSum = (price = 100) => {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

    };

    calc(100);

    //send-ajax-form

    const sendForm = () => {
        const errorMessage = 'Что то пошло не так...';
        const loadMessage = 'Загрузка...';
        const successMessage = 'Спасибо! Мы скоро с вами свяжемся';

        const form = document.getElementById('form1');
        const inputForm = form.querySelectorAll('#form1 input');
        const formFooter = document.getElementById('form2');
        const inputFooter = formFooter.querySelectorAll('#form2 input');
        const formPopup = document.getElementById('form3');
        const inputPopup = formPopup.querySelectorAll('.popup-content input');


        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white';

        const postData = (body) => {

            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {

                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(request.status);
                    }
                });

                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(body));
            });
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body).then(() => {
                statusMessage.textContent = successMessage;
            },
                () => {
                    statusMessage.textContent = errorMessage;
                });

            inputForm.forEach((elem) => {
                if (event.target) {
                    elem.value = '';
                }
            });

        });

        formFooter.addEventListener('submit', (event) => {
            event.preventDefault();
            formFooter.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(formFooter);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body).then(() => {
                statusMessage.textContent = successMessage;
            },
                () => {
                    statusMessage.textContent = errorMessage;
                });

            inputFooter.forEach((elem) => {
                if (event.target) {
                    elem.value = '';
                }
            });

        });

        formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
            formPopup.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(formPopup);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body).then(() => {
                statusMessage.textContent = successMessage;
            },
                () => {
                    statusMessage.textContent = errorMessage;
                });

            inputPopup.forEach((elem) => {
                if (event.target) {
                    elem.value = '';
                }
            });
        });
    };

    sendForm();

});

