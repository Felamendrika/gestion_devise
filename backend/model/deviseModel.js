import initDB from "../config/db.js";

const pool = await initDB();

class DeviseModel {
  static async getAllDevise() {
    const [devises] = await pool.query("SELECT * FROM DEVISE");
    return devises;
  }

  static async getDeviseByCode(code_iso) {
    const [devises] = await pool.query(
      "SELECT * FROM DEVISE WHERE code_iso = ?",
      [code_iso]
    );
    return devises[0];
  }
}

export default DeviseModel;
