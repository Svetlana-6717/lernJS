'use strict';

//валидация форм регулярками

const validateForm = () => {
  const inputName = document.querySelectorAll('input[name = user_name]');
  const inputEmail = document.querySelectorAll('input[name = user_email]');
  const inputPhone = document.querySelectorAll('input[name = user_phone]');

  const inputMessage = document.querySelector('input[name = user_message]');
  inputMessage.setAttribute('required', true);

  let regName = /[А-Яа-яЁё ]+/;
  let regMessage = /[А-Яа-яЁё0-9 -\W]/g;
  let regEmail = /[A-Z-!~'_]+@[A-Z-_]+.+.[A-Z]{2,4}/ig;
  let regPhone = /\+?[78]\d{10}/;

  let errorText = document.createElement('div');
  errorText.classList.add('error');
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
        elem.value = elem.value.match(regName);
        elem.value = elem.value.trim();
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
        elem.value = elem.value.match(regEmail);
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
        elem.value = elem.value.match(regPhone);
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
    elem.setAttribute('required', true);
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
    if (!regMessage.test(inputMessage.value) || inputMessage.value === '') {
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
};

export default validateForm;