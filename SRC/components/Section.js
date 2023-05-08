class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItem = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  // формирование карточки
  renderItems() {
    this._renderedItem.forEach((item) => {
      this.addItem(item);
    });
  }
  // добавление карточек с сервера
  addItem(item) {
    const element = this._renderer(item);
    this._container.append(element);
  }

  // добавление карточки на страницу из попапа
  addItemFromForm(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }

  // очистка полей вставляемого элемента
  clear() {
    this._container.innerHTML = "";
  }
}

export { Section };
