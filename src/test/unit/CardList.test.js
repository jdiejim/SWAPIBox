import React from 'react';
import { shallow } from 'enzyme';
import CardList from '../../components/CardList';

describe('CardList.js', () => {
  it('should render the correct component when it mounts', () => {
    const wrapper = shallow(
      <CardList
        selectedData={[]}
        favorites={[]}
      />
    );

    expect(wrapper.find('.card-list').length).toEqual(1);
  });

  it('should render the correct amount of cards', () => {
    const selectedData = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];

    const wrapper = shallow(
      <CardList
        selectedData={selectedData}
        favorites={[]}
      />
    );

    expect(wrapper.find('Card').length).toEqual(4);
  });

  it('should pass the correct props to rendered cards', () => {
    const selectedData = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];

    const wrapper = shallow(
      <CardList
        selectedData={selectedData}
        favorites={[]}
      />
    );

    const { name } = wrapper.find('Card').get(2).props.info;

    expect(name).toEqual('Han Solo');
  });

  it('should only render a loader component if loading active', () => {
    const wrapper = shallow(
      <CardList
        selectedData={[]}
        favorites={[]}
        isLoading={true}
      />
    );

    expect(wrapper.find('.card-list').length).toEqual(1);
    expect(wrapper.find('Loader').length).toEqual(1);

    wrapper.setProps({ isLoading: false})

    expect(wrapper.find('.card-list').length).toEqual(1);
    expect(wrapper.find('Loader').length).toEqual(0);
  });

  it('should render a message if there are no favorites', () => {
    const wrapper = shallow(
      <CardList
        selectedData={[]}
        favorites={[]}
        inFavorites={true}
      />
    );

    expect(wrapper.find('.no-favorites').length).toBe(1);
  });
});
