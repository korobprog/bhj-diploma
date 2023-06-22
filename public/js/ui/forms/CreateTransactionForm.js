class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          select.innerHTML = '';
          response.data.forEach(item => {
            select.insertAdjacentHTML('beforeend', `<option value="${item.id}">${item.name}</option>`);
          });
        }
      });
    }
  }

  onSubmit(data) {
    const modal = this.element.closest('.modal').dataset.modalId;
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        this.element.reset();
        if (modal === 'newExpense') {
          App.getModal('newExpense').close();
        } else {
          App.getModal('newIncome').close();
        }
      }
    })
  }
}