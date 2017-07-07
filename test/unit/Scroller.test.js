import React from 'react';
import { shallow } from 'enzyme';
import Scroller from './components/Scroller';

describe('Scroller.js', () => {
  it('should render the correct component when it mounts', () => {
    const film = {
      title: 'Empire Strikes Back',
      episode: 5
    }
    const wrapper = shallow(<Scroller film={film} />);

    expect(wrapper.find('.film-title').length).toBe(1);
  });

  it('should render the correct film', () => {
    const film = {
      title: 'Empire Strikes Back',
      episode: 5,
      text: 'suh chewie',
      date: 'a long time ago'
    }
    const wrapper = shallow(<Scroller film={film} />);
    const title = wrapper.find('.film-title').props().children;
    const episode = wrapper.find('.film-episode').props().children[1];
    const text = wrapper.find('.film-text').props().children;
    const date = wrapper.find('.film-date').props().children;

    expect(title).toBe('Empire Strikes Back');
    expect(episode).toBe(5);
    expect(text).toBe('suh chewie');
    expect(date).toBe('a long time ago');
  })
});
