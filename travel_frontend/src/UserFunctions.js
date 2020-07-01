import axios from 'axios';
// import history from './history';

export const register = newUser => {
  return axios
    .post('/api/users/register', {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      // console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('/api/users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if(!response.data.error){
        localStorage.setItem('usertoken', response.data)
        return response.data
      } else {
        console.log(response.data);
        return response.data
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('/api/users/profil', {
      // headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}