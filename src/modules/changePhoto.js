'use strict';
//блок Наша команда
//смена фотографий через data атрибут

const changePhoto = () => {
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
};

export default changePhoto;