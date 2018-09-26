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
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    return service
      .post('/pins', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
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
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },


  loadUser() {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    const user = JSON.parse(userData);
    return user;
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append("image", file)
    return service
      .post('/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  addProfilePicture(file) {
    const formData = new FormData();
    formData.append("image", file)
    return service
      .patch('/:id', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },



};
