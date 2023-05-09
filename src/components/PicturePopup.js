import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pictureTitle = this._popupSelector.querySelector(
      ".popup-picture__title"
    );
    this._pictureImage = this._popupSelector.querySelector(
      ".popup-picture__image"
    );
  }

  open(name, link) {
    super.open();
    this._pictureTitle.textContent = name;
    this._pictureImage.src = link;
    this._pictureImage.alt = name;
  }
}
export { PopupWithImage };
