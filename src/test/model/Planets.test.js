import Planets from '../../model/Planets';
import Planet from '../../model/Planet';
import MockComponent from '../mockData/MockComponent';
import fetchMock from 'fetch-mock';

describe('Planets.js', () => {
  const url = 'http://swapi.co/api/planets/'
  const url1 = 'http://swapi.co/api/people/1';
  const url2 = 'http://swapi.co/api/people/2';
  const errorUrl = 'http://swapi.co/api/people/2//';
  const resident1 = ['Luke Skywalker'];
  const resident2 = ['C-3PO'];
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

  const resolveAfter2Seconds = () =>
   new Promise(resolve => setTimeout(() => resolve(), 2000))

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  })

  it('Should fetch the correct resident of the planet', async () => {
    let result;

    fetchMock.get(url1, {name: 'Luke'})

    const promise = new Planets().getResidents(url1)
                            .then(data => result = data)

    await resolveAfter2Seconds();

    expect(result).toBe('Luke')
    expect(fetchMock.called()).toBe(true);
  })

  it('Should fetch the correct planet', async () => {
    let result;
    const expected = new Planet(info1, resident1)

    fetchMock.get(url1, { name: 'Luke Skywalker' })

    const promise = new Planets().getPlanet(info1)
                                        .then(data => result = data)

    await resolveAfter2Seconds();

    expect(result).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  })

  it('Should fetch an array of planets', async () => {
    let result;
    const planet1 = new Planet(info1, resident1)
    const planet2 = new Planet(info2, resident2);
    const expected = [planet1, planet2]

    fetchMock.get(url, { results: [info1, info2] })
    fetchMock.get(url1, { name: 'Luke Skywalker' })
    fetchMock.get(url2, { name: 'C-3PO' })

    const promise = new Planets().getPlanets()
                                 .then(data => result = data)

    await resolveAfter2Seconds();

    expect(result).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  })

  it('Should change state of component', async () => {
    const mockComponent = new MockComponent();
    const planet1 = new Planet(info1, resident1)
    const planet2 = new Planet(info2, resident2);
    const preExpected = {
      selectedData: [],
      inFavorites: true,
      planets: [],
      isLoading: true,
      errorStatus: ''
    }
    const expected = {
      selectedData: [planet1, planet2],
      inFavorites: false,
      planets: [planet1, planet2],
      isLoading: false,
      errorStatus: ''
    }

    fetchMock.get(url, { results: [info1, info2] })
    fetchMock.get(url1, { name: 'Luke Skywalker' })
    fetchMock.get(url2, { name: 'C-3PO' })

    const promise = new Planets().fetchPlanets(mockComponent)

    expect(mockComponent.state).toEqual(preExpected);

    await resolveAfter2Seconds();

    expect(mockComponent.state).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  })

  it('Should display an error when fetch fails', async () => {
    const mockComponent = new MockComponent();
    const planet1 = new Planet(info1, resident1)
    const planet2 = new Planet(info2, resident2);
    const preExpected = ''
    const expected = 'Error fetching planets'

    fetchMock.get(url, { results: [info1, info2] })
    fetchMock.get(url1, { name: 'Luke Skywalker' })
    fetchMock.get(url2, {
      status: 500
    })

    const promise = new Planets().fetchPlanets(mockComponent)

    expect(mockComponent.state.errorStatus).toEqual(preExpected);

    await resolveAfter2Seconds();

    expect(mockComponent.state.errorStatus).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  })
})
