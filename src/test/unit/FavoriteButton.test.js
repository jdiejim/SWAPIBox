import React from 'react';
import { shallow } from 'enzyme';
import FavoriteButton from '../../components/FavoriteButton';

describe('FavoriteButton.js', () => {
  it('should render the correct component when it mounts', () => {
    const wrapper = shallow(<FavoriteButton favorites={[]} />);

    expect(wrapper.find('button').length).toEqual(1);
  });

  it('should call a function when is clicked', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<FavoriteButton displayFavorites={mockFn} favorites={[]}  />);
    const button = wrapper.find('button');

    expect(mockFn).toHaveBeenCalledTimes(0);

    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(1);

    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should render the correct length of favorites', () => {
    const favorites = [ { name: 'favorite1' }, { name: 'favorite2' } ];
    const wrapper = shallow(<FavoriteButton favorites={favorites} />);
    const length = wrapper.find('span').props().children[1];

    expect(length).toBe(2)
  });

  it('should render the correct class name if in favorites view', () => {
    const favorites = [ { name: 'favorite1' }, { name: 'favorite2' } ];
    const wrapper = shallow(<FavoriteButton favorites={favorites} inFavorites={false} />);
    const wrapperInFavorites = shallow(<FavoriteButton favorites={favorites} inFavorites={true} />);
    const preExpected = 'favorite-button';
    const postExpected = 'favorite-button in-favorites';

    expect(wrapper.node.props.className).toBe(preExpected);
    expect(wrapperInFavorites.node.props.className).toBe(postExpected);
  });
});
