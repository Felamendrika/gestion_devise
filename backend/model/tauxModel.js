import initDB from "../config/db.js";

const pool = await initDB();

class TauxModel {
  static async getTauxReel(source, cible) {
    // taux direct d'abord
    let [rows] = await pool.query(
      "SELECT * FROM TAUXREEL WHERE devise_source = ? AND devise_cible = ? ORDER BY date_maj DESC LIMIT 1",
      [source, cible]
    );

    // inverse si tau non trouver
    if (!rows[0]) {
      [rows] = await pool.query(
        "SELECT * FROM TAUXREEL WHERE devise_source = ? AND devise_cible = ? ORDER BY date_maj DESC LIMIT 1",
        [cible, source]
      );

      if (rows[0]) {
        return {
          ...rows[0],
          devise_source: source,
          devise_cible: cible,
          taux_actuel: (1 / rows[0].taux_actuel).toFixed(5),
          taux_precedent: (1 / rows[0].taux_precedent).toFixed(5),
          is_inverse: true, // flag pour indiquer l'inversion
        };
      }
    }
    return rows[0] ? { ...rows[0], is_inverse: false } : null;
  }

  // methode pour les recuperation taux avec marge
  static async geTauxAvecMarge(source, cible) {
    let [rows] = await pool.query(
      "SELECT * FROM TAUXAVECMARGE WHERE devise_source = ? AND devise_cible = ? ORDER BY date_maj DESC LIMIT 1",
      [source, cible]
    );

    // si tau inversee ou non trouver
    if (!rows[0]) {
      [rows] = await pool.query(
        "SELECT * FROM TAUXAVECMARGE WHERE devise_source = ? AND devise_cible = ? ORDER BY date_maj DESC LIMIT 1",
        [cible, source]
      );

      // calcul des taux inverse
      if (rows[0]) {
        return {
          ...rows[0],
          devise_source: source,
          devise_cible: cible,
          taux_vente: (1 / rows[0].taux_vente).toFixed(5),
          taux_achat: (1 / rows[0].taux_achat).toFixed(5),
          idTauxReel: rows[0].idTauxReel,
        };
      }
    }

    return rows[0] || null;
  }

  //methode pour les fluctuations
  static async calculFluctuation(source, cible) {
    let [taux] = await pool.query(
      "SELECT taux_actuel, taux_precedent FROM TAUXREEL WHERE devise_source = ? AND devise_cible = ? ORDER BY date_maj DESC LIMIT 1",
      [source, cible]
    );

    // si paire de devise non trouver , inverser
    if (!taux[0]) {
      [taux] = await pool.query(
        "SELECT taux_actuel, taux_precedent FROM TAUXREEL WHERE devise_source = ? AND devise_cible = ? ORDER BY date_maj DESC LIMIT 1",
        [cible, source]
      );

      if (taux[0]) {
        //clacul fluctuation avce les taux inverser
        const taux_actuel = 1 / taux[0].taux_actuel;
        const taux_precedent = 1 / taux[0].taux_precedent;

        const fluctuation = (
          ((taux_actuel - taux_precedent) / taux_precedent) *
          100
        ).toFixed(5);
        return { fluctuation };
      }
    }

    // si taux trouver
    if (taux[0]) {
      // teto nisy pb ny recuperation le taux_actuel et taux_precedent satria hadino hoe tableau ny taux de tokony alaina a partir anay fa tsy taux.taux_actuel
      const taux_actuel = taux[0].taux_actuel;
      const taux_precedent = taux[0].taux_precedent;

      const fluctuation = (
        ((taux_actuel - taux_precedent) / taux_precedent) *
        100
      ).toFixed(4);
      return { fluctuation };
    }
    return null;
  }
}

export default TauxModel;
