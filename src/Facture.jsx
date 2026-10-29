import { useState } from "react";

export default function Facture({ clients, produits, achats }) {
  const [numero, setNumero] = useState("");
  const [recherche, setRecherche] = useState(false);

  function getProductByCode(code) {
    return produits.find(p => p.codeProduit === code);
  }

  const client = clients.find(c => c.numero === numero);
  const achatsClient = achats.filter(a => a.numero === numero);

  const total = achatsClient.reduce((somme, achat) => {
    const produit = getProductByCode(achat.codeProduit);
    return somme + (produit ? produit.prix * achat.qte : 0);
  }, 0);

  function rechercher(e) {
    e.preventDefault();
    setRecherche(true);
  }

  return (
    <div>
      <h2>Facture du client</h2>

      <form onSubmit={rechercher}>
        <input
          type="text"
          placeholder="Numéro du client"
          value={numero}
          onChange={e => {
            setNumero(e.target.value);
            setRecherche(false);
          }}
          required
        />
        <button type="submit">Afficher facture</button>
      </form>

      {recherche && (
        client ? (
          <div>
            <h3>Client : {client.nom} {client.prenom}</h3>

            {achatsClient.length > 0 ? (
              <>
                <table border="1" cellPadding="8">
                  <thead>
                    <tr>
                      <th>Code produit</th>
                      <th>Produit</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {achatsClient.map((a, index) => {
                      const p = getProductByCode(a.codeProduit);
                      if (!p) return null;

                      return (
                        <tr key={`${a.codeProduit}-${index}`}>
                          <td>{p.codeProduit}</td>
                          <td>{p.intitule}</td>
                          <td>{a.qte}</td>
                          <td>{p.prix} DH</td>
                          <td>{p.prix * a.qte} DH</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <h3>Montant total : {total} DH</h3>
              </>
            ) : (
              <p>Ce client n'a effectué aucun achat.</p>
            )}
          </div>
        ) : (
          <p>Erreur : numéro du client inexistant.</p>
        )
      )}
    </div>
  );
}
