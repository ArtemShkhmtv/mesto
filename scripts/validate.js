
// когда страница не валидна
const showInputError = (formSelector, inputSelector, errorMessage, config) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.name}-error`);
  inputSelector.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// когда страница валидна
const hideInputError = (formSelector, inputSelector, config) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.name}-error`);
  inputSelector.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// проверка валидности каждого поля
const checkInputValidity = (formSelector, inputSelector, config) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, config);
  } else {
    hideInputError(formSelector, inputSelector, config);
  }
};

// проверка валидности массива всех полей
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

// блокировка кнопки

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute('disabled','');
}

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}


const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    // buttonElement.classList.add(enableValidationConfig.inactiveButtonClass);
    // buttonElement.setAttribute('disabled','');
    disableButton(buttonElement, config);
  } else {
    // buttonElement.classList.remove(enableValidationConfig.inactiveButtonClass);
    // buttonElement.removeAttribute('disabled');
    enableButton(buttonElement, config);
  }
};

// функция добавления слушателей
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// ищем все формы страницы, внутри них поля ввода и добавляем слушатель
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

enableValidation(enableValidationConfig);
