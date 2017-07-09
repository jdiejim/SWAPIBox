import Planets from '../../model/Planets';
import Planet from '../../model/Planet';
import MockComponent from '../mockData/MockComponent';
import fetchMock from 'fetch-mock';

describe('Planets.js', () => {
  const planets = new Planets();
  const PLANETS_URL = 'http://swapi.co/api/planets/';
  const PEOPLE1_URL = 'http://swapi.co/api/people/1';
  const PEOPLE2_URL = 'http://swapi.co/api/people/2';
  const resident1 = ['Luke Skywalker'];
  const resident2 = ['C-3PO'];
  const info1 = {
    name: 'Tatooine',
    terrain: 'rocky',
    population: 1,
    climate: 'Tropical',
    residents: [PEOPLE1_URL]
  }
  const info2 = {
    name: 'Hoth',
    terrain: 'Ice',
    population: 2,
    climate: 'Cold',
    residents: [PEOPLE2_URL]
  }

  const resolveAfter2Seconds = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('should fetch the correct resident of the planet', async () => {
    let result;

    fetchMock.get(PEOPLE1_URL, {
      status: 200,
      body: { name: 'Luke' }
    });

    const promise = planets.getResidents(PEOPLE1_URL)
                           .then(data => result = data);

    await resolveAfter2Seconds();

    expect(result).toBe('Luke');
    expect(fetchMock.called()).toBe(true);
  });

  it('should fetch the correct planet', async () => {
    let result;
    const expected = new Planet(info1, resident1);

    fetchMock.get(PEOPLE1_URL, {
      status: 200,
      body: { name: 'Luke Skywalker' }
    });

    const promise = planets.getPlanet(info1)
                           .then(data => result = data);

    await resolveAfter2Seconds();

    expect(result).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should fetch an array of planets', async () => {
    let result;
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);
    const expected = [planet1, planet2];

    fetchMock.get(PLANETS_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    fetchMock.get(PEOPLE1_URL, {
      status: 200,
      body: { name: 'Luke Skywalker' }
    });

    fetchMock.get(PEOPLE2_URL, {
      status: 200,
      body: { name: 'C-3PO' }
    });

    const promise = planets.getPlanets()
                           .then(data => result = data);

    await resolveAfter2Seconds();

    expect(result).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should change state of component', async () => {
    const mockComponent = new MockComponent();
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);
    const preExpected = {
      selectedData: [],
      inFavorites: true,
      planets: [],
      people: [],
      vehicles: [],
      film: {},
      isLoading: true,
      errorStatus: ''
    }
    const expected = {
      selectedData: [planet1, planet2],
      inFavorites: false,
      planets: [planet1, planet2],
      people: [],
      vehicles: [],
      film: {},
      isLoading: false,
      errorStatus: ''
    }

    fetchMock.get(PLANETS_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    fetchMock.get(PEOPLE1_URL, {
      status: 200,
      body: { name: 'Luke Skywalker' }
    });

    fetchMock.get(PEOPLE2_URL, {
      status: 200,
      body: { name: 'C-3PO' }
    });

    const promise = planets.fetchPlanets(mockComponent);

    expect(mockComponent.state).toEqual(preExpected);

    await resolveAfter2Seconds();

    expect(mockComponent.state).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should display an error when fetch fails', async () => {
    const mockComponent = new MockComponent();
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);
    const preExpected = '';
    const expected = 'Error fetching planets';

    fetchMock.get(PLANETS_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    fetchMock.get(PEOPLE1_URL, {
      status: 200,
      body: { name: 'Luke Skywalker' }
    });

    fetchMock.get(PEOPLE2_URL, { status: 500 });

    const promise = planets.fetchPlanets(mockComponent);

    expect(mockComponent.state.errorStatus).toEqual(preExpected);

    await resolveAfter2Seconds();

    expect(mockComponent.state.errorStatus).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });
});
