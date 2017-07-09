class MockComponent {
  constructor() {
    this.state = {
      selectedData: [],
      inFavorites: true,
      planets: [],
      people: [],
      vehicles: [],
      film: {},
      isLoading: true,
      errorStatus: ''
    }
  }

  setState(obj) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key];
    });
  }
}

export default MockComponent;
