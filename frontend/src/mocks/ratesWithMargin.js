const ratesWithMargin = [
  // USD -> EUR
  {
    devise_source_id: 1,
    devise_cible_id: 2,
    taux_achat: 0.91,
    taux_vente: 0.93,
    date_maj: "2024-05-01",
  },
  // USD -> GBP
  {
    devise_source_id: 1,
    devise_cible_id: 3,
    taux_achat: 0.78,
    taux_vente: 0.8,
    date_maj: "2024-05-01",
  },
  // EUR -> USD
  {
    devise_source_id: 2,
    devise_cible_id: 1,
    taux_achat: 1.08,
    taux_vente: 1.1,
    date_maj: "2024-05-01",
  },
  // ... Ajoute d'autres paires si besoin
];

export default ratesWithMargin;
