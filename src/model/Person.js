class Person {
  constructor(name, [{ homeworld, population }, { species, language }]) {
    this.name = name;
    this.homeworld = homeworld;
    this.population = population;
    this.species = species;
    this.language = language;
  }
}

export default Person;
