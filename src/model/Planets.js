import { PLANETS_URL } from '../utils/constants';
import Planet from './Planet';

class Planets {
  fetchPlanets(component) {
    this.getPlanets()
        .then(selectedData => component.setState({
          selectedData,
          inFavorites: false,
          planets: selectedData,
          isLoading: false,
        }))
        .catch(err => console.log(err))
  }

  getPlanets() {
    return fetch(PLANETS_URL)
            .then(res => res.json())
            .then(({ results }) => Promise.all(results.map(this.getPlanet.bind(this))))
  }

  getPlanet(planet) {
    return Promise.all(planet.residents.map(this.getResidents))
                  .then(residents => new Planet(planet, residents));
  }

  getResidents(url) {
    return fetch(url)
            .then(res => res.json())
            .then(({ name }) => name);
  }
}

export default Planets;
