class RegisterForm extends AsyncForm {
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response.success) {
        App.setState('user-logged');
        this.element.reset();
        App.getModal('register').close();
      }
    })
  }
}