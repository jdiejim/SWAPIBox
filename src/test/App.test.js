import React from 'react';
import ReactDOM from 'react-dom';
import fetchMock from 'fetch-mock'
import { mount, shallow } from 'enzyme'
import App from '../components/App';

describe('App.js tests', () => {

  const resolveAfter2Seconds = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 2000);
    })
  }

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it.skip('Should display an error when it does not get the stuff', async () => {
    const film = { title: 'abc', opening_crawl: 'Hello World' };

    fetchMock.get('http://swapi.co/api/films/1', film)

    const wrapper = mount(<App/>);

    await resolveAfter2Seconds();

    expect(fetchMock.called()).toEqual(true);
    expect(wrapper.state('film').title).toEqual('abc');
    expect(wrapper.state('film').text).toEqual('Hello World');
  });
});
