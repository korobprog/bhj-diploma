/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const bodySidebar = document.querySelector('.sidebar-mini');
    const button = document.querySelector('.sidebar-toggle');
    button.addEventListener('click', () => {
      bodySidebar.classList.toggle('sidebar-open');
      bodySidebar.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const menuRegister = document.querySelector('.menu-item_register');

    const menuLogin = document.querySelector('.menu-item_login');

    const menuLogout = document.querySelector('.menu-item_logout');

    menuRegister.addEventListener('click', () => {
      App.getModal('register').open();
    });

    menuLogin.addEventListener('click', () => {
      App.getModal('login').open();
    });

    menuLogout.addEventListener('click', () => {
      User.logout((err, response) => {
        if (response.success) {
          App.setState('init');
        }
      })
    });
  }
}