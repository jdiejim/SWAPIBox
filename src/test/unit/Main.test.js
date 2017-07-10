import React from 'react';
import { shallow, mount } from 'enzyme';
import Main from '../../components/Main';

describe('Main.js', () => {
  it('should render the correct component when it mounts', () => {
    const wrapper = shallow(<Main />);

    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('CardList').length).toBe(1);
  });

  it('should pass the correct props to Header', () => {
    const displayFavorites = () => {};
    const inFavorites = true;
    const favorites = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];

    const wrapper = shallow(
      <Main
        favorites={favorites}
        displayFavorites={displayFavorites}
        inFavorites={inFavorites}
      />
    );

    expect(wrapper.find('Header').props().favorites.length).toBe(4);
    expect(wrapper.find('Header').props().displayFavorites).toBeInstanceOf(Function);
    expect(wrapper.find('Header').props().inFavorites).toBe(true);
  })

  it('should pass the correct props to CardList', () => {
    const inFavorites = true;
    const isLoading = false;
    const activeAnim = true;
    const toggleFavorites = () => {};
    const favorites = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];
    const selectedData = favorites;

    const wrapper = shallow(
      <Main
        favorites={favorites}
        inFavorites={inFavorites}
        isLoading={isLoading}
        activeAnim={activeAnim}
        toggleFavorites={toggleFavorites}
        selectedData={selectedData}
      />
    );

    expect(wrapper.find('CardList').props().inFavorites).toBe(true);
    expect(wrapper.find('CardList').props().isLoading).toBe(false);
    expect(wrapper.find('CardList').props().activeAnim).toBe(true);
    expect(wrapper.find('CardList').props().toggleFavorites).toBeInstanceOf(Function);
    expect(wrapper.find('CardList').props().favorites.length).toBe(4);
    expect(wrapper.find('CardList').props().selectedData.length).toBe(4);
  })
});
