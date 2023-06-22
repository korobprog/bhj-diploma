class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('Ошибка');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }
  getData() {
    const form = new FormData(this.element);
    const entries = form.entries();
    let obj = {};
    for (let item of entries) {
      obj[item[0]] = item[1];
    }
    return obj;
  }

  onSubmit(options) {

  }

  submit() {
    this.onSubmit(this.getData());
  }
}