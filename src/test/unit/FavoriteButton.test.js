import React from 'react';
import { shallow } from 'enzyme';
import FavoriteButton from '../../components/FavoriteButton';

describe('FavoriteButton.js', () => {
  it('should render the correct component when it mounts', () => {
    const wrapper = shallow(<FavoriteButton />);

    expect(wrapper.find('button').length).toEqual(1);
  });

  it('should contain a h2', () => {
    const wrapper = shallow(<FavoriteButton />)

    expect(wrapper.find('h2').length).toEqual(1)
  })

  it('should call a function when clicked', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<FavoriteButton displayFavorites={mockFn} />);
    const button = wrapper.find('button');

    expect(mockFn).toHaveBeenCalledTimes(0);

    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(1);

    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(2);

    console.log(wrapper.debug());
  })
});
