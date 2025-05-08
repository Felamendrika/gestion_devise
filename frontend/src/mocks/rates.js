const rates = [
  // USD vers autres
  {
    id: 1,
    devise_source_id: 1,
    devise_cible_id: 2,
    taux: 0.92,
    date_maj: "2024-05-01",
  }, // USD -> EUR (actuel)
  {
    id: 101,
    devise_source_id: 1,
    devise_cible_id: 2,
    taux: 0.93,
    date_maj: "2024-04-30",
  }, // USD -> EUR (veille)
  {
    id: 2,
    devise_source_id: 1,
    devise_cible_id: 3,
    taux: 0.79,
    date_maj: "2024-05-01",
  }, // USD -> GBP (actuel)
  {
    id: 102,
    devise_source_id: 1,
    devise_cible_id: 3,
    taux: 0.78,
    date_maj: "2024-04-30",
  }, // USD -> GBP (veille)
  {
    id: 3,
    devise_source_id: 1,
    devise_cible_id: 4,
    taux: 83.1,
    date_maj: "2024-05-01",
  }, // USD -> INR (actuel)
  {
    id: 103,
    devise_source_id: 1,
    devise_cible_id: 4,
    taux: 82.5,
    date_maj: "2024-04-30",
  }, // USD -> INR (veille)
  // EUR vers autres
  {
    id: 4,
    devise_source_id: 2,
    devise_cible_id: 1,
    taux: 1.09,
    date_maj: "2024-05-01",
  }, // EUR -> USD (actuel)
  {
    id: 104,
    devise_source_id: 2,
    devise_cible_id: 1,
    taux: 1.08,
    date_maj: "2024-04-30",
  }, // EUR -> USD (veille)
  {
    id: 5,
    devise_source_id: 2,
    devise_cible_id: 3,
    taux: 0.86,
    date_maj: "2024-05-01",
  }, // EUR -> GBP (actuel)
  {
    id: 105,
    devise_source_id: 2,
    devise_cible_id: 3,
    taux: 0.85,
    date_maj: "2024-04-30",
  }, // EUR -> GBP (veille)
  // GBP vers autres
  {
    id: 6,
    devise_source_id: 3,
    devise_cible_id: 1,
    taux: 1.27,
    date_maj: "2024-05-01",
  }, // GBP -> USD (actuel)
  {
    id: 106,
    devise_source_id: 3,
    devise_cible_id: 1,
    taux: 1.25,
    date_maj: "2024-04-30",
  }, // GBP -> USD (veille)
  // Ajout d'autres paires pour la démonstration
  {
    id: 7,
    devise_source_id: 1,
    devise_cible_id: 5,
    taux: 1.36,
    date_maj: "2024-05-01",
  }, // USD -> CAD (actuel)
  {
    id: 107,
    devise_source_id: 1,
    devise_cible_id: 5,
    taux: 1.35,
    date_maj: "2024-04-30",
  }, // USD -> CAD (veille)
  {
    id: 8,
    devise_source_id: 2,
    devise_cible_id: 4,
    taux: 90.5,
    date_maj: "2024-05-01",
  }, // EUR -> INR (actuel)
  {
    id: 108,
    devise_source_id: 2,
    devise_cible_id: 4,
    taux: 90.0,
    date_maj: "2024-04-30",
  }, // EUR -> INR (veille)
  // ... Ajoute d'autres paires si besoin
];

export default rates;
