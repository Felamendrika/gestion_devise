import api from "./api";

export const fetchAllDevise = async () => {
  try {
    const response = await api.get("/devise");
    console.log(response);
    console.log("All devise :", response.data);

    if (!response.data) {
      console.log("Aucun donnees recuperer depuis l'api pour les devises");
    }
    return response.data;
  } catch (error) {
    console.log(
      "Erreur lors de la recuperation des devises disponibles :",
      error.message
    );
    throw error.response?.data || error.message;
  }
};

export const fetchDeviseByCode = async (code_iso) => {
  try {
    const response = await api.get(`/devise/${code_iso}`);

    if (!response) {
      console.error("Response non recuperer");
    }
    console.log("REsponse: ", response);
    console.log("Response donnees: ", response.data);

    return response.data;
  } catch (err) {
    console.log("Erreur dans ftechDeviseByCode: ", err.message);
    throw (
      err.response?.data ||
      err.message ||
      "Erreur lors de le recuperation de la devise "
    );
  }
};
