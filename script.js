'use strict';

let books = document.querySelectorAll('.book');
let bodyImg = document.querySelector('body');
let elem = document.querySelectorAll('a');
let spam = document.querySelector('.adv');
let ulAll = document.querySelectorAll('ul');
let liAll = document.querySelectorAll('li');

books[1].after(books[0]);
books[3].before(books[4]);
books[5].after(books[2]);

bodyImg.style.background = 'url("./image/you_dont_know_js.jpg"), no-repeat';
bodyImg.style.backgroundSize = 'cover';

elem[4].textContent = 'Книга 3. this и Прототипы Объектов';
spam.remove();
liAll[9].after(liAll[2]);
liAll[3].after(liAll[6]);
liAll[6].after(liAll[8]);
liAll[47].after(liAll[55]);
liAll[50].after(liAll[48]);
liAll[53].after(liAll[51]);

const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
ulAll[2].append(newElem);
liAll[25].after(newElem);
