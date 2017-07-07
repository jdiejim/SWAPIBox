import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../components/Card';

describe('Card.js', () => {
  it('should render the correct component when it mounts', () => {
    const person = { name: 'Darth Vader' };
    const favorites = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];
    const wrapper = shallow(<Card info={person} favorites={favorites} />);

    expect(wrapper.find('.card').length).toBe(1);
  });

  it('should render the correct card', () => {
    const person = { name: 'Darth Vader' };
    const favorites = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];
    const wrapper = shallow(<Card info={person} favorites={favorites} />);
    const title = wrapper.find('.card-title').props().children;

    expect(title).toBe('Darth Vader');
  });

  it('should render the correct labels', () => {
    const person = { name: 'Darth Vader', status: 'single' };
    const wrapper = shallow(<Card info={person} favorites={[]} />);
    const status = wrapper.find('.info-label').get(1).props.children;

    expect(status).toBe('status');
  });

  it('should render the correct value', () => {
    const person = { name: 'Darth Vader', status: 'single' };
    const wrapper = shallow(<Card info={person} favorites={[]} />);
    const status = wrapper.find('.info-value').get(1).props.children;

    expect(status).toBe('single');
  });

  it('should run function when favorite button clicked', () => {
    const mockFn = jest.fn();
    const person = { name: 'Darth Vader' };
    const favorites = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];
    const wrapper = shallow(<Card info={person} favorites={favorites} toggleFavorites={mockFn} />);
    const button = wrapper.find('.card-favorite-button');

    button.simulate('click');
    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenCalledWith(person);
  });

  it('should render the correct class if favorites is found', () => {
    const person = { name: 'Darth Vader', status: 'single' };
    const favorites = [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];
    const wrapper = shallow(<Card info={person} favorites={favorites} />);

    expect(wrapper.find('.card-selected').length).toBe(1);
  })

  it('should render the correct class if favorites not is found', () => {
    const person = { name: 'Darth Vader', status: 'single' };
    const favorites = [
      { name: 'Luke Skywalker' },
      { name: 'Han Solo' },
      { name: 'Chewbacca' },
    ];
    const wrapper = shallow(<Card info={person} favorites={favorites} />);

    expect(wrapper.find('.card-selected').length).toBe(0);
  })
})
