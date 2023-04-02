// создание класса валидации
class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButton = formElement.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  }

    // когда страница не валидна
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // когда страница валидна
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверка валидности каждого поля
  checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // проверка валидности массива всех полей
  _hasInvalidInput () {
    return this._inputList.some(inputElement => {
    return !inputElement.validity.valid;
    })
  };

  // блокировка кнопки
  disableButton () {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled','');
  }

  _enableButton () {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  // переключение кнопки
  _toggleButtonState (inputList) {
      if (this._hasInvalidInput(inputList)) {
        this.disableButton();
      } else {
        this._enableButton();
      }
    };



  // функция добавления слушателей
  _setEventListeners () {

    // проверить состояние кнопки в самом начале
    this._toggleButtonState(this._inputList);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  };
  // добавить валидацию к форме
  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export {FormValidator};