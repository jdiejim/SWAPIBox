import React from 'react';
import { shallow } from 'enzyme';
import PlanetDynamic from '../../components/PlanetDynamic';

describe('PlanetDynamic.js', () => {
  it('should render the component when it mounts', () => {
    const wrapper = shallow(<PlanetDynamic terrain={'swamp'}/>);

    expect(wrapper.find('.planet-wraper').length).toBe(1);
  });

  it('should render the correct color', () => {
    const ocean = shallow(<PlanetDynamic terrain={'ocean'}/>);
    const swamp = shallow(<PlanetDynamic terrain={'swamp'}/>);
    const oceanExpected = 'linear-gradient(to top left, #5a86f6 20%, #002070)';
    const swampExpected = 'linear-gradient(to top left, #BED69E 20%, #555C45)';
    const result1 = ocean.node.props.style.background;
    const result2 = swamp.node.props.style.background;

    expect(result1).toBe(oceanExpected);
    expect(result2).toBe(swampExpected);
  });
});
