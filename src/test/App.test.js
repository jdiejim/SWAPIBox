import React from 'react';
import ReactDOM from 'react-dom';
import fetchMock from 'fetch-mock'
import { mount, shallow } from 'enzyme'
import App from '../components/App';
import LocalStorageMock from './mockData/LocalStorageMock';

describe('App.js tests', () => {
  const FILM1_URL = 'http://swapi.co/api/films/1';
  const FILM2_URL = 'http://swapi.co/api/films/2';
  const FILM3_URL = 'http://swapi.co/api/films/3';
  const FILM4_URL = 'http://swapi.co/api/films/4';
  const FILM5_URL = 'http://swapi.co/api/films/5';
  const FILM6_URL = 'http://swapi.co/api/films/6';
  const FILM7_URL = 'http://swapi.co/api/films/7';
  const resolveAfter2Seconds = () => new Promise(resolve => setTimeout(() => resolve(), 2000));
  global.localStorage = new LocalStorageMock;

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('should render the correct components when it mounts', () => {
    const wrapper = shallow(<App/>)

    expect(wrapper.find('.App').length).toEqual(1)
    expect(wrapper.find('Main').length).toEqual(1)
  });

  it('should have a default state', () => {
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
      errorStatus: ''
    }

    expect(appState).toEqual(expected);
  });

  it('should add film to state when it mounts', async () => {
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

  it('should render scroller with film data when it mounts', async () => {
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
});
