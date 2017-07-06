class Planet {
  constructor({ name, terrain, population, climate }, residents) {
    this.name = name;
    this.terrain = terrain;
    this.population = population;
    this.climate = climate;
    this.residents = residents;
  }
}

export default Planet;
