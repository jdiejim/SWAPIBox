import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '../../components/Button';

describe('Button.js', () => {
  it('should render the correct component when it mounts', () => {
    const wrapper = shallow(<Button />)

    expect(wrapper.find('button').length).toBe(1)
  });

  it('Should call a function when clicked', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<Button handleClick={mockFn}/>);
    const button = wrapper.find('button');

    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(1);
  })
});
