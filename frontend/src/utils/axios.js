import axios from 'axios';

const instance = axios.create({
  //baseURL: 'http://localhost:5000/',
  baseURL: 'https://mernimessage.herokuapp.com',
});

export default instance;
