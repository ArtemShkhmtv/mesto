import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('.popup__container');
    this._inputList = this._popupSelector.querySelectorAll('.popup__text');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
     if (input.name === "popup-add-card-name" || input.name === "popup-edit-name") {
      this._formValues.name = input.value;
     } else {
      this._formValues.link = input.value;
    }
    })
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
export {PopupWithForm};