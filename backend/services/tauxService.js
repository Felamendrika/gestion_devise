import initDB from "../config/db.js";

const pool = await initDB();

export default class TauxService {
  static async calculateMarge(tauxReel) {
    return {
      taux_vente: tauxReel.taux_actuel * 1.02,
      taux_achat: tauxReel.taux_actuel * 0.98,
      date_maj: new Date(),
    };
  }

  static async calculFluctuation(source, cible) {
    const [taux] = await pool.query(
      `
      SELECT taux_actuel, taux_precedent 
      FROM TAUXREEL 
      WHERE devise_source = ? AND devise_cible = ?
      ORDER BY date_maj DESC LIMIT 1
    `,
      [source, cible]
    );

    const taux_actuel = taux.taux_actuel;
    const taux_precedent = taux.taux_precedent;

    return ((taux_actuel - taux_precedent) / taux_precedent) * 100;
  }
}
