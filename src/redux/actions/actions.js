export const ajouterAchat = (achat) => ({
  type: "AJOUTER_ACHAT",
  payload: achat
});

export const supprimerAchat = (numero, codeProduit) => ({
  type: "SUPPRIMER_ACHAT",
  payload: { numero, codeProduit }
});
