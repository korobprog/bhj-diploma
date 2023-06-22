class Modal {
  constructor(element) {
    if (!element) {
      throw new Error('Ошибка!');
    };
    this.element = element;
    this.registerEvents();
  };

  registerEvents() {
    const dismiss = this.element.querySelectorAll('[data-dismiss="modal"]');
    dismiss.forEach(item => {
      item.addEventListener('click', (event) => {
        this.onClose(event);
      });
    });
  }
  onClose(e) {
    e.preventDefault();
    this.close();
  }
  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.display = 'none';
  }
}