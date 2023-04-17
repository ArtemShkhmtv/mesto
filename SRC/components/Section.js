class Section {
  constructor ( {items, renderer}, containerSelector) {
    this._renderedItem = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    
  }
  // формирование карточки 
  renderItems() {
    this._renderedItem.forEach( (item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }
  // добавление карточки на страницу
  addItem(element) {
    this._container.prepend(element);
  }


  // очистка полей вставляемого элемента, но это не точно???
  clear() {
    this._container.innerHTML = '';
  }
}

export {Section};