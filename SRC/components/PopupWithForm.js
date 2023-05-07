import { Popup } from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('.popup__container');
    this._inputList = this._popupSelector.querySelectorAll('.popup__text');
    this.submitButton = this._popupSelector.querySelector('.popup__save-botton');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this.submitButton.textContent = 'Сохранение...';
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  open() {
    super.open();
    this.submitButton.textContent = 'Сохранить';
  }

  close() {
    super.close();
    this._form.reset();
  }
}
export {PopupWithForm};

