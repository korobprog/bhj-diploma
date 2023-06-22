class Entity {
  static url = '';

  static list(data, callback) {
    createRequest({
      url: this.url,
      method: 'GET',
      data,
      callback
    });
  };

  static create(data, callback) {
    createRequest({
      url: this.url,
      method: 'PUT',
      data,
      callback
    });
  };

  static remove(data, callback) {
    createRequest({
      url: this.url,
      method: 'DELETE',
      data,
      callback
    });
  };
};
