class Person {
  constructor(data) {
    this.name = data.name;
    this.homeworld = data.homeworld;
    this.species = data.species[0];
  }

  getPerson() {
    return Promise.all([this.getData(this.homeworld), this.getData(this.species)]);
  }
}

export default Person;
