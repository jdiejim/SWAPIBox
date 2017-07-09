import fetchFilmData from '../../model/Film';
import MockComponent from '../mockData/MockComponent';
import fetchMock from 'fetch-mock';

describe('Film.js', () => {
  const FILM1_URL = 'http://swapi.co/api/films/1';
  const FILM2_URL = 'http://swapi.co/api/films/2';
  const FILM3_URL = 'http://swapi.co/api/films/3';
  const FILM4_URL = 'http://swapi.co/api/films/4';
  const FILM5_URL = 'http://swapi.co/api/films/5';
  const FILM6_URL = 'http://swapi.co/api/films/6';
  const FILM7_URL = 'http://swapi.co/api/films/7';
  const resolveAfter2Seconds = () => new Promise(resolve => setTimeout(() => resolve(),2000));
  const body = {
    title: 'The Force Awakens',
    opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
    release_date: '2015-12-11',
    episode_id: '7'
  }

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  })

  it('should change state of component', async () => {
    const mockComponent = new MockComponent();
    const film = {
      title: 'The Force Awakens',
      text: 'Luke Skywalker has vanished.\r\nIn his absence',
      date: '2015-12-11',
      episode: '7'
    }
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
      selectedData: [],
      inFavorites: true,
      planets: [],
      people: [],
      vehicles: [],
      film,
      isLoading: true,
      errorStatus: ''
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    fetchFilmData(mockComponent);

    expect(mockComponent.state).toEqual(preExpected);

    await resolveAfter2Seconds();

    expect(mockComponent.state).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should display an error when fetch fails', async () => {
    const mockComponent = new MockComponent();
    const preExpected = '';
    const expected = 'Error fetching film';

    fetchMock.get(FILM1_URL, { status: 500 });
    fetchMock.get(FILM1_URL, { status: 500 });
    fetchMock.get(FILM2_URL, { status: 500 });
    fetchMock.get(FILM3_URL, { status: 500 });
    fetchMock.get(FILM4_URL, { status: 500 });
    fetchMock.get(FILM5_URL, { status: 500 });
    fetchMock.get(FILM6_URL, { status: 500 });
    fetchMock.get(FILM7_URL, { status: 500 });

    fetchFilmData(mockComponent);

    expect(mockComponent.state.errorStatus).toEqual(preExpected);

    await resolveAfter2Seconds();

    expect(mockComponent.state.errorStatus).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });
});
