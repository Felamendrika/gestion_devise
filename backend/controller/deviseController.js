import DeviseModel from "../model/deviseModel.js";

class DeviseController {
  async getDevise(req, res) {
    try {
      const ToutDevise = await DeviseModel.getAllDevise();
      if (!ToutDevise || ToutDevise.length == 0) {
        res.status(404).json({
          message: "Aucun devise trouver",
        });
      }
      res.status(201).json({
        message: "Liste des devises disponible",
        data: ToutDevise,
      });
    } catch (error) {
      console.log("Erreur serveur lors de la ecupe des devises", error);
      res.status(500).json({
        message:
          "Erreur serveur lors de la recuperation des devises disponibles",
        error: error.message,
      });
    }
  }

  // recuperation de devise par son code_iso
  async getDeviseCode(req, res) {
    try {
      const code_iso = req.params.code; // important be le ametahana le .code
      if (!code_iso)
        return res.status(401).json({ message: "code_iso non recuperer" });

      const devise = await DeviseModel.getDeviseByCode(code_iso);

      if (!devise)
        return res.status(404).json({ erreur: "Devise non trouver" });
      res.json({
        message: `Voici la devise correspondant au ${code_iso}`,
        data: devise,
      });
    } catch (error) {
      console.log(
        "Erreur lors de la recuperation de devise par son code_iso",
        error
      );
      res.status(500).json({
        message:
          "Erreur serveur lors de la recuperation de devise par son code ISO",
        error: error.message,
      });
    }
  }
}

export default DeviseController;
