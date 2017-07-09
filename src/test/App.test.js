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
      errorStatus: ''
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
  });

  it.skip('should add people state data to selectedData state if people state not empty and when people button clicked', async () => {
  });

  it.skip('should render cards of people', async () => {
  });

  it.skip('should change errorStatus state if people fetch fails', async () => {
    const expected = 'Error fetching people';
  });

  it.skip('should add data to selectedData and planets state when planets button clicked', async () => {
  });

  it.skip('should add planets state data to selectedData state if planets state not empty and when planets button clicked', async () => {
  });

  it.skip('should render cards of planets', async () => {
  });

  it.skip('should change errorStatus state if planets fetch fails', async () => {
    const expected = 'Error fetching planets';
  });

  it.skip('should add data to selectedData and vehicles state when vehicles button clicked', async () => {
  });

  it.skip('should add vehicles state data to selectedData state if vehicles state not empty and when vehicles button clicked', async () => {
  });

  it.skip('should render cards of vehicles', async () => {
  });

  it.skip('should change errorStatus state if vehicles fetch fails', async () => {
    const expected = 'Error fetching vehicles';
  });

  it.skip('should change inFavorites state to false when handleClick is triggered', async () => {
  });

  it.skip('should change activeAnim state to false when handleClick is triggered', async () => {
  });

  it.skip('should change isLoading state to true when handleClick is triggered and promise not resolved', async () => {
  });

  it.skip('should rener loader when handleClick is triggered and promise not resolved', async () => {
  });

  it.skip('should change isLoading state to false when handleClick is triggered and promise resolved', async () => {
  });

  it.skip('should not render loader when handleClick is triggered and promise resolved', async () => {
  });

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

  it.skip('should change inFavorites state to true when displayFavorites is triggered', () => {
  });

  it.skip('should change selectedData to favorites data if displayFavorites is triggered', () => {
  });

  it.skip('should render favorites view if inFavorites is true', () => {
  });

  it.skip('should render favorites message if there are no favorites', () => {
  });

  it.skip('should render favorite cards', () => {
  });

  it.skip('should render correct amount of favorite cards', () => {
  });

  it.skip('should not render favorite cards if removed', () => {
  });
});
