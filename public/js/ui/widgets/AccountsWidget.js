class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('ошибка');
    };
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.account')) {
        this.onSelectAccount(event.target.closest('.account'));
      }
      if (event.target.classList.contains('create-account')) {
        App.getModal('createAccount').open();
      }
    })
  }
  update() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          this.clear();
          this.renderItem(response.data);
        }
      })
    }
  }

  clear() {
    const accountList = this.element.querySelectorAll('.account');
    accountList.forEach(item => item.remove());
  }

  onSelectAccount(element) {
    const active = this.element.querySelectorAll('.active');
    for (const item of active) {
      item.classList.remove('active');
    }
    element.classList.add('active');
    App.showPage('transactions', { account_id: element.dataset.id });
  }

  getAccountHTML(item) {
    return `<li class="account" data-id=${item.id}>
              <a href="#">
                <span>${item.name}</span> /
                <span>${item.sum} ₽</span>
              </a>
            </li>
          `;
  }

  renderItem(data) {
    data.forEach(item => {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
    })
  }
}
