import axios from 'axios'

export const createNewPlan = (newPlan, id) => {
    return axios
      .post(`/api/users/${id}/plans/new`, {
        title: newPlan.title,
        departureCity: newPlan.departureCity,
        arrivalCity: newPlan.arrivalCity,
        travelMethod: newPlan.travelMethod
      })
      .then(response => {
        // console.log('New Plan Created')
        return response.data
      })
}

export const getAllPlans = userId => {
  return axios
    .get(`/api/users/${userId}/plans`, {
      // headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      // console.log('axios response', response)
      return response.data
    })
    .catch(err => {
      // console.log(err)
    })
}

export const showPlan = (userId, planId)=> {
  return axios
    .get(`/api/users/${userId}/plans/${planId}`, {
    })
    .then(response => {
      // console.log(response)
      return response.data
    })
    .catch(err => {
      // console.log(err)
    })
}

export const updatePlan = (userId, planId, updatedPlan) => {
  return axios
    .put(`/api/users/${userId}/plans/${planId}`, {
      title: updatedPlan.title,
      departureCity: updatedPlan.departureCity,
      arrivalCity: updatedPlan.arrivalCity,
      travelMethod: updatedPlan.travelMethod,
      travelCosts: updatedPlan.travelCosts,
      departureDate: updatedPlan.departureDate,
      arrivalDate: updatedPlan.arrivalDate
    })
    .then(response => {
      // console.log('Plan Updated')
    })
}

export const deletePlan = (userId, planId)=> {
  return axios
    .delete(`/api/users/${userId}/plans/${planId}`, {
    })
    .then(response => {
      // console.log(response)
      return response.data
    })
    .catch(err => {
      // console.log(err)
    })
}
export const updateCosts = (userId, planId, updatedPlan) => {
  return axios
    .put(`/api/users/${userId}/plans/${planId}/costs`, {
      travelCosts: updatedPlan.travelCosts,
      accomodationCosts: updatedPlan.accomodationCosts,
      otherCosts: updatedPlan.otherCosts
    })
    .then(response => {
      // console.log('Plan Updated')
    })
}
export const updateActivities = (userId, planId, updatedPlan) => {
  return axios
    .put(`/api/users/${userId}/plans/${planId}/activities`, {
      activities: updatedPlan.activities
    })
    .then(response => {
      // console.log('Plan Updated')
    })
}