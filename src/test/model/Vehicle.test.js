import Vehicles from '../../model/Vehicles';
import Vehicle from '../../model/Vehicle';
import MockComponent from '../mockData/MockComponent';
import fetchMock from 'fetch-mock';

describe('Vehicles.js', () => {
  const mockComponent = new MockComponent();
  const vehicles = new Vehicles();
  const VEHICLES_URL = 'http://swapi.co/api/vehicles/';
  const info1 = {
    name: 'Sand Crawler',
    model: 'Digger Crawler',
    vehicle_class: 'wheeled',
    passengers: '30',
  }
  const info2 = {
    name: 'T-16 skyhopper',
    model: 'T-16 skyhopper',
    vehicle_class: 'repulsorcraft',
    passengers: '1',
  }
  const vehicle1 = new Vehicle(info1);
  const vehicle2 = new Vehicle(info2);
  const preState = {
    selectedData: [],
    inFavorites: true,
    planets: [],
    people: [],
    vehicles: [],
    film: {},
    isLoading: true,
    errorStatus: ''
  }
  const postState = {
    selectedData: [vehicle1, vehicle2],
    inFavorites: false,
    planets: [],
    people: [],
    vehicles: [vehicle1, vehicle2],
    film: {},
    isLoading: false,
    errorStatus: ''
  }

  const resolveAfter2Seconds = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('should fetch the correct vehicle', async () => {
    expect(vehicle1.name).toBe('Sand Crawler');
    expect(vehicle1.model).toBe('Digger Crawler');
    expect(vehicle1.vehicleClass).toBe('wheeled');
    expect(vehicle1.passengers).toBe('30');
    expect(vehicle2.name).toBe('T-16 skyhopper');
    expect(vehicle2.model).toBe('T-16 skyhopper');
    expect(vehicle2.vehicleClass).toBe('repulsorcraft');
    expect(vehicle2.passengers).toBe('1');
  });

  it('should fetch an array of vehicles', async () => {
    const expected = [vehicle1, vehicle2];

    fetchMock.get(VEHICLES_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    expect(mockComponent.state.vehicles).toEqual([])

    vehicles.fetchVehicles(mockComponent)

    await resolveAfter2Seconds();

    expect(mockComponent.state.vehicles).toEqual(expected);
    expect(fetchMock.called()).toBe(true);
  });

  it('should change state of component', async () => {
    mockComponent.setState(preState)
    fetchMock.get(VEHICLES_URL, {
      status: 200,
      body: { results: [info1, info2] }
    });

    vehicles.fetchVehicles(mockComponent)

    expect(mockComponent.state).toEqual(preState);

    await resolveAfter2Seconds();

    expect(mockComponent.state).toEqual(postState);
    expect(fetchMock.called()).toBe(true);
  });

  it('should display an error when fetch fails', async () => {
    const preError = '';
    const postError = 'Error fetching vehicles';

    fetchMock.get(VEHICLES_URL, { status: 500 });

    const promise = vehicles.fetchVehicles(mockComponent);

    expect(mockComponent.state.errorStatus).toEqual(preError);

    await resolveAfter2Seconds();

    expect(mockComponent.state.errorStatus).toEqual(postError);
    expect(fetchMock.called()).toBe(true);
  });
});
