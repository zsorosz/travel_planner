import axios from 'axios'

export const createNewPlan = (newPlan, id) => {
    return axios
      .post(`/api/users/${id}/plans/new`, {
        departureCity: newPlan.departureCity,
        arrivalCity: newPlan.arrivalCity,
        travelMethod: newPlan.travelMethod
      })
      .then(response => {
        console.log('New Plan Created')
      })
}

export const getAllPlans = userId => {
  return axios
    .get(`/api/users/${userId}/plans`, {
      // headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log('axios response', response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}