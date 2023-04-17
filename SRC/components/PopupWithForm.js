import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('.popup__container');
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__text');
    this._formValues = {};
    this._formValuesArray = [];
    this._formValues.name = this._inputList[0].value;
    this._formValues.link = this._inputList[1].value;
    this._formValuesArray[0] = this._formValues;
    return this._formValuesArray;
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