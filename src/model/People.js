import { PEOPLE_URL } from '../utils/constants';
import Person from './Person';

class People {
  fetchPeople(component) {
    this.getPeople().then(people => component.setState({ people }));
  }

  getPeople() {
    return fetch(PEOPLE_URL)
            .then(res => res.json())
            .then(data => Promise.all(data.results.map(this.getPerson.bind(this))));
  }

  getPerson({ name, homeworld, species }) {
    return Promise.all([this.getHomeWorld(homeworld), this.getSpecies(species[0])])
                  .then(res => new Person(name, res));
  }

  getHomeWorld(url) {
    return fetch(url)
            .then(res => res.json())
            .then(({ name: homeworld, population }) => ({ homeworld, population }));
  }

  getSpecies(url) {
    return fetch(url)
            .then(res => res.json())
            .then(({ name: species, language }) => ({ species, language }));
  }
}

export default People;
