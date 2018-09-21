import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:4000/api',
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  getPins() {
    return service
      .get('/pins')
      .then(res => res.data)
      .catch(errHandler);
  },

  getPin(id) {
    return service
      .get('/pins/' + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  postPin(data) {
    return service
      .post('/pins', data)
      .then(res => res.data)
      .catch(errHandler);
  },

  editPin(data, id) {
    return service
      .patch('/pins/' + id, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  deletePin(id) {
    return service
      .delete('/pins/' + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler);
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    return service
      .get('/logout')
      .then(res => {
        localStorage.removeItem('user');
      })
  },

  // loadUser() {
  //   const userData = localStorage.getItem('user');
  //   if (!userData) return false;
  //   const user = JSON.parse(userData);
  //   if (user.token) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  //     return user;
  //   }
  //   return false;
  // },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },



};
