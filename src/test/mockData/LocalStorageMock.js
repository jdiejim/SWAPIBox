class LocalStorageMock {
  constructor() {
    this.store = {
      favorites: '[]'
    };
  }

  clear() {
    this.store = {
      favorites: '[]'
    };
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export default LocalStorageMock;
