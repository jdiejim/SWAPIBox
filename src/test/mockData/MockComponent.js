class MockComponent {
  constructor() {
    this.state = {
      selectedData: [],
      inFavorites: true,
      planets: [],
      isLoading: true,
      errorStatus: ''
    }
  }

  setState(obj) {
    this.state = obj;
  }
}

export default MockComponent;
