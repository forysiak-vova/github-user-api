import axios from 'axios';

export class apiServer {
  constructor() {
    this.serchQuery = '';
  }
  async fetchAxios() {
    return await axios.get(`https://api.github.com/users/${this.serchQuery}`);
  }
}
