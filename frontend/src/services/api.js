import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3001/api`,
  headers: { "Content-Type": "application/json" },
});

export default api;

// erreur tato le resaka syntaxe baseURL lasa basURL du coup tsy afaka nanana acces @ chemin vers Back ny Front fa nicreer serveur vite de le port 5173 no solony 3001 de lasa chemin relatif miretourner page HTML inde.html ny api rehetra
