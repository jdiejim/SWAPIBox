import { PEOPLE_URL } from '../utils/constants';
import Person from './Person';

class People {
  constructor() {

  }

  getPeople() {
    const people = [];
    fetch(PEOPLE_URL)
        .then(res => res.json())
        .then(data => {
          people.push(data.results.map(person => new Person(person)));
        })
        .catch(er => console.log(er));

        console.log(this.getPerson({
          homeworld: 'http://swapi.co/api/planets/1das/',
          species: 'http://swapi.co/api/species/1fads/',
        }));

    return people;
  }

  getPerson(data) {
    return Promise.all([this.getData(data.homeworld), this.getData(data.species)]);
  }

  getData(url) {
    return fetch(url)
              .then(res => res.json())
              .then(data => {
                const obj = {};

                obj.name = data.name;
                if (data.population) {
                  obj.population = data.population;
                }
                if (data.language) {
                  obj.language = data.language;
                }
                return obj;
              });
  }
}

export default People;
