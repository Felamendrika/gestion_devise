import initDB from "../config/db.js";

const pool = await initDB();

class TauxModel {
  static async getTauxReel(source, cible) {
    const [rows] = await pool.query(
      "SELECT * FROM TAUXREEL WHERE devise_source = ? AND devise_cible = ? ORDER BY date_maj DESC LIMIT 1",
      [source, cible]
    );
    return rows[0] || null;
  }

  // methode pour les recuperation taux avec marge
  static async geTauxAvecMarge(source, cible) {
    const [rows] = await pool.query(
      "SELECT * FROM TAUXAVECMARGE WHERE devise_source = ? AND devise_cible = ? ORDER BY date_maj DESC LIMIT 1",
      [source, cible]
    );
    return rows[0] || null;
  }

  //methode pour les fluctuations
  static async calculFluctuation(source, cible) {
    const [taux] = await pool.query(
      "SELECT taux_actuel, taux_precedent FROM TAUXREEL WHERE devise_source = ? AND devise_cible = ? ORDER BY date_maj DESC LIMIT 1",
      [source, cible]
    );

    // teto nisy pb ny recuperation le taux_actuel et taux_precedent satria hadino hoe tableau ny taux de tokony alaina a partir anay fa tsy taux.taux_actuel
    const taux_actuel = taux[0].taux_actuel;
    const taux_precedent = taux[0].taux_precedent;

    const fluctuation = (
      ((taux_actuel - taux_precedent) / taux_precedent) *
      100
    ).toFixed(4);
    return { fluctuation };
  }
}

export default TauxModel;
