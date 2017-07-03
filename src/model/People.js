import { PEOPLE_URL } from '../utils/constants';
import Person from './Person';

class People {
  fetchPeople(component) {
    this.getPeople().then(people => component.setState({ people }));
  }

  getPeople() {
    return fetch(PEOPLE_URL)
            .then(res => res.json())
            .then(data => Promise.all(data.results.map(this.getPerson.bind(this))))
  }

  getPerson({ name, homeworld, species }) {
    return Promise.all([this.getHomeWorld(homeworld), this.getSpecies(species[0])])
                  .then(res => new Person({ name, homeworld, species }, res));
  }

  getHomeWorld(obj) {
    return fetch(obj)
            .then(res => res.json())
            .then(({ name, population }) => ({ homeworld: name, population }));
  }

  getSpecies(obj) {
    return fetch(obj)
            .then(res => res.json())
            .then(({ name, language }) => ({ species: name, language }));
  }
}

export default People;
