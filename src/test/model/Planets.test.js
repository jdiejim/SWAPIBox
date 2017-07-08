import Planets from '../../model/Planets';
import Planet from '../../model/Planet';
import fetchMock from 'fetch-mock';

describe('Planets.js', () => {
  const resolveAfter2Seconds = () =>
   new Promise(resolve => setTimeout(() => resolve(), 2000))

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  })

  it('Should fetch the correct resident of the planet', async () => {
    let result;
    const url = 'http://swapi.co/api/people/1';

    fetchMock.get(url, {name: 'Luke'})

    const resident = new Planets().getResidents(url)
                            .then(data => result = data)

    await resolveAfter2Seconds();

    expect(result).toBe('Luke')
    expect(fetchMock.called()).toBe(true);
  })

  it('Should fetch the correct planet', async () => {
    let result;
    const url1 = 'http://swapi.co/api/people/1';
    const url2 = 'http://swapi.co/api/people/2';
    const residents = ['Luke Skywalker', 'C-3PO']
    const planet = {
      name: 'Tatooine',
      terrain: 'rocky',
      population: 1,
      climate: 'Tropical',
      residents: [url1, url2]
    }
    const expected = new Planet(planet, residents)

    fetchMock.get(url1, {name: 'Luke Skywalker'})
    fetchMock.get(url2, {name: 'C-3PO'})

    const expectedPlanet = new Planets().getPlanet(planet)
                                        .then(data => result = data)

    await resolveAfter2Seconds();

    expect(result).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  })

  it('Should fetch an array of promises', async () => {
    let result;
    const url = 'http://swapi.co/api/planets/'
    const url1 = 'http://swapi.co/api/people/1';
    const url2 = 'http://swapi.co/api/people/2';
    const residents = ['Luke Skywalker', 'C-3PO']
    const info1 = {
      name: 'Tatooine',
      terrain: 'rocky',
      population: 1,
      climate: 'Tropical',
      residents: [url1]
    }
    const info2 = {
      name: 'Hoth',
      terrain: 'Ice',
      population: 2,
      climate: 'Cold',
      residents: [url2]
    }
    const planet1 = new Planet(info1, [residents[0]])
    const planet2 = new Planet(info2, [residents[1]])

    fetchMock.get(url, {results: [info1, info2]})
    fetchMock.get(url1, {name: 'Luke Skywalker'})
    fetchMock.get(url2, {name: 'C-3PO'})

    const expectedPlanet = new Planets().getPlanets()
                                        .then(data => result = data)

    await resolveAfter2Seconds();

    expect(result).toEqual([planet1, planet2]);
    expect(fetchMock.called()).toBe(true);
  })
})
