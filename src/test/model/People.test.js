import People from '../../model/People';
import Person from '../../model/Person';
import MockComponent from '../mockData/MockComponent';
import fetchMock from 'fetch-mock';

describe('People.js', () => {
  const people = new People();
  const PEOPLE_URL = 'http://swapi.co/api/people/';
  const SPECIES1_URL = 'http://swapi.co/api/species/1/';
  const PLANET1_URL = 'http://swapi.co/api/planets/1/';
  const PERSON1_URL = 'http://swapi.co/api/people/1/';
  const SPECIES2_URL = 'http://swapi.co/api/species/2/';
  const PLANET2_URL = 'http://swapi.co/api/planets/8/';
  const PERSON2_URL = 'http://swapi.co/api/people/3/';
  const resolveAfter2Seconds = () => new Promise(resolve => setTimeout(() => resolve(), 2000));
  const info1 = {
    name: 'Luke Skywalker',
    homeworld: PLANET1_URL,
    species: [SPECIES1_URL]
  }
  const response1 = [
    { homeworld: 'Tatooine', population: '200000' },
    { species: 'Human', language: 'Galactic Basic' }
  ];
  const info2 = {
    name: 'R2-D2',
    homeworld: PLANET2_URL,
    species: [SPECIES2_URL]
  }
  const response2 = [
    { homeworld: 'Naboo', population: '4500000000' },
    { species: 'Droid', language: 'n/a' }
  ];

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('should fetch the correct species', async () => {
    let result;
    const expected = {
      species: 'Human',
      language: 'Galactic Basic'
    }

    fetchMock.get(SPECIES1_URL, {
      status: 200,
      body: { name: 'Human', language: 'Galactic Basic' }
    });

    const promise = people.getSpecies(SPECIES1_URL)
                          .then(data => result = data);

    await resolveAfter2Seconds();

    expect(result).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should fetch the correct homeworld', async () => {
    let result;
    const expected = {
      homeworld: 'Tatooine',
      population: '200000'
    }

    fetchMock.get(PLANET1_URL, {
      status: 200,
      body: { name: 'Tatooine', population: '200000' }
    });

    const promise = people.getHomeWorld(PLANET1_URL)
                          .then(data => result = data);

    await resolveAfter2Seconds();

    expect(result).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should fetch the correct person', async () => {
    let result;
    const expected = new Person('Luke Skywalker', response1);

    fetchMock.get(PLANET1_URL, {
      status: 200,
      body: { name: 'Tatooine', population: '200000' }
    });

    fetchMock.get(SPECIES1_URL, {
      status: 200,
      body: { name: 'Human', language: 'Galactic Basic' }
    });

    const promise = people.getPerson(info1)
                          .then(data => result = data);

    await resolveAfter2Seconds();

    expect(result).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should fetch the correct people', async () => {
    let result;
    const person1 = new Person('Luke Skywalker', response1);
    const person2 = new Person('R2-D2', response2);
    const expected = [person1, person2];

    fetchMock.get(PEOPLE_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    fetchMock.get(PLANET1_URL, {
      status: 200,
      body: { name: 'Tatooine', population: '200000' }
    });

    fetchMock.get(SPECIES1_URL, {
      status: 200,
      body: { name: 'Human', language: 'Galactic Basic' }
    });

    fetchMock.get(PLANET2_URL, {
      status: 200,
      body: { name: 'Naboo', population: '4500000000' }
    });

    fetchMock.get(SPECIES2_URL, {
      status: 200,
      body: { name: 'Droid', language: 'n/a' }
    });

    const promise = people.getPeople()
                          .then(data => result = data);

    await resolveAfter2Seconds();


    expect(result).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should change state of component', async () => {
    const mockComponent = new MockComponent();
    const person1 = new Person('Luke Skywalker', response1);
    const person2 = new Person('R2-D2', response2);
    const preExpected = {
      selectedData: [],
      inFavorites: true,
      planets: [],
      people: [],
      vehicles: [],
      isLoading: true,
      errorStatus: ''
    }
    const expected = {
      selectedData: [person1, person2],
      inFavorites: false,
      planets: [],
      people: [person1, person2],
      vehicles: [],
      isLoading: false,
      errorStatus: ''
    }

    fetchMock.get(PEOPLE_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    fetchMock.get(PLANET1_URL, {
      status: 200,
      body: { name: 'Tatooine', population: '200000' }
    });

    fetchMock.get(SPECIES1_URL, {
      status: 200,
      body: { name: 'Human', language: 'Galactic Basic' }
    });

    fetchMock.get(PLANET2_URL, {
      status: 200,
      body: { name: 'Naboo', population: '4500000000' }
    });

    fetchMock.get(SPECIES2_URL, {
      status: 200,
      body: { name: 'Droid', language: 'n/a' }
    });

    const promise = people.fetchPeople(mockComponent);

    expect(mockComponent.state).toEqual(preExpected);

    await resolveAfter2Seconds();

    expect(mockComponent.state).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should display an error when fetch fails', async () => {
    const mockComponent = new MockComponent();
    const person1 = new Person('Luke Skywalker', response1);
    const person2 = new Person('R2-D2', response2);
    const preExpected = '';
    const expected = 'Error fetching people';

    fetchMock.get(PEOPLE_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    fetchMock.get(PLANET1_URL, {
      status: 200,
      body: { name: 'Tatooine', population: '200000' }
    });

    fetchMock.get(SPECIES1_URL, {
      status: 200,
      body: { name: 'Human', language: 'Galactic Basic' }
    });

    fetchMock.get(PLANET2_URL, {
      status: 200,
      body: { name: 'Naboo', population: '4500000000' }
    });

    fetchMock.get(SPECIES2_URL, { status: 500 });

    const promise = people.fetchPeople(mockComponent);

    expect(mockComponent.state.errorStatus).toEqual(preExpected);

    await resolveAfter2Seconds();

    expect(mockComponent.state.errorStatus).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });
});
