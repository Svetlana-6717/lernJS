'use strict';
const toggleMenu = () => {

  const btnMenu = document.querySelector('.menu');
  const menu = document.querySelector('menu');
  const scrollHeader = document.querySelector('main>a');
  const items = menu.querySelectorAll('li>a');
  let containers = Array.prototype.slice.call(document.querySelectorAll('div>h2'), 0);
  containers.splice(3, 1);

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  const switchLinks = (el) => {
    let current;
    [].forEach.call(items, (item, index) => {
      if (item === el) {
        current = index;
      }
    });
    return current;
  };

  const scroll = (el, direction) => {
    let duration = 2000;
    let start = new Date().getTime();

    let fn = () => {
      let top = el.getBoundingClientRect().top;
      let now = new Date().getTime() - start;
      let result = Math.round(top * now / duration);
      if (result > direction * top) {
        result = top;
      } else if (result === 0) {
        result = direction;
      } else { result = result; }
      if (direction * top > 0) {
        window.scrollBy(0, result);
        requestAnimationFrame(fn);
      }
    };
    requestAnimationFrame(fn);
  };

  const selectContainer = (current) => {

    [].forEach.call(containers, (container, index) => {

      if (index === current) {
        let startY = container.getBoundingClientRect().top;
        let direction;
        if (startY < 0) {
          direction = -1;
        }
        if (startY > 0) {
          direction = 1;
        } else { direction = 0; }
        if (direction === 0) {
          return;
        }
        scroll(container, direction);
      }
    });

  };

  btnMenu.addEventListener('click', handlerMenu);

  menu.addEventListener('click', (event) => {
    event.preventDefault();

    let target = event.target;
    if (target.tagName !== 'A') {
      return;
    }
    let current = switchLinks(target);

    selectContainer(current);

    handlerMenu();
  });

  scrollHeader.addEventListener('click', (event) => {
    event.preventDefault();

    document.documentElement.scrollTop = 830;
  });

};

export default toggleMenu;