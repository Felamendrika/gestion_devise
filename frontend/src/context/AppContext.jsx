/* eslint-disable react-refresh/only-export-components */
// context gobale de l'application
import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [devises, setDevises] = useState([]);
  const [pairesPopulaires, setPairesPopulaires] = useState([]);
  const [loading, setLoading] = useState(true);

  // donnees globales a charger une fois (devises + paires populaire)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resDevises, resPopulaires] = await Promise.all([
          api.get("/devise"),
          api.get("/taux/populaire"),
        ]);

        setDevises(resDevises?.data?.data || []);
        setPairesPopulaires(resPopulaires?.data?.data || []);

        // .data.data pour retourner le tableau dans data
        console.table("Devises dans le contexte : ", resDevises.data.data);

        console.table(
          "Paires populaires dans le contexte : ",
          resPopulaires.data.data
        );
      } catch (error) {
        console.log(
          "Erreur chargement donnees initiales Devises et paires populaires : ",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // FOnction d'appel dynamique (exposition)
  const fetchTauxReel = async (source, cible) => {
    try {
      const res = await api.get(`/taux/reel?source=${source}&cible=${cible}`);
      if (!res || res.length === 0) {
        console.log("Aucun taux reel reuperer dans le contexte");
      }

      // console.log(res.data);
      console.table(res.data.data);

      return res.data.data;
    } catch (err) {
      console.error(
        "Erreur lors de la recuperation Taux reel dans le contexte :",
        err
      );
      return null;
    }
  };

  // fonction pour les Taux avec Marges
  const fetchTauxAvecMarge = async (source, cible) => {
    try {
      const res = await api.get(`/taux/marge?source=${source}&cible=${cible}`);
      if (!res || res.length === 0) {
        console.log("Aucun taux avec marge reuperer dans le contexte");
      }

      // console.log(res.data);
      console.table(res.data.data);

      return res.data.data;
    } catch (err) {
      console.log(
        "Erreur lors de la recuperation Taux avec marge dans le contexte :",
        err
      );
      return null;
    }
  };

  //Fonction pour les fluctuations
  const fetchFluctuation = async (source, cible) => {
    try {
      const res = await api.get(
        `/taux/fluctuation?source=${source}&cible=${cible}`
      );
      if (!res || res.length === 0) {
        console.log("Aucun fluctuation calculer recuperer dans le contexte");
      }

      // console.log(res.data);
      console.log(res.data.data);
      console.log(res.data.data.fluctuation);

      // return res.data.data.fluctuation;
      return parseFloat(res.data.data.fluctuation);
    } catch (err) {
      console.log(
        "Erreur lors de la recuperation fluctuation dans le contexte :",
        err
      );
      throw (
        err.message ||
        "Erreur dans le contexte pour la recuperation de Taux reel"
      );
    }
  };

  // Fonction pour la conversion
  const conversionDevise = async ({ montant, source, cible }) => {
    // preciser tsara le ({}) sinon manao erreur le API satria tsy retourner tsara ny dnnees
    try {
      const res = await api.post(`/taux/conversion`, {
        montant,
        source,
        cible,
      });

      console.log("Resultat conversion dans contexte:", res.data);
      console.log("Resultat conversion dans contexte:", res.data.data);
      return res.data;
    } catch (err) {
      console.log(
        "Erreur lors de la conversion dans le contexte :",
        err.message
      );
      throw err || err.message;
    }
  };

  const value = {
    devises,
    pairesPopulaires,
    loading,
    setDevises,
    setPairesPopulaires,
    setLoading,
    fetchTauxReel,
    fetchTauxAvecMarge,
    fetchFluctuation,
    conversionDevise,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
