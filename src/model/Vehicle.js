class Vehicle {
  constructor({ name, model, vehicle_class: vehicleClass, passengers }) {
    this.name = name;
    this.model = model;
    this.vehicleClass = vehicleClass;
    this.passengers = passengers;
  }
}

export default Vehicle;
