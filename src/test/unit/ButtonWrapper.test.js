import React from 'react';
import { shallow, mount } from 'enzyme';
import ButtonWrapper from '../../components/ButtonWrapper';

describe('ButtonWrapper.js', () => {
  it('should render three buttons when it mounts', () => {
    const wrapper = mount(<ButtonWrapper />);

    console.log(wrapper.debug());

    expect(wrapper.find('button').length).toEqual(3);
  });
});
