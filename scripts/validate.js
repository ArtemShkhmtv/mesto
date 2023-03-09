
// когда страница не валидна
const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.name}-error`);
  inputSelector.classList.add(enableValidationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidationConfig.errorClass);
};


// когда страница валидна
const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.name}-error`);
  inputSelector.classList.remove(enableValidationConfig.inputErrorClass);
  errorElement.classList.remove(enableValidationConfig.errorClass);
  errorElement.textContent = '';
};

// проверка валидности каждого поля
const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

// проверка валидности массива всех полей
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

// блокировка кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(enableValidationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled','');
  } else {
    buttonElement.classList.remove(enableValidationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

// функция добавления слушателей
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidationConfig.inputSelector));
  const buttonElement = formElement.querySelector(enableValidationConfig.submitButtonSelector);

  // проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
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
    setEventListeners(formElement);
  });
};


