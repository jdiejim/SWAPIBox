import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../components/Loader';

describe('Loader.js', () => {
  it('should render the component when it mounts', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.find('.bb8').length).toBe(1);
  });
});
