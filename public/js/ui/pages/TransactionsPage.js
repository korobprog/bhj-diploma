class TransactionsPage {
  constructor(element) {
    if (!element) {
      throw new Error('ошибка');
    }
    this.element = element;
    this.registerEvents();
    this.lastOptions = null;
  }

  update() {
    this.render(this.lastOptions);
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.remove-account')) {
        this.removeAccount();
      }
      if (event.target.closest('.transaction__remove')) {
        this.removeTransaction({ id: event.target.closest('button').dataset.id });
      }
    });
  }

  removeAccount() {
    if (this.lastOptions) {
      const removeMessage = confirm('Вы действительно хотите удалить счёт?');
      if (removeMessage) {
        Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
          if (response.success) {
            this.clear();
            App.updateWidgets();
          }
        });
      }
    }
  }

  removeTransaction(id) {
    const removeMessage = confirm('Вы действительно хотите удалить эту транзакцию?');
    if (removeMessage) {
      Transaction.remove(id, (err, response) => {
        if (response.success) {
          App.update();
        }
      });
    }
  }
  render(options) {
    if (options) {
      this.lastOptions = options;
      Account.get(options.account_id, (err, response) => {
        if (response.success) {
          this.renderTitle(response.data.name);
        }
      })
      Transaction.list(options, (err, response) => {
        if (response) {
          this.renderTransactions(response.data);
        }
      })
    }
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle(`Название счёта`);
    this.lastOptions = null;
  }

  renderTitle(name) {
    const title = document.querySelector('.content-title');
    title.textContent = name;
  }

  formatDate(date) {
    const newDate = new Date(date).toLocaleDateString('ru');
    return `${newDate} г. в ${date.slice(11, 16)}`;
  }

  getTransactionHTML(item) {
    return `
    <div class="transaction transaction_${item.type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <!-- дата -->
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        <!--  сумма -->
        ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <!-- в data-id нужно поместить id -->
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
    </div>
    `;
  }
  renderTransactions(data) {
    const content = document.querySelector('.content');
    content.innerHTML = '';
    data.forEach(item => {
      content.insertAdjacentHTML('afterbegin', this.getTransactionHTML(item));
    });
  }
}