'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import changePhoto from './modules/changePhoto';
import validateCalc from './modules/validateCalc';
import validateForm from './modules/validateForm';

//Timer
countTimer('23 july 2021');

//меню
toggleMenu();

//popup
togglePopup();

//табы
tabs();

//слайдер
slider();

//калькулятор
calc(100);

//send-ajax-form
sendForm();

//смена фотографий через data атрибут
changePhoto();

//валидация форм регулярками
validateCalc();
validateForm();