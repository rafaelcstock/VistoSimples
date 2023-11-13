import axios from "axios";

const statesBrazilianService = {
  baseUrl: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",

  getStates: async () => {
    try {
      const API_URL = `${statesBrazilianService.baseUrl}`; 

      const httpHeaders = {
        "Content-Type": "application/json", 
      };

      const response = await axios.get(API_URL, { headers: httpHeaders });

      if (response.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar estados", error); 
    }
  }
};

export default statesBrazilianService;
