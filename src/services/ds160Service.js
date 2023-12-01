import axios from 'axios';

const baseURL = 'http://main-api-visa-818713071.us-east-1.elb.amazonaws.com/api/users/ds160';

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