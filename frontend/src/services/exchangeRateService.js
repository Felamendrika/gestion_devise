import api from "./api";

export const getTauxReel = async () => {
  try {
    const response = await api.get("/taux/reel");

    console.log("response :", response);
    console.log("Response donnees:", response.data);

    return response.data;
  } catch (err) {
    console.log("Erreur dans getTauxReel :", err.message);
  }
};

// obtenir les taux avec marge

// conversion

// fluctuation

// paire de devise populaire
