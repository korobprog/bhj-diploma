class UserWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Ошибка!');
    };
    this.element = element;
  }
  update() {
    const user = User.current();
    if (user) {
      this.element.querySelector('.user-name').textContent = user.name;
    }
  }
}
