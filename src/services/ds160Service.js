import axios from 'axios';

const baseURL = 'https://api.assessoriaus.com.br/api/users/ds160';

const ds160Service = {
  async submit(data) {
    try {
      const response = await axios.post(baseURL, data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ds160Service;