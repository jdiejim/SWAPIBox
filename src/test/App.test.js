import React from 'react';
import ReactDOM from 'react-dom';
import fetchMock from 'fetch-mock'
import { mount, shallow } from 'enzyme'
import App from '../components/App';
import LocalStorageMock from './mockData/LocalStorageMock';
import Planet from '../model/Planet';
import Vehicle from '../model/Vehicle';
import Person from '../model/Person';


describe('App.js tests', () => {
  const FILM1_URL = 'http://swapi.co/api/films/1';
  const FILM2_URL = 'http://swapi.co/api/films/2';
  const FILM3_URL = 'http://swapi.co/api/films/3';
  const FILM4_URL = 'http://swapi.co/api/films/4';
  const FILM5_URL = 'http://swapi.co/api/films/5';
  const FILM6_URL = 'http://swapi.co/api/films/6';
  const FILM7_URL = 'http://swapi.co/api/films/7';
  const PLANETS_URL = 'http://swapi.co/api/planets/';
  const VEHICLES_URL = 'http://swapi.co/api/vehicles/';
  const PEOPLE_URL = 'http://swapi.co/api/vehicles/';
  const resolveAfter2Seconds = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

  global.localStorage = new LocalStorageMock;

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it.skip('should render the correct components when it mounts', () => {
    const wrapper = shallow(<App/>)

    expect(wrapper.find('.App').length).toEqual(1)
    expect(wrapper.find('Main').length).toEqual(1)
  });

  it.skip('should have a default state', () => {
    const wrapper = shallow(<App />);
    const appState = wrapper.state();
    const expected = {
      selectedData: [],
      favorites: [],
      inFavorites: false,
      people: [],
      planets: [],
      vehicles: [],
      film: {},
      isLoading: false,
      activeAnim: false,
      errorStatus: '',
      selectedButton: ''
    }

    expect(appState).toEqual(expected);
  });

  it.skip('should add film to state when it mounts', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }
    const expected = {
      title: 'The Force Awakens',
      text: 'Luke Skywalker has vanished.\r\nIn his absence',
      date: '2015-12-11',
      episode: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const wrapper = mount(<App />);

    await resolveAfter2Seconds();

    expect(wrapper.state('film')).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should render scroller with film data when it mounts', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const wrapper = mount(<App />);
    const scroller = wrapper.find('Scroller');

    await resolveAfter2Seconds();

    const title = scroller.find('.film-title').props().children;
    const text = scroller.find('.film-text').props().children;
    const episode = scroller.find('.film-episode').props().children[1];
    const date = scroller.find('.film-date').props().children[1];

    expect(title).toBe('The Force Awakens')
    expect(text).toBe('Luke Skywalker has vanished.\r\nIn his absence')
    expect(episode).toBe('7')
    expect(date).toBe('2015-12-11')
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should change errorStatus state if film fetch fails', async () => {
    const expected = 'Error fetching film';

    fetchMock.get(FILM1_URL, { status: 500 });
    fetchMock.get(FILM1_URL, { status: 500 });
    fetchMock.get(FILM2_URL, { status: 500 });
    fetchMock.get(FILM3_URL, { status: 500 });
    fetchMock.get(FILM4_URL, { status: 500 });
    fetchMock.get(FILM5_URL, { status: 500 });
    fetchMock.get(FILM6_URL, { status: 500 });
    fetchMock.get(FILM7_URL, { status: 500 });

    const wrapper = mount(<App/>);
    const preErrorStatus = wrapper.state('errorStatus');

    expect(preErrorStatus).toBe('');

    await resolveAfter2Seconds();

    const postErrorStatus = wrapper.state('errorStatus');

    expect(postErrorStatus).toBe(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should render no cards on mount', () => {
    const wrapper = mount(<App />);

    expect(wrapper.find('Card').length).toBe(0);
  });

  it.skip('should render card if selectedData state not empty', () => {
    const wrapper = mount(<App />);
    const selectedData = [{
      name: 'R2-D2',
      homeworld: 'Naboo',
      population: '4500000000',
      species: 'Droid',
      language: 'n/a'
    }];

    expect(wrapper.find('Card').length).toBe(0);

    wrapper.setState({ selectedData });

    expect(wrapper.find('Card').length).toBe(1);
  });

  it.skip('should add data to selectedData and people state when people button clicked', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const PEOPLE_URL = 'http://swapi.co/api/people/';
    const SPECIES1_URL = 'http://swapi.co/api/species/1/';
    const PLANET1_URL = 'http://swapi.co/api/planets/1/';
    const PERSON1_URL = 'http://swapi.co/api/people/1/';
    const SPECIES2_URL = 'http://swapi.co/api/species/2/';
    const PLANET2_URL = 'http://swapi.co/api/planets/8/';
    const PERSON2_URL = 'http://swapi.co/api/people/3/';
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

    const wrapper = mount(<App />);
    const peopleButton = wrapper.find('#fetch-people-btn');

    expect(wrapper.state('selectedData')).toEqual([]);
    expect(wrapper.state('people')).toEqual([]);

    peopleButton.simulate('click');

    await resolveAfter2Seconds();

    expect(wrapper.state('selectedData')).toEqual(expected);
    expect(wrapper.state('people')).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should add people state data to selectedData state if people state not empty and when people button clicked', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const PEOPLE_URL = 'http://swapi.co/api/people/';
    const SPECIES1_URL = 'http://swapi.co/api/species/1/';
    const PLANET1_URL = 'http://swapi.co/api/planets/1/';
    const PERSON1_URL = 'http://swapi.co/api/people/1/';
    const SPECIES2_URL = 'http://swapi.co/api/species/2/';
    const PLANET2_URL = 'http://swapi.co/api/planets/8/';
    const PERSON2_URL = 'http://swapi.co/api/people/3/';
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

    const wrapper = mount(<App />);
    const peopleButton = wrapper.find('#fetch-people-btn');

    expect(wrapper.state('selectedData')).toEqual([]);
    expect(wrapper.state('people')).toEqual([]);

    wrapper.setState({ people: expected})

    expect(wrapper.state('people')).toEqual(expected);

    peopleButton.simulate('click');

    await resolveAfter2Seconds();

    expect(wrapper.state('selectedData')).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should render cards of people', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const PEOPLE_URL = 'http://swapi.co/api/people/';
    const SPECIES1_URL = 'http://swapi.co/api/species/1/';
    const PLANET1_URL = 'http://swapi.co/api/planets/1/';
    const PERSON1_URL = 'http://swapi.co/api/people/1/';
    const SPECIES2_URL = 'http://swapi.co/api/species/2/';
    const PLANET2_URL = 'http://swapi.co/api/planets/8/';
    const PERSON2_URL = 'http://swapi.co/api/people/3/';
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

    const wrapper = mount(<App />);
    const peopleButton = wrapper.find('#fetch-people-btn');

    expect(wrapper.find('Card').length).toBe(0);

    peopleButton.simulate('click');

    await resolveAfter2Seconds();

    expect(wrapper.find('Card').length).toBe(2);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should change errorStatus state if people fetch fails', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    const PEOPLE_URL = 'http://swapi.co/api/people/';
    const SPECIES1_URL = 'http://swapi.co/api/species/1/';
    const PLANET1_URL = 'http://swapi.co/api/planets/1/';
    const PERSON1_URL = 'http://swapi.co/api/people/1/';
    const SPECIES2_URL = 'http://swapi.co/api/species/2/';
    const PLANET2_URL = 'http://swapi.co/api/planets/8/';
    const PERSON2_URL = 'http://swapi.co/api/people/3/';

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });
    fetchMock.get(PEOPLE_URL, { status: 500 });
    fetchMock.get(PLANET1_URL, { status: 500 });
    fetchMock.get(SPECIES1_URL, { status: 500 });
    fetchMock.get(PLANET2_URL, { status: 500 });
    fetchMock.get(SPECIES2_URL, { status: 500 });

    const wrapper = mount(<App />);
    const peopleButton = wrapper.find('#fetch-people-btn');

    expect(wrapper.state('errorStatus')).toBe('');

    peopleButton.simulate('click');

    await resolveAfter2Seconds();

    const expected = 'Error fetching people';

    expect(wrapper.state('errorStatus')).toBe(expected);
    expect(fetchMock.called()).toBe(true);
  });

  // Juan
  it.skip('should add data to selectedData and planets state when planets button clicked', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const PLANETS_URL = 'http://swapi.co/api/planets/';
    const PEOPLE1_URL = 'http://swapi.co/api/people/1';
    const PEOPLE2_URL = 'http://swapi.co/api/people/2';
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
    const resident1 = ['Luke Skywalker'];
    const resident2 = ['C-3PO'];
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);

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

    const wrapper = mount(<App />);
    const planetsBtn = wrapper.find('#fetch-planets-btn');

    expect(wrapper.state('selectedData')).toEqual([]);
    expect(wrapper.state('planets')).toEqual([]);

    planetsBtn.simulate('click');

    await resolveAfter2Seconds();

    const expected = [planet1, planet2];

    expect(wrapper.state('selectedData')).toEqual(expected);
    expect(wrapper.state('planets')).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should add planets state data to selectedData state if planets state not empty and when planets button clicked', () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Tatooine',
      terrain: 'rocky',
      population: 1,
      climate: 'Tropical',
      residents: []
    }
    const info2 = {
      name: 'Hoth',
      terrain: 'Ice',
      population: 2,
      climate: 'Cold',
      residents: []
    }
    const resident1 = ['Luke Skywalker'];
    const resident2 = ['C-3PO'];
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);
    const expected = [planet1, planet2];

    const wrapper = mount(<App />);
    const planetsBtn = wrapper.find('#fetch-planets-btn');

    expect(wrapper.state('selectedData')).toEqual([]);

    wrapper.setState({ planets: [planet1, planet2] });

    expect(wrapper.state('planets')).toEqual(expected);

    planetsBtn.simulate('click');

    expect(wrapper.state('selectedData')).toEqual(expected);
  });

  it.skip('should render cards of planets', async () => {
    const PLANETS_URL = 'http://swapi.co/api/planets/';
    const PEOPLE1_URL = 'http://swapi.co/api/people/1';
    const PEOPLE2_URL = 'http://swapi.co/api/people/2';
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

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
    const resident1 = ['Luke Skywalker'];
    const resident2 = ['C-3PO'];
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);

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

    const wrapper = mount(<App />);
    const planetsBtn = wrapper.find('#fetch-planets-btn');

    expect(wrapper.find('Card').length).toBe(0);

    planetsBtn.simulate('click');

    await resolveAfter2Seconds();

    expect(wrapper.find('Card').length).toBe(2);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should change errorStatus state if planets fetch fails', async () => {
    const PLANETS_URL = 'http://swapi.co/api/planets/';
    const PEOPLE1_URL = 'http://swapi.co/api/people/1';
    const PEOPLE2_URL = 'http://swapi.co/api/people/2';
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });
    fetchMock.get(PLANETS_URL, { status: 500 });
    fetchMock.get(PEOPLE1_URL, { status: 500 });
    fetchMock.get(PEOPLE2_URL, { status: 500 });

    const wrapper = mount(<App />);
    const planetsBtn = wrapper.find('#fetch-planets-btn');

    expect(wrapper.state('errorStatus')).toBe('');

    planetsBtn.simulate('click');

    await resolveAfter2Seconds();

    const expected = 'Error fetching planets';

    expect(wrapper.state('errorStatus')).toBe(expected);
    expect(fetchMock.called()).toBe(true);
  });

  // Juan
  it.skip('should add data to selectedData and vehicles state when vehicles button clicked', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      vehicle_class: 'wheeled',
      passengers: '30',
    }
    const info2 = {
      name: 'T-16 skyhopper',
      model: 'T-16 skyhopper',
      vehicle_class: 'repulsorcraft',
      passengers: '1',
    }

    fetchMock.get(VEHICLES_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    const vehicle1 = new Vehicle(info1);
    const vehicle2 = new Vehicle(info2);

    const wrapper = mount(<App />);
    const vehiclesBtn = wrapper.find('#fetch-vehicles-btn');

    expect(wrapper.state('selectedData')).toEqual([]);
    expect(wrapper.state('vehicles')).toEqual([]);

    vehiclesBtn.simulate('click');

    await resolveAfter2Seconds();

    const expected = [vehicle1, vehicle2];

    expect(wrapper.state('selectedData')).toEqual(expected);
    expect(wrapper.state('vehicles')).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should add vehicles state data to selectedData state if vehicles state not empty and when vehicles button clicked', () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      vehicle_class: 'wheeled',
      passengers: '30',
    }
    const info2 = {
      name: 'T-16 skyhopper',
      model: 'T-16 skyhopper',
      vehicle_class: 'repulsorcraft',
      passengers: '1',
    }

    const vehicle1 = new Vehicle(info1);
    const vehicle2 = new Vehicle(info2);

    const wrapper = mount(<App />);
    const vehiclesBtn = wrapper.find('#fetch-vehicles-btn');

    expect(wrapper.state('vehicles')).toEqual([]);
    expect(wrapper.state('selectedData')).toEqual([]);

    wrapper.setState({ vehicles: [vehicle1, vehicle2] });

    const expected = [vehicle1, vehicle2];

    expect(wrapper.state('vehicles')).toEqual(expected);

    vehiclesBtn.simulate('click');

    expect(wrapper.state('selectedData')).toEqual(expected);
  });

  it.skip('should render cards of vehicles', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      vehicle_class: 'wheeled',
      passengers: '30',
    }
    const info2 = {
      name: 'T-16 skyhopper',
      model: 'T-16 skyhopper',
      vehicle_class: 'repulsorcraft',
      passengers: '1',
    }

    fetchMock.get(VEHICLES_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    const wrapper = mount(<App />);
    const vehiclesBtn = wrapper.find('#fetch-vehicles-btn');

    expect(wrapper.find('Card').length).toBe(0);

    vehiclesBtn.simulate('click');

    await resolveAfter2Seconds();

    expect(wrapper.find('Card').length).toBe(2);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should change errorStatus state if vehicles fetch fails', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });
    fetchMock.get(VEHICLES_URL, { status: 500 });

    const wrapper = mount(<App />);
    const vehiclesBtn = wrapper.find('#fetch-vehicles-btn');

    expect(wrapper.state('errorStatus')).toBe('');

    vehiclesBtn.simulate('click');

    await resolveAfter2Seconds();

    const expected = 'Error fetching vehicles';

    expect(wrapper.state('errorStatus')).toBe(expected);
    expect(fetchMock.called()).toBe(true);
  });

  // Joe
  it('should change inFavorites state to false when handleClick is triggered', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const PLANETS_URL = 'http://swapi.co/api/planets/';
    const PEOPLE1_URL = 'http://swapi.co/api/people/1';
    const PEOPLE2_URL = 'http://swapi.co/api/people/2';
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
    const resident1 = ['Luke Skywalker'];
    const resident2 = ['C-3PO'];
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);

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

    const wrapper = mount(<App />);
    const planetsButton = wrapper.find('#fetch-planets-btn')

    wrapper.setState({ inFavorites: true });

    planetsButton.simulate('click');

    expect(wrapper.state('inFavorites')).toBe(false);
  });

  it('should change activeAnim state to false when handleClick is triggered', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const PLANETS_URL = 'http://swapi.co/api/planets/';
    const PEOPLE1_URL = 'http://swapi.co/api/people/1';
    const PEOPLE2_URL = 'http://swapi.co/api/people/2';
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
    const resident1 = ['Luke Skywalker'];
    const resident2 = ['C-3PO'];
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);

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

    const wrapper = mount(<App />);
    const planetsButton = wrapper.find('#fetch-planets-btn')

    wrapper.setState({ activeAnim: true })

    planetsButton.simulate('click');

    expect(wrapper.state('activeAnim')).toBe(false);
  });

  // Juan
  it.skip('should change selectedButton state to the title of the button clicked', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const PLANETS_URL = 'http://swapi.co/api/planets/';
    const PEOPLE1_URL = 'http://swapi.co/api/people/1';
    const PEOPLE2_URL = 'http://swapi.co/api/people/2';
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
    const resident1 = ['Luke Skywalker'];
    const resident2 = ['C-3PO'];
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);

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

    const wrapper = mount(<App />);
    const planetsBtn = wrapper.find('#fetch-planets-btn');

    expect(wrapper.state('selectedButton')).toBe('');

    planetsBtn.simulate('click');

    await resolveAfter2Seconds();

    const expected = 'planets';

    expect(wrapper.state('selectedButton')).toBe(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should change isLoading state to true when handleClick is triggered and promise not resolved', () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      vehicle_class: 'wheeled',
      passengers: '30',
    }

    fetchMock.get(VEHICLES_URL, {
      status: 200,
      body: { results: [info1] }
    });

    const wrapper = mount(<App />);
    const vehiclesBtn = wrapper.find('#fetch-vehicles-btn');

    expect(wrapper.state('isLoading')).toBe(false);

    vehiclesBtn.simulate('click');

    expect(wrapper.state('isLoading')).toBe(true);
  });

  it.skip('should render loader when handleClick is triggered and promise not resolved', () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      vehicle_class: 'wheeled',
      passengers: '30',
    }

    fetchMock.get(VEHICLES_URL, {
      status: 200,
      body: { results: [info1] }
    });

    const wrapper = mount(<App />);
    const vehiclesBtn = wrapper.find('#fetch-vehicles-btn');

    expect(wrapper.find('Loader').length).toBe(0);

    vehiclesBtn.simulate('click');

    expect(wrapper.find('Loader').length).toBe(1);
  });

  it.skip('should change isLoading state to false when handleClick is triggered and promise resolved', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      vehicle_class: 'wheeled',
      passengers: '30',
    }

    fetchMock.get(VEHICLES_URL, {
      status: 200,
      body: { results: [info1] }
    });

    const wrapper = mount(<App />);
    const vehiclesBtn = wrapper.find('#fetch-vehicles-btn');

    expect(wrapper.state('isLoading')).toBe(false);

    vehiclesBtn.simulate('click');

    expect(wrapper.state('isLoading')).toBe(true);

    await resolveAfter2Seconds();

    expect(wrapper.state('isLoading')).toBe(false);
  });

  it.skip('should not render loader when handleClick is triggered and promise resolved', async () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      vehicle_class: 'wheeled',
      passengers: '30',
    }

    fetchMock.get(VEHICLES_URL, {
      status: 200,
      body: { results: [info1] }
    });

    const wrapper = mount(<App />);
    const vehiclesBtn = wrapper.find('#fetch-vehicles-btn');

    expect(wrapper.find('Loader').length).toBe(0);

    vehiclesBtn.simulate('click');

    expect(wrapper.find('Loader').length).toBe(1);

    await resolveAfter2Seconds();

    expect(wrapper.find('Loader').length).toBe(0);
  });

  // Joe
  it.skip('should add correct card to favorites if save button is triggered', () => {

  });

  it.skip('should render correct favorites length in button when card is added', () => {
  });

  it.skip('should change activeAnim state to true when toggleFavorites is triggered', () => {
  });

  it.skip('should remove correct card in favorites if save button is triggered and card already in favorites', () => {
  });

  it.skip('should render correct favorites length in button when card is removed', () => {
  });

  it.skip('should add favorites in localStorage to state on mount', () => {
  });

  it.skip('should add favorites to localStorage when toggleFavorites is triggered', () => {
  });

  // Juan
  it.skip('should change inFavorites state to true when displayFavorites is triggered', () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const wrapper = mount(<App />);
    const displayFavoritesBtn = wrapper.find('.favorite-button');

    expect(wrapper.state('inFavorites')).toBe(false);

    displayFavoritesBtn.simulate('click');

    expect(wrapper.state('inFavorites')).toBe(true);
  });

  it.skip('should change selectedData to favorites data if displayFavorites is triggered', () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Tatooine',
      terrain: 'rocky',
      population: 1,
      climate: 'Tropical',
      residents: ['url']
    }
    const info2 = {
      name: 'Hoth',
      terrain: 'Ice',
      population: 2,
      climate: 'Cold',
      residents: ['url']
    }
    const resident1 = ['Luke Skywalker'];
    const resident2 = ['C-3PO'];
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);
    const expected = [planet1, planet2];

    const wrapper = mount(<App />);
    const displayFavoritesBtn = wrapper.find('.favorite-button');

    wrapper.setState({ favorites: [planet1, planet2] });

    expect(wrapper.state('selectedData')).toEqual([]);

    displayFavoritesBtn.simulate('click');

    expect(wrapper.state('selectedData')).toEqual(expected);
  });

  it.skip('should render favorites message if there are no favorites', () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const wrapper = mount(<App />);
    const displayFavoritesBtn = wrapper.find('.favorite-button');

    expect(wrapper.find('.fav-msg').length).toBe(0);

    displayFavoritesBtn.simulate('click');

    expect(wrapper.find('.fav-msg').length).toBe(1);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should render favorite cards if inFavorites is true', () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Tatooine',
      terrain: 'rocky',
      population: 1,
      climate: 'Tropical',
      residents: ['url']
    }
    const info2 = {
      name: 'Hoth',
      terrain: 'Ice',
      population: 2,
      climate: 'Cold',
      residents: ['url']
    }
    const resident1 = ['Luke Skywalker'];
    const resident2 = ['C-3PO'];
    const planet1 = new Planet(info1, resident1);
    const planet2 = new Planet(info2, resident2);
    const expected = [planet1, planet2];

    const wrapper = mount(<App />);
    const displayFavoritesBtn = wrapper.find('.favorite-button');

    wrapper.setState({ favorites: [planet1, planet2] });

    expect(wrapper.find('Card').length).toBe(0);

    displayFavoritesBtn.simulate('click');

    expect(wrapper.find('Card').length).toBe(2);
    expect(fetchMock.called()).toBe(true);
  });

  it.skip('should not render favorite cards if removed', () => {
    const body = {
      title: 'The Force Awakens',
      opening_crawl: 'Luke Skywalker has vanished.\r\nIn his absence',
      release_date: '2015-12-11',
      episode_id: '7'
    }

    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM1_URL, { status: 200, body });
    fetchMock.get(FILM2_URL, { status: 200, body });
    fetchMock.get(FILM3_URL, { status: 200, body });
    fetchMock.get(FILM4_URL, { status: 200, body });
    fetchMock.get(FILM5_URL, { status: 200, body });
    fetchMock.get(FILM6_URL, { status: 200, body });
    fetchMock.get(FILM7_URL, { status: 200, body });

    const info1 = {
      name: 'Tatooine',
      terrain: 'rocky',
      population: 1,
      climate: 'Tropical',
      residents: ['url']
    }

    const resident1 = ['Luke Skywalker'];
    const planet1 = new Planet(info1, resident1);
    const expected = [planet1];

    const wrapper = mount(<App />);
    const displayFavoritesBtn = wrapper.find('.favorite-button');

    wrapper.setState({ favorites: [planet1] });

    expect(wrapper.find('Card').length).toBe(0);

    displayFavoritesBtn.simulate('click');

    expect(wrapper.find('Card').length).toBe(1);

    const saveButton = wrapper.find('.card-favorite-button');

    saveButton.simulate('click');

    expect(wrapper.find('Card').length).toBe(0);
    expect(fetchMock.called()).toBe(true);
  });
});
