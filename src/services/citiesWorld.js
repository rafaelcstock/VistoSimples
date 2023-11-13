import axios from "axios";

const citiesService = {
  getCitiesByStateByCountry: async (country, state) => {
    try {
      const API_URL = `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`; 

      const httpHeaders = {
        "Content-Type": "application/json",
        "X-CSCAPI-KEY": "M2FXY2xaeGFoUmNMdzB0OWZ1Rk1XQjVTOXFHRzRVWU9naEhTYlhmSQ==" 
      };

      const response = await axios.get(API_URL, { headers: httpHeaders });

      if (response.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar países", error); 
    }
  }
};

export default citiesService;
