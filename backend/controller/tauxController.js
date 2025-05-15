import popularPaire from "../constants/popularPaire.js";
import TauxModel from "../model/tauxModel.js";

class TauxController {
  async getTauxReel(req, res) {
    try {
      const { source, cible } = req.query;

      if (!source || !cible) {
        return res.status(400).json({ message: "Source ou cible manquante" });
      }

      const tauxReel = await TauxModel.getTauxReel(source, cible);
      if (!tauxReel) {
        return res
          .status(404)
          .json({ message: "Aucun taux trouvé pour cette paire de devise" });
      }
      return res.json({
        message: "Taux disponible",
        data: tauxReel,
      });
    } catch (error) {
      console.log("Erreur serveur lors de la recuperation du taux reel", error);
      res.status(500).json({
        message: "Erreur serveur lors de la recuperation du taux reel",
        error: error.message,
      });
    }
  }

  async getTauxAvecMarge(req, res) {
    try {
      const { source, cible } = req.query;

      if (!source || !cible) {
        return res.status(400).json({ message: "Source ou cible manquante" });
      }

      const TauxAvecMarge = await TauxModel.geTauxAvecMarge(source, cible);
      if (!TauxAvecMarge) {
        return res.status(404).json({
          message: "Aucun taux avec marge trouvé pour cette paire de devise",
        });
      }
      return res.json({
        message: "Taux avec marge disponible",
        data: TauxAvecMarge,
      });
    } catch (error) {
      console.log(
        "Erreur serveur lors de la recuperation du taux avec marge",
        error
      );
      res.status(500).json({
        message: "Erreur serveur lors de la recuperation du taux avec marge",
        error: error.message,
      });
    }
  }

  // calcul conversion
  async conversion(req, res) {
    try {
      const { montant, source, cible } = req.body;

      if (!montant || !source || !cible) {
        return res
          .status(400)
          .json({ message: "Montant, source ou cible manquant" });
      }

      const taux = await TauxModel.geTauxAvecMarge(source, cible);

      if (!taux)
        return res.status(400).json({
          message: "Taux de conversion non trouver pour la paire de devise",
        });

      const resultat = (montant * taux.taux_vente).toFixed(2);
      const unite_source = `1 ${source} = ${(1 * taux.taux_vente).toFixed(
        4
      )} ${cible}`;
      const unite_cible = `1 ${cible} = ${(1 * (1 / taux.taux_vente)).toFixed(
        4
      )} ${source}`;

      return res.json({
        resultat: resultat,
        taux_vente: taux.taux_vente,
        taux_achat: taux.taux_achat,
        unite_source: unite_source,
        unite_cible: unite_cible,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur serveur lors de la conversion",
        error: error.message,
      });
    }
  }

  async getFluctuation(req, res) {
    try {
      const { source, cible } = req.query;

      if (!source) {
        res.status(404).json({
          message: "Devise source indisponible",
        });
      }
      if (!cible) {
        res.status(404).json({
          message: "Devise cible indisponible",
        });
      }
      const fluctuation = await TauxModel.calculFluctuation(source, cible);

      console.log("Fluctuation =", fluctuation);

      if (!fluctuation) {
        console.log("Pas de fluctuation pour cette paire de devise");
        res.status(404).json({
          message: "Fluctuation non obtenu",
        });
      }

      res.json({
        message: `Fluctuation de ${source} et ${cible}`,
        data: fluctuation,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur serveur pour la fluctuation",
        error: error.message,
      });
    }
  }

  // methode pour les paires de taux populaires
  async getPopularPairs(req, res) {
    try {
      // recuperer les taux pour chaque paire
      const pairAvecMarge = (
        await Promise.all(
          popularPaire.map(async (pair) => {
            const tauxReel = await TauxModel.getTauxReel(
              pair.source,
              pair.cible
            );
            const tauxMarge = await TauxModel.geTauxAvecMarge(
              pair.source,
              pair.cible
            );

            if (!tauxReel || !tauxMarge) {
              return null;
            }

            return {
              ...pair,
              taux_reel: tauxReel.taux_actuel,
              taux_vente: tauxMarge.taux_vente,
              taux_achat: tauxMarge.taux_achat,
              taux: tauxMarge.idTauxReel,
              date_maj: tauxReel.date_maj,
            };
          })
        )
      ).filter(Boolean); // retirer les null
      res.json({
        message: "Voici la liste des pairs de devise populaires",
        data: pairAvecMarge,
      });
    } catch (error) {
      console.log("Error pour la  liste des paires populaires", error);
      res.status(500).json({
        message: "Erreur serveur pour la liste des paires de devise populaires",
        error: error.message,
      });
    }
  }
}

export default TauxController;
