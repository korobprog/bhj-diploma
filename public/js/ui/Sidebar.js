class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }
  static initToggleButton() {
    const bodySidebar = document.querySelector('.sidebar-mini');
    const button = document.querySelector('.sidebar-toggle');
    button.addEventListener('click', () => {
      bodySidebar.classList.toggle('sidebar-open');
      bodySidebar.classList.toggle('sidebar-collapse');
    });
  }
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