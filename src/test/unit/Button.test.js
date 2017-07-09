import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/Button';

describe('Button.js', () => {
  it('should render the correct component when it mounts', () => {
    const wrapper = shallow(<Button />)

    expect(wrapper.find('button').length).toBe(1)
  });

  it('should call a function when clicked', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<Button handleClick={mockFn} />);
    const button = wrapper.find('button');

    expect(mockFn).toHaveBeenCalledTimes(0);

    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(1);

    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(2);
  })
});
