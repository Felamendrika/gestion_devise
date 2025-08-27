import fs from "fs";

// import deviseData from "../json/devise.json" assert { type: "json" };

import initDB from "../config/db.js";

const pool = await initDB();

// lecture des fichiers JSON
// const devises = JSON.parse(fs.readFileSync("./json/devise.json"));
// const tauxReel = JSON.parse(fs.readFileSync("./json/tauxreel.json"));

const devises = JSON.parse(fs.readFileSync("./json/deviseData.json"));
const tauxReel = JSON.parse(fs.readFileSync("./json/tauxReelData.json"));

async function importDevise() {
  for (const devise of devises) {
    await pool.query("INSERT INTO DEVISE SET ?", {
      code_iso: devise.code_iso,
      nom_complet: devise.nom_complet,
      symbole: devise.symbole,
      code_pays: devise.code_pays,
    });
  }
  console.log("✅ Devises importées");
}

// importation de taux reel + calcul tauxavecmarge
async function importTaux() {
  for (const taux of tauxReel) {
    // instertion de TAUXREEL
    const [result] = await pool.query("INSERT INTO TAUXREEL SET ?", {
      id: taux.id,
      taux_actuel: taux.taux_actuel,
      taux_precedent: taux.taux_precedent,
      date_maj: new Date(taux.date_maj),
      devise_source: taux.devise_source,
      devise_cible: taux.devise_cible,
    });

    //calcul et insertion Taux avec marge
    await pool.query("INSERT INTO TAUXAVECMARGE SET ?", {
      devise_source: taux.devise_source,
      devise_cible: taux.devise_cible,
      taux_vente: taux.taux_actuel * 1.02,
      taux_achat: taux.taux_actuel * 0.98,
      date_maj: new Date(),
      idTauxReel: taux.id,
    });
  }
  console.log("✅ Taux importés + marge calcule");
}

// importDevise()
//   .then(importTaux)
//   .then(() => console.log("Donnees importer avec succes avec les Taux"))
//   .catch((err) => console.log("Erreur lors de l'importation des données", err));

importTaux()
  .then(() => console.log("Donnees importer avec succes"))
  .catch((err) => console.log("Erreur de l'importation des donnees", err));

// .then(importTaux)
