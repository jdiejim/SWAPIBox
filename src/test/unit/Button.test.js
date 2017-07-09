import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/Button';

describe('Button.js', () => {
  it('should render the correct component when it mounts', () => {
    const wrapper = shallow(<Button />);

    expect(wrapper.find('button').length).toBe(1)
  });

  it('should render the correct lable', () => {
    const wrapper = shallow(<Button title="planets" />);
    const title = wrapper.find('button').props().children;

    expect(title).toBe('planets');
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
  });

  it('should render the correct class name if button selected', () => {
    const favorites = [ { name: 'favorite1' }, { name: 'favorite2' } ];
    const wrapper = shallow(<Button title="planets" selectedButton="" />);
    const activeWrapper = shallow(<Button title="planets" selectedButton="planets" />);
    const preExpected = 'fetch-button';
    const postExpected = 'fetch-button selected-button';

    expect(wrapper.node.props.className).toBe(preExpected);
    expect(activeWrapper.node.props.className).toBe(postExpected);
  });
});
