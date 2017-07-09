import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

describe('Header.js', () => {
  it('should render the correct component when it mounts', () => {
    const wrapper = shallow(<Header favorites={[]} />);

    expect(wrapper.find('header').length).toBe(1);
  });

  it('should render the ButtonWrapper', () => {
    const wrapper = shallow(<Header favorites={[]} />);

    expect(wrapper.find('ButtonWrapper').length).toBe(1);
  });

  it('should render the FavoriteButton', () => {
    const wrapper = shallow(<Header favorites={[]} />);

    expect(wrapper.find('FavoriteButton').length).toBe(1);
  });

  it('should pass the correct props to favorite button', () => {
    const favorites = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];
    const wrapper = shallow(<Header favorites={favorites} />);

    expect(wrapper.find('FavoriteButton').props().favorites.length).toBe(4);
  });
})
