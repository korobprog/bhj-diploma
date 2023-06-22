class TransactionsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('ошибка');
    };
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('create-income-button')) {
        App.getModal('newIncome').open();
      }
      if (event.target.classList.contains('create-expense-button')) {
        App.getModal('newExpense').open();
      }
    })
  }
}
