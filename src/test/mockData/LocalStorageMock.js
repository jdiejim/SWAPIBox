class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = JSON.stringify(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export default LocalStorageMock;
