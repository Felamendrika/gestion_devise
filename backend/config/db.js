import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// creation de connexion a la BD
const initDB = async () => {
  // connexion sans specifier la BD pour la creer si elle n'existe pas
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

  //creation de la BD si elle n'existe pas
  await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
  await conn.end();

  // connexion a la BD specifique
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "currency_db",
  });

  //creation de table si ils n'existe pas
  await pool.query(`
    CREATE TABLE IF NOT EXISTS DEVISE (
      code_iso VARCHAR(3) NOT NULL,
      nom_complet VARCHAR(50) NOT NULL,
      symbole VARCHAR(5) NOT NULL,
      code_pays VARCHAR(2) NOT NULL,
      PRIMARY KEY (code_iso)
    )
  `);

  // novana taux_actuel le taux mba tsy mifangaro
  await pool.query(`
    CREATE TABLE IF NOT EXISTS TAUXREEL (
      id VARCHAR(10) NOT NULL,
      taux_actuel DECIMAL(20, 5) NOT NULL,
      taux_precedent DECIMAL(20, 5) NOT NULL,
      date_maj DATETIME NOT NULL,
      devise_source VARCHAR(3) NOT NULL,
      devise_cible VARCHAR(3) NOT NULL,
      PRIMARY KEY (id),
      CONSTRAINT fk_devise_source FOREIGN KEY (devise_source) REFERENCES devise(code_iso),
      CONSTRAINT fk_devise_cible FOREIGN KEY (devise_cible) REFERENCES devise(code_iso)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS TAUXAVECMARGE (
      id INT AUTO_INCREMENT PRIMARY KEY,
      devise_source VARCHAR(3) NOT NULL,
      devise_cible VARCHAR(3) NOT NULL,
      taux_vente DECIMAL(18, 5) NOT NULL,
      taux_achat DECIMAL(18, 5) NOT NULL,
      date_maj DATETIME NOT NULL,
      idTauxReel VARCHAR(10) NOT NULL,
      FOREIGN KEY (idTauxReel) REFERENCES tauxreel(id),
      CONSTRAINT fk_source FOREIGN KEY (devise_source) REFERENCES devise(code_iso),
      CONSTRAINT fk_cible FOREIGN KEY (devise_cible) REFERENCES devise(code_iso)
    ) 
  `);

  //console.log("✅ Base de données et tables créées avec succès !");
  return pool;
};

// rehefa type module ny an @ package.json de tsy mampiasa module.exports = ... fa export default
export default initDB;
