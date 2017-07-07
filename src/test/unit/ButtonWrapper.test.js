import React from 'react';
import { shallow, mount } from 'enzyme';
import ButtonWrapper from '../../components/ButtonWrapper';

describe('ButtonWrapper.js', () => {
  it('should render a section', () => {
    const wrapper = shallow(<ButtonWrapper />);

    expect(wrapper.find('section').length).toEqual(1);
  });

  it('should render three buttons when it renders', () => {
    const wrapper = shallow(<ButtonWrapper />);

    expect(wrapper.find('Button').length).not.toBe(2);
    expect(wrapper.find('Button').length).toBe(3);
  });

  it('should render three buttons with proper titles when it renders', () => {
    const wrapper = mount(<ButtonWrapper />);

    expect(wrapper.containsAnyMatchingElements([
      <button>people</button>,
      <button>planets</button>,
      <button>vehicles</button>,
    ])).toEqual(true)
  });
});
