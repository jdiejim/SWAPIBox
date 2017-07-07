import { VEHICLES_URL } from '../utils/constants';
import Vehicle from './Vehicle';

class Vehicles {
  fetchVehicles(component) {
    fetch(VEHICLES_URL)
      .then(res => res.json())
      .then(({ results }) => {
        const selectedData = results.map(this.getVehicle);

        component.setState({ selectedData, inFavorites: false, vehicles: selectedData, isLoading: false });
      })
      .catch(err => console.log(err));
  }

  getVehicle(vehicle) {
    return new Vehicle(vehicle);
  }
}

export default Vehicles;
