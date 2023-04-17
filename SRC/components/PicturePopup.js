import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    this._popupSelector.querySelector(".popup-picture__title").textContent = name;
    this._popupSelector.querySelector(".popup-picture__image").src = link;
    this._popupSelector.querySelector(".popup-picture__image").alt = name;
  }
}
export {PopupWithImage};