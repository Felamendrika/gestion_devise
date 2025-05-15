import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// importation des routes
import deviseRoute from "./routes/deviseRoute.js";
import tauxRoute from "./routes/tauxRoute.js";

dotenv.config();

// aleo tsy nampiase .env mitsy na prcess.env. fa mampisy pb

import initDB from "./config/db.js";

const app = express();
const PORT = 3001;
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());

// utilisation de routes
app.use("/api/devise", deviseRoute);
app.use("/api/taux", tauxRoute);

initDB()
  .then((pool) => {
    app.locals.pool = pool;

    app.get("/api/ping", (req, res) => {
      res.json({
        message: "SERVEUR ET DB OPERATIONNEL",
        timestamp: new Date().toISOString(),
      });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Erreur lors de l'initialisation de la BD:", err);
    process.exit(1);
  });

/*
// Initialisation DB
const pool = await initDB();
app.locals.pool = pool;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

*/
