'use strict';
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
    return fetch('./server.php', {
      method: 'POST',
      headrs: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.log(error);
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

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.log(error);
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

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.log(error);
      });

    inputPopup.forEach((elem) => {
      if (event.target) {
        elem.value = '';
      }
    });
  });
};

export default sendForm;