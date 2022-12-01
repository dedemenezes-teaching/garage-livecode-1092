import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['carsList', 'brand', 'model', 'owner', 'plate']

  connect() {
    // console.log(this.element);
    // console.log(this.carsListTarget);
    this.fetchAllCars()
  }

  fetchAllCars() {
    fetch('https://wagon-garage-api.herokuapp.com/awesome-1092/cars')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        data.forEach((car) => {
          console.log(car);
          this.insertCarCard(car)
        })
      })
  }

  insertCarCard(car) {
    this.carsListTarget.insertAdjacentHTML('beforeend', `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>`)
  }
  submitCar(event) {
    event.preventDefault()
    console.log(event.currentTarget)
    fetch('https://wagon-garage-api.herokuapp.com/awesome-1092/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        "brand": this.brandTarget.value,
        "model": this.modelTarget.value,
        "owner": this.ownerTarget.value,
        "plate": this.plateTarget.value
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.insertCarCard(data)
      })

      event.currentTarget.reset()
  }
};
